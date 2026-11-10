export function Pips({
  value,
  total = 3,
  label,
  className = '',
}: {
  value: number;
  total?: number;
  label: string;
  className?: string;
}) {
  return (
    <span className={`pips ${className}`.trim()} aria-label={label}>
      {Array.from({ length: total }, (_, index) => (
        <i key={index} className={index < value ? 'on' : ''} />
      ))}
    </span>
  );
}
