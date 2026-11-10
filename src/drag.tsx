import { useRef, useState } from 'react';
import type { PointerEvent, ReactNode } from 'react';

export type DragPoint = { x: number; y: number; distance: number };

type DragOpts = {
  onMove?: (point: DragPoint, el: HTMLElement) => void;
  onEnd?: (point: DragPoint, el: HTMLElement) => boolean | void;
};

export function useDrag(opts: DragOpts) {
  const optsRef = useRef(opts);
  optsRef.current = opts;
  const origin = useRef({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    origin.current = { x: event.clientX, y: event.clientY };
    setDragging(true);
    setDelta({ x: 0, y: 0 });
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const point = {
      x: event.clientX,
      y: event.clientY,
      distance: Math.hypot(event.clientX - origin.current.x, event.clientY - origin.current.y),
    };
    setDelta({ x: point.x - origin.current.x, y: point.y - origin.current.y });
    optsRef.current.onMove?.(point, event.currentTarget);
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      setDragging(false);
      setDelta({ x: 0, y: 0 });
      return;
    }
    const point = {
      x: event.clientX,
      y: event.clientY,
      distance: Math.hypot(event.clientX - origin.current.x, event.clientY - origin.current.y),
    };
    const accepted = optsRef.current.onEnd?.(point, event.currentTarget) === true;
    setDragging(false);
    if (!accepted) setDelta({ x: 0, y: 0 });
  };

  const onPointerCancel = (event: PointerEvent<HTMLElement>) => {
    setDragging(false);
    setDelta({ x: 0, y: 0 });
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return {
    delta,
    dragging,
    bind: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel },
  };
}

export function dropId(x: number, y: number, ignore?: HTMLElement | null) {
  const stack = document.elementsFromPoint(x, y);
  for (const el of stack) {
    if (!(el instanceof Element)) continue;
    if (ignore && (el === ignore || ignore.contains(el))) continue;
    const zone = el.closest('[data-drop]');
    if (!zone) continue;
    if (ignore && ignore.contains(zone)) continue;
    return zone.getAttribute('data-drop');
  }
  return null;
}

export function Draggable({
  className,
  disabled,
  label,
  children,
  onDrop,
  onMove,
}: {
  className?: string;
  disabled?: boolean;
  label?: string;
  children: ReactNode;
  onDrop?: (point: DragPoint, el: HTMLElement) => boolean | void;
  onMove?: (point: DragPoint, el: HTMLElement) => void;
}) {
  const { delta, dragging, bind } = useDrag({ onEnd: onDrop, onMove });
  return (
    <div
      className={`drag${dragging ? ' dragging' : ''}${className ? ` ${className}` : ''}`}
      style={{ transform: `translate(${delta.x}px, ${delta.y}px)`, touchAction: 'none' }}
      role="button"
      aria-label={label}
      {...(disabled ? {} : bind)}
    >
      {children}
    </div>
  );
}
