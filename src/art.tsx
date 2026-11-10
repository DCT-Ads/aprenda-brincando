export type KidVariant = 'biblia' | 'escola' | 'higiene';

const INK = '#2c2148';

function Eyes({ happy, blue = false }: { happy: boolean; blue?: boolean }) {
  if (happy) {
    return (
      <g fill="none" stroke={blue ? '#1d6fd6' : INK} strokeWidth="4" strokeLinecap="round">
        <path d="M52 82 Q62 70 72 82" />
        <path d="M88 82 Q98 70 108 82" />
      </g>
    );
  }
  const iris = blue ? '#2f9bff' : '#3a2418';
  const pupil = blue ? '#1248a8' : '#1a0e0a';
  return (
    <g>
      <ellipse cx="62" cy="80" rx="12" ry="14" fill="#fff" stroke={INK} strokeWidth="3" />
      <ellipse cx="98" cy="80" rx="12" ry="14" fill="#fff" stroke={INK} strokeWidth="3" />
      <circle cx="64" cy="82" r="6.5" fill={iris} />
      <circle cx="100" cy="82" r="6.5" fill={iris} />
      <circle cx="64" cy="82" r="3.2" fill={pupil} />
      <circle cx="100" cy="82" r="3.2" fill={pupil} />
      <circle cx="66" cy="78" r="2.3" fill="#fff" />
      <circle cx="102" cy="78" r="2.3" fill="#fff" />
    </g>
  );
}

export function Kid({
  variant,
  mood = 'idle',
}: {
  variant: KidVariant;
  mood?: 'idle' | 'happy';
}) {
  const happy = mood === 'happy';
  const skin = variant === 'biblia' ? '#8d5340' : variant === 'escola' ? '#f6c7a8' : '#e7b48a';
  const skinDeep = variant === 'biblia' ? '#6d3b2e' : variant === 'escola' ? '#e7b090' : '#d09968';

  return (
    <svg className="kid" viewBox="0 0 160 190" aria-hidden="true">
      {variant === 'biblia' && (
        <g fill="#1b1b1b">
          <circle cx="80" cy="58" r="40" />
          <circle cx="46" cy="70" r="16" />
          <circle cx="114" cy="70" r="16" />
          <circle cx="62" cy="40" r="15" />
          <circle cx="98" cy="40" r="15" />
          <circle cx="80" cy="32" r="14" />
        </g>
      )}
      {variant === 'escola' && (
        <g fill="#4a2c22">
          <circle cx="80" cy="62" r="40" />
          <circle cx="28" cy="92" r="18" />
          <circle cx="132" cy="92" r="18" />
          <rect x="18" y="100" width="20" height="10" rx="5" fill="#ff4d8d" />
          <rect x="122" y="100" width="20" height="10" rx="5" fill="#ff4d8d" />
        </g>
      )}
      {variant === 'higiene' && (
        <g>
          <circle cx="80" cy="64" r="40" fill="#6b3e2a" />
          <circle cx="46" cy="78" r="14" fill="#6b3e2a" />
          <circle cx="114" cy="78" r="14" fill="#6b3e2a" />
          <circle cx="80" cy="28" r="16" fill="#6b3e2a" />
          <ellipse cx="64" cy="30" rx="10" ry="8" fill="#b06bff" />
          <ellipse cx="96" cy="30" rx="10" ry="8" fill="#b06bff" />
          <circle cx="80" cy="30" r="6" fill="#ff4d8d" />
        </g>
      )}

      <circle cx="42" cy="92" r="9" fill={skin} />
      <circle cx="118" cy="92" r="9" fill={skin} />
      <circle cx="80" cy="86" r="36" fill={skin} />
      <ellipse cx="48" cy="100" rx="8" ry="5" fill="#ff8fa8" opacity="0.8" />
      <ellipse cx="112" cy="100" rx="8" ry="5" fill="#ff8fa8" opacity="0.8" />
      <Eyes happy={happy} blue={variant === 'higiene'} />
      <path d="M66 108 Q80 122 94 108" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />

      {variant === 'biblia' && (
        <g>
          <path d="M28 132 Q18 150 30 162" fill={skin} stroke={skinDeep} strokeWidth="8" strokeLinecap="round" />
          <path d="M132 132 Q146 118 150 100" fill={skin} stroke={skinDeep} strokeWidth="8" strokeLinecap="round" />
          <rect x="48" y="122" width="64" height="52" rx="22" fill="#1ec8c0" stroke={INK} strokeWidth="3" />
          <path d="M70 128 h20 a8 8 0 0 1 0 16 h-20 a8 8 0 0 1 0 -16z" fill="#ffe14a" stroke={INK} strokeWidth="3" />
        </g>
      )}
      {variant === 'escola' && (
        <g>
          <path d="M30 134 Q16 150 28 164" fill={skin} stroke={skinDeep} strokeWidth="8" strokeLinecap="round" />
          <path d="M130 134 Q146 150 134 164" fill={skin} stroke={skinDeep} strokeWidth="8" strokeLinecap="round" />
          <rect x="52" y="120" width="56" height="28" rx="14" fill="#ffd23f" stroke={INK} strokeWidth="3" />
          <path d="M46 138 h68 v32 a20 20 0 0 1 -20 16 h-28 a20 20 0 0 1 -20 -16z" fill="#ff4d8d" stroke={INK} strokeWidth="3" />
          <path d="M70 122 v18 M90 122 v18" stroke="#ff4d8d" strokeWidth="6" strokeLinecap="round" />
          <circle cx="118" cy="156" r="12" fill="#ff3b3b" stroke={INK} strokeWidth="3" />
          <path d="M118 146 q8 -10 10 -2" fill="#3ddc78" />
        </g>
      )}
      {variant === 'higiene' && (
        <g>
          <path d="M30 132 Q14 148 28 162" fill={skin} stroke={skinDeep} strokeWidth="8" strokeLinecap="round" />
          <path d="M130 132 Q148 146 136 164" fill={skin} stroke={skinDeep} strokeWidth="8" strokeLinecap="round" />
          <path d="M48 124 h64 l10 58 h-84z" fill="#b388ff" stroke={INK} strokeWidth="3" />
          <circle cx="58" cy="150" r="7" fill="#7af0ff" stroke="#fff" strokeWidth="2" />
          <circle cx="104" cy="146" r="5" fill="#fff" opacity="0.9" />
          <circle cx="80" cy="162" r="6" fill="#d7f8ff" stroke="#7ec8ff" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}

export function Missionary({ mood = 'idle' }: { mood?: 'idle' | 'happy' }) {
  const happy = mood === 'happy';
  return (
    <svg className="kid" viewBox="0 0 180 210" aria-hidden="true">
      <rect x="58" y="10" width="64" height="46" rx="10" fill="#5d6b78" stroke={INK} strokeWidth="4" />
      <rect x="58" y="40" width="64" height="12" fill="#2f8fbf" />
      <circle cx="52" cy="104" r="10" fill="#f6c7a8" />
      <circle cx="128" cy="104" r="10" fill="#f6c7a8" />
      <circle cx="90" cy="104" r="36" fill="#f6c7a8" stroke={INK} strokeWidth="4" />
      <ellipse cx="90" cy="72" rx="62" ry="14" fill="#3e4a57" stroke={INK} strokeWidth="4" />
      <ellipse cx="62" cy="116" rx="8" ry="5" fill="#ff8fa8" opacity="0.75" />
      <ellipse cx="118" cy="116" rx="8" ry="5" fill="#ff8fa8" opacity="0.75" />
      {happy ? (
        <g fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round">
          <path d="M62 102 Q72 92 82 102" />
          <path d="M98 102 Q108 92 118 102" />
        </g>
      ) : (
        <g>
          <circle cx="72" cy="102" r="5" fill="#3a2418" />
          <circle cx="108" cy="102" r="5" fill="#3a2418" />
          <circle cx="74" cy="100" r="2" fill="#fff" />
          <circle cx="110" cy="100" r="2" fill="#fff" />
        </g>
      )}
      <circle cx="72" cy="102" r="16" fill="none" stroke="#3d2b1f" strokeWidth="3.5" />
      <circle cx="108" cy="102" r="16" fill="none" stroke="#3d2b1f" strokeWidth="3.5" />
      <path d="M88 102 H92" stroke="#3d2b1f" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M74 122 Q90 136 106 122" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M28 150 Q14 168 34 176" fill="#f6c7a8" stroke="#e7b090" strokeWidth="8" strokeLinecap="round" />
      <path d="M152 150 Q168 166 150 178" fill="#f6c7a8" stroke="#e7b090" strokeWidth="8" strokeLinecap="round" />
      <rect x="58" y="140" width="64" height="52" rx="18" fill="#fff" stroke={INK} strokeWidth="3" />
      <path d="M64 146 h52 l8 46 H56z" fill="#a56b3c" stroke={INK} strokeWidth="3" />
      <rect x="78" y="162" width="24" height="8" rx="3" fill="#2f8fbf" />
      <circle cx="90" cy="184" r="4" fill="#ffe14a" stroke={INK} strokeWidth="2" />
    </svg>
  );
}

export function BibleCast() {
  return (
    <svg className="bible-cast" viewBox="0 0 420 150" aria-hidden="true">
      <g>
        <ellipse cx="70" cy="34" rx="24" ry="16" fill="#3a3128" stroke={INK} strokeWidth="3" />
        <circle cx="70" cy="82" r="26" fill="#e7b48a" stroke={INK} strokeWidth="3" />
        <ellipse cx="70" cy="64" rx="46" ry="11" fill="#2b241c" stroke={INK} strokeWidth="3" />
        <circle cx="62" cy="84" r="3" fill={INK} />
        <circle cx="80" cy="84" r="3" fill={INK} />
        <path d="M60 96 Q70 106 80 96" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <path d="M46 104 h48 l6 36 H40z" fill="#f6c445" stroke={INK} strokeWidth="3" />
      </g>
      <g>
        <circle cx="150" cy="46" r="14" fill="#e2582a" />
        <circle cx="176" cy="44" r="14" fill="#ff7a45" />
        <circle cx="164" cy="30" r="14" fill="#e2582a" />
        <circle cx="164" cy="78" r="26" fill="#f3c2a4" stroke={INK} strokeWidth="3" />
        <circle cx="156" cy="76" r="3" fill={INK} />
        <circle cx="174" cy="76" r="3" fill={INK} />
        <path d="M154 88 Q164 98 174 88" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <rect x="140" y="104" width="48" height="36" rx="14" fill="#ff6fa8" stroke={INK} strokeWidth="3" />
      </g>
      <g>
        <circle cx="250" cy="48" r="13" fill="#1b1b1b" />
        <circle cx="274" cy="40" r="13" fill="#1b1b1b" />
        <circle cx="292" cy="56" r="12" fill="#1b1b1b" />
        <circle cx="270" cy="78" r="26" fill="#8d5340" stroke={INK} strokeWidth="3" />
        <circle cx="262" cy="76" r="3" fill={INK} />
        <circle cx="280" cy="76" r="3" fill={INK} />
        <path d="M260 90 Q271 100 282 90" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <rect x="246" y="104" width="48" height="36" rx="14" fill="#3d7dff" stroke={INK} strokeWidth="3" />
      </g>
      <g>
        <circle cx="352" cy="42" r="12" fill="#ffb703" />
        <circle cx="370" cy="34" r="11" fill="#ff8a1e" />
        <circle cx="360" cy="74" r="24" fill="#f6c7a8" stroke={INK} strokeWidth="3" />
        <circle cx="352" cy="72" r="3" fill={INK} />
        <circle cx="368" cy="72" r="3" fill={INK} />
        <path d="M350 84 Q360 94 370 84" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <rect x="338" y="98" width="44" height="40" rx="14" fill="#ffe14a" stroke={INK} strokeWidth="3" />
      </g>
    </svg>
  );
}

export function Logo({ big = false }: { big?: boolean }) {
  return (
    <h1 className={big ? 'logo logo-lg' : 'logo'} aria-label="Aprenda Brincando">
      <span className="logo-aprenda">Aprenda</span>
      <span className="logo-brincando" aria-hidden="true">
        {'Brincando'.split('').map((letter, index) => (
          <span key={`${letter}-${index}`} className={`ch ch-${index}`}>
            {letter}
          </span>
        ))}
      </span>
    </h1>
  );
}

export function Rainbow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 120" aria-hidden="true">
      <path d="M16 112 A94 94 0 0 1 204 112" fill="none" stroke="#ff4d4d" strokeWidth="12" strokeLinecap="round" />
      <path d="M28 112 A82 82 0 0 1 192 112" fill="none" stroke="#ffb703" strokeWidth="12" strokeLinecap="round" />
      <path d="M40 112 A70 70 0 0 1 180 112" fill="none" stroke="#ffd000" strokeWidth="12" strokeLinecap="round" />
      <path d="M52 112 A58 58 0 0 1 168 112" fill="none" stroke="#3ddc78" strokeWidth="12" strokeLinecap="round" />
      <path d="M64 112 A46 46 0 0 1 156 112" fill="none" stroke="#3d8bff" strokeWidth="12" strokeLinecap="round" />
      <path d="M76 112 A34 34 0 0 1 144 112" fill="none" stroke="#b06bff" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}

export function Playground() {
  return (
    <svg className="playground" viewBox="0 0 1000 340" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <ellipse cx="120" cy="250" rx="90" ry="26" fill="#3cb54a" />
      <rect x="108" y="150" width="24" height="110" rx="8" fill="#a16207" />
      <circle cx="90" cy="150" r="48" fill="#22c55e" />
      <circle cx="140" cy="140" r="52" fill="#16a34a" />
      <circle cx="118" cy="118" r="40" fill="#4ade80" />
      <circle cx="96" cy="132" r="7" fill="#ff4d8d" />
      <circle cx="132" cy="120" r="6" fill="#ffd000" />
      <circle cx="150" cy="156" r="6" fill="#ff8a1e" />

      <polygon points="300,150 500,70 700,150" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="6" />
      <rect x="330" y="150" width="340" height="140" rx="12" fill="#ffd7b0" stroke="#e7b48a" strokeWidth="4" />
      <rect x="470" y="210" width="60" height="80" rx="8" fill="#f59e0b" />
      <circle cx="516" cy="252" r="4" fill="#fff3" />
      <g>
        <rect x="360" y="180" width="54" height="46" rx="6" fill="#7dd3fc" stroke="#fff" strokeWidth="4" />
        <rect x="586" y="180" width="54" height="46" rx="6" fill="#fde68a" stroke="#fff" strokeWidth="4" />
        <path d="M387 180 v46 M360 203 h54 M613 180 v46 M586 203 h54" stroke="#fff" strokeWidth="3" />
      </g>
      <rect x="360" y="250" width="70" height="16" rx="4" fill="#ff4d8d" />
      <circle cx="372" cy="246" r="7" fill="#ff4d4d" />
      <circle cx="390" cy="244" r="7" fill="#ffd000" />
      <circle cx="408" cy="246" r="7" fill="#b06bff" />

      <rect x="790" y="150" width="12" height="120" rx="4" fill="#fbbf24" />
      <rect x="790" y="150" width="70" height="12" rx="4" fill="#fbbf24" />
      <path d="M850 162 C910 180 930 230 900 280" fill="none" stroke="#ff4d4d" strokeWidth="18" strokeLinecap="round" />
      <circle cx="812" cy="188" r="6" fill="#3d8bff" />
      <circle cx="812" cy="214" r="6" fill="#3d8bff" />
      <circle cx="812" cy="240" r="6" fill="#3d8bff" />

      <g>
        <circle cx="230" cy="300" r="10" fill="#ff4d8d" />
        <circle cx="260" cy="308" r="8" fill="#ffd000" />
        <circle cx="760" cy="304" r="9" fill="#b06bff" />
        <circle cx="800" cy="312" r="7" fill="#3d8bff" />
        <rect x="226" y="300" width="4" height="16" fill="#166534" />
        <rect x="756" y="304" width="4" height="14" fill="#166534" />
      </g>
    </svg>
  );
}

export function Animal({ id, silhouette = false }: { id: string; silhouette?: boolean }) {
  return (
    <svg className={silhouette ? 'animal sil' : 'animal'} viewBox="0 0 160 160" aria-hidden="true">
      {id === 'ovelha' && (
        <g>
          <circle cx="48" cy="78" r="24" fill="#fff" stroke={INK} strokeWidth="4" />
          <circle cx="80" cy="64" r="28" fill="#fff" stroke={INK} strokeWidth="4" />
          <circle cx="112" cy="78" r="24" fill="#fff" stroke={INK} strokeWidth="4" />
          <circle cx="80" cy="96" r="30" fill="#fff" stroke={INK} strokeWidth="4" />
          <ellipse cx="80" cy="108" rx="18" ry="16" fill="#f6c7a8" stroke={INK} strokeWidth="4" />
          <circle cx="74" cy="106" r="2.5" fill={INK} />
          <circle cx="88" cy="106" r="2.5" fill={INK} />
          <ellipse cx="42" cy="118" rx="8" ry="12" fill="#f6c7a8" stroke={INK} strokeWidth="3" />
          <ellipse cx="118" cy="118" rx="8" ry="12" fill="#f6c7a8" stroke={INK} strokeWidth="3" />
        </g>
      )}
      {id === 'pomba' && (
        <g>
          <ellipse cx="78" cy="88" rx="40" ry="28" fill="#fff" stroke={INK} strokeWidth="4" />
          <ellipse cx="118" cy="78" rx="22" ry="16" fill="#fff" stroke={INK} strokeWidth="4" />
          <path d="M40 90 Q20 60 48 70" fill="#e8f4ff" stroke={INK} strokeWidth="4" />
          <path d="M70 80 Q90 40 110 78" fill="#dbeafe" stroke={INK} strokeWidth="4" />
          <path d="M136 78 l16 6 -16 6z" fill="#ffb703" stroke={INK} strokeWidth="3" />
          <circle cx="124" cy="74" r="3" fill={INK} />
          <path d="M60 112 q10 16 8 28" fill="none" stroke="#f6c7a8" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
      {id === 'elefante' && (
        <g>
          <circle cx="46" cy="78" r="28" fill="#9ec9e8" stroke={INK} strokeWidth="4" />
          <circle cx="118" cy="78" r="28" fill="#9ec9e8" stroke={INK} strokeWidth="4" />
          <circle cx="46" cy="78" r="14" fill="#f8c7d8" />
          <circle cx="118" cy="78" r="14" fill="#f8c7d8" />
          <circle cx="82" cy="84" r="32" fill="#b9d7ee" stroke={INK} strokeWidth="4" />
          <circle cx="72" cy="80" r="4" fill={INK} />
          <circle cx="96" cy="80" r="4" fill={INK} />
          <path d="M82 96 q-8 28 6 40" fill="none" stroke="#8fb4d4" strokeWidth="10" strokeLinecap="round" />
          <path d="M88 132 q10 4 8 10" fill="none" stroke="#8fb4d4" strokeWidth="8" strokeLinecap="round" />
        </g>
      )}
      {id === 'leao' && (
        <g>
          <circle cx="46" cy="70" r="16" fill="#f59e0b" stroke={INK} strokeWidth="3" />
          <circle cx="70" cy="50" r="16" fill="#fbbf24" stroke={INK} strokeWidth="3" />
          <circle cx="100" cy="48" r="16" fill="#f59e0b" stroke={INK} strokeWidth="3" />
          <circle cx="122" cy="70" r="16" fill="#fbbf24" stroke={INK} strokeWidth="3" />
          <circle cx="40" cy="100" r="16" fill="#fbbf24" stroke={INK} strokeWidth="3" />
          <circle cx="124" cy="102" r="16" fill="#f59e0b" stroke={INK} strokeWidth="3" />
          <circle cx="82" cy="92" r="34" fill="#fde68a" stroke={INK} strokeWidth="4" />
          <circle cx="70" cy="88" r="4" fill={INK} />
          <circle cx="96" cy="88" r="4" fill={INK} />
          <ellipse cx="83" cy="100" rx="8" ry="6" fill="#f4a37a" />
          <path d="M72 108 Q83 118 94 108" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {id === 'girafa' && (
        <g>
          <rect x="70" y="70" width="28" height="62" rx="14" fill="#f6c445" stroke={INK} strokeWidth="4" />
          <circle cx="84" cy="58" r="26" fill="#f6c445" stroke={INK} strokeWidth="4" />
          <rect x="70" y="28" width="6" height="18" rx="3" fill="#e7b48a" stroke={INK} strokeWidth="3" />
          <rect x="94" y="28" width="6" height="18" rx="3" fill="#e7b48a" stroke={INK} strokeWidth="3" />
          <circle cx="73" cy="26" r="5" fill="#f59e0b" stroke={INK} strokeWidth="2" />
          <circle cx="97" cy="26" r="5" fill="#f59e0b" stroke={INK} strokeWidth="2" />
          <circle cx="76" cy="56" r="3" fill={INK} />
          <circle cx="94" cy="56" r="3" fill={INK} />
          <circle cx="78" cy="86" r="5" fill="#c47a3a" />
          <circle cx="90" cy="102" r="5" fill="#c47a3a" />
          <circle cx="80" cy="116" r="4" fill="#c47a3a" />
          <ellipse cx="84" cy="74" rx="7" ry="5" fill="#f4a37a" />
        </g>
      )}
    </svg>
  );
}

export function Fruit({ id }: { id: string }) {
  return (
    <svg className="fruit" viewBox="0 0 120 120" aria-hidden="true">
      {id === 'maca' && (
        <g>
          <path d="M60 28 q10 -16 18 -8" fill="none" stroke="#6b3e2a" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="74" cy="30" rx="10" ry="6" fill="#22c55e" transform="rotate(30 74 30)" />
          <circle cx="60" cy="68" r="32" fill="#ff3b3b" stroke={INK} strokeWidth="4" />
          <ellipse cx="48" cy="56" rx="8" ry="5" fill="#fff" opacity="0.55" />
        </g>
      )}
      {id === 'banana' && (
        <path
          d="M30 70 Q40 20 78 28 Q98 34 90 58 Q78 92 40 96 Q24 84 30 70"
          fill="#ffe14a"
          stroke={INK}
          strokeWidth="4"
        />
      )}
      {id === 'uva' && (
        <g>
          <path d="M60 22 q8 10 0 16" fill="none" stroke="#166534" strokeWidth="4" />
          <ellipse cx="70" cy="28" rx="10" ry="6" fill="#22c55e" />
          {[
            [46, 48],
            [68, 46],
            [38, 68],
            [58, 66],
            [78, 68],
            [48, 88],
            [70, 88],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="13" fill="#a855f7" stroke={INK} strokeWidth="3" />
          ))}
        </g>
      )}
      {id === 'laranja' && (
        <g>
          <ellipse cx="78" cy="34" rx="12" ry="7" fill="#22c55e" />
          <circle cx="60" cy="68" r="32" fill="#ff8a00" stroke={INK} strokeWidth="4" />
          <circle cx="52" cy="60" r="3" fill="#ffd7a8" />
          <circle cx="66" cy="74" r="3" fill="#ffd7a8" />
          <circle cx="70" cy="58" r="2.5" fill="#ffd7a8" />
        </g>
      )}
      {id === 'pera' && (
        <g>
          <path d="M62 24 q8 -8 10 4" fill="none" stroke="#6b3e2a" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 40 C40 40 36 70 48 92 C58 112 86 112 96 90 C108 64 96 38 74 36 Z" fill="#b6e35a" stroke={INK} strokeWidth="4" />
          <ellipse cx="52" cy="70" rx="6" ry="10" fill="#fff" opacity="0.4" />
        </g>
      )}
      {id === 'limao' && (
        <g>
          <ellipse cx="78" cy="36" rx="10" ry="6" fill="#22c55e" />
          <ellipse cx="60" cy="68" rx="28" ry="34" fill="#ffe14a" stroke={INK} strokeWidth="4" />
          <ellipse cx="48" cy="58" rx="6" ry="10" fill="#fff" opacity="0.45" />
        </g>
      )}
      {id === 'coco' && (
        <g>
          <ellipse cx="60" cy="68" rx="34" ry="32" fill="#8d5a3c" stroke={INK} strokeWidth="4" />
          <circle cx="48" cy="62" r="4" fill="#3a2418" />
          <circle cx="66" cy="58" r="4" fill="#3a2418" />
          <circle cx="60" cy="74" r="4" fill="#3a2418" />
          <ellipse cx="46" cy="50" rx="8" ry="4" fill="#c47a3a" opacity="0.7" />
        </g>
      )}
    </svg>
  );
}

export function Pebble({ color, size }: { color: string; size: number }) {
  const rx = size;
  const ry = Math.round(size * 0.72);
  return (
    <svg viewBox="0 0 100 80" aria-hidden="true">
      <ellipse cx="50" cy="42" rx={rx} ry={ry} fill={color} stroke={INK} strokeWidth="4" />
      <ellipse cx={50 - rx * 0.28} cy={42 - ry * 0.35} rx={rx * 0.25} ry={ry * 0.16} fill="#fff" opacity="0.55" />
    </svg>
  );
}

export function Ark() {
  return (
    <svg className="ark-svg" viewBox="0 0 360 230" aria-hidden="true">
      <path d="M40 120 A140 140 0 0 1 320 120" fill="none" stroke="#ff4d4d" strokeWidth="12" />
      <path d="M54 120 A126 126 0 0 1 306 120" fill="none" stroke="#ffd000" strokeWidth="12" />
      <path d="M68 120 A112 112 0 0 1 292 120" fill="none" stroke="#3ddc78" strokeWidth="12" />
      <path d="M82 120 A98 98 0 0 1 278 120" fill="none" stroke="#3d8bff" strokeWidth="12" />
      <path d="M30 150 Q180 110 330 150 L300 196 Q180 160 60 196 Z" fill="#c47a3a" stroke={INK} strokeWidth="5" />
      <path d="M70 168 Q180 142 290 168" fill="none" stroke="#8d4e24" strokeWidth="6" />
      <rect x="145" y="86" width="70" height="78" rx="10" fill="#8d4e24" stroke={INK} strokeWidth="5" />
      <circle cx="180" cy="124" r="8" fill="#ffd000" stroke={INK} strokeWidth="3" />
      <ellipse cx="180" cy="208" rx="150" ry="14" fill="#7dd3fc" opacity="0.85" />
    </svg>
  );
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path
        d="M50 8 L61 38 H94 L67 57 L78 90 L50 72 L22 90 L33 57 L6 38 H39 Z"
        fill="#ffd000"
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Slingshot() {
  return (
    <svg viewBox="0 0 160 180" aria-hidden="true">
      <path d="M40 160 L70 70" stroke="#a16207" strokeWidth="10" strokeLinecap="round" />
      <path d="M120 160 L90 70" stroke="#a16207" strokeWidth="10" strokeLinecap="round" />
      <path d="M70 78 Q80 110 90 78" fill="none" stroke="#ffd7a8" strokeWidth="6" />
      <circle cx="70" cy="66" r="10" fill="#f6c7a8" stroke={INK} strokeWidth="3" />
      <circle cx="90" cy="66" r="10" fill="#f6c7a8" stroke={INK} strokeWidth="3" />
    </svg>
  );
}

export function Germ({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="22" cy="24" r="8" fill={color} stroke={INK} strokeWidth="3" />
      <circle cx="58" cy="22" r="7" fill={color} stroke={INK} strokeWidth="3" />
      <circle cx="18" cy="50" r="7" fill={color} stroke={INK} strokeWidth="3" />
      <circle cx="62" cy="52" r="8" fill={color} stroke={INK} strokeWidth="3" />
      <circle cx="40" cy="40" r="22" fill={color} stroke={INK} strokeWidth="3" />
      <circle cx="32" cy="36" r="4" fill="#fff" />
      <circle cx="48" cy="36" r="4" fill="#fff" />
      <circle cx="33" cy="37" r="2" fill={INK} />
      <circle cx="49" cy="37" r="2" fill={INK} />
      <path d="M32 48 Q40 54 48 48" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function SoapBar() {
  return (
    <svg viewBox="0 0 140 90" aria-hidden="true">
      <rect x="8" y="18" width="124" height="58" rx="22" fill="#ffffff" stroke={INK} strokeWidth="4" />
      <rect x="20" y="28" width="48" height="14" rx="7" fill="#e0f7ff" />
      <circle cx="86" cy="48" r="8" fill="#ff4d8d" />
      <circle cx="108" cy="36" r="6" fill="#3d8bff" />
      <circle cx="70" cy="58" r="5" fill="#ffd000" />
      <circle cx="112" cy="58" r="4" fill="#3ddc78" />
    </svg>
  );
}

export function Brush() {
  return (
    <svg viewBox="0 0 48 120" aria-hidden="true">
      <rect x="16" y="36" width="16" height="74" rx="8" fill="#3d8bff" stroke={INK} strokeWidth="3" />
      <rect x="8" y="10" width="32" height="32" rx="8" fill="#ff4d8d" stroke={INK} strokeWidth="3" />
      <path d="M16 18 v16 M24 16 v18 M32 18 v16" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function HandsArt() {
  const finger = (x: number, y: number, rot: number) => (
    <rect
      key={`${x}-${y}`}
      x={x}
      y={y}
      width="22"
      height="48"
      rx="11"
      fill="#f6c7a8"
      stroke={INK}
      strokeWidth="3"
      transform={`rotate(${rot} ${x + 11} ${y + 40})`}
    />
  );
  return (
    <svg className="hands-svg" viewBox="0 0 360 230" aria-hidden="true">
      {finger(78, 18, -12)}
      {finger(104, 8, -4)}
      {finger(130, 8, 4)}
      {finger(156, 18, 14)}
      {finger(196, 18, -14)}
      {finger(222, 8, -4)}
      {finger(248, 8, 4)}
      {finger(274, 18, 12)}
      <ellipse cx="130" cy="130" rx="62" ry="52" fill="#f6c7a8" stroke={INK} strokeWidth="4" />
      <ellipse cx="238" cy="130" rx="62" ry="52" fill="#f3bb9a" stroke={INK} strokeWidth="4" />
      <ellipse cx="112" cy="118" rx="16" ry="10" fill="#fff" opacity="0.35" />
      <ellipse cx="220" cy="116" rx="16" ry="10" fill="#fff" opacity="0.28" />
    </svg>
  );
}

export function Toy({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {id === 'bola' && (
        <g>
          <circle cx="50" cy="52" r="32" fill="#ff3b3b" stroke={INK} strokeWidth="4" />
          <path d="M28 40 Q50 52 30 70" fill="none" stroke="#fff" strokeWidth="4" />
          <path d="M50 22 Q46 52 62 78" fill="none" stroke="#fff" strokeWidth="4" />
        </g>
      )}
      {id === 'carro' && (
        <g>
          <rect x="16" y="48" width="68" height="26" rx="10" fill="#3d8bff" stroke={INK} strokeWidth="4" />
          <path d="M30 48 L40 30 H66 L76 48" fill="#7dd3fc" stroke={INK} strokeWidth="4" />
          <circle cx="32" cy="76" r="10" fill="#2c2148" />
          <circle cx="70" cy="76" r="10" fill="#2c2148" />
          <circle cx="32" cy="76" r="4" fill="#fff" />
          <circle cx="70" cy="76" r="4" fill="#fff" />
        </g>
      )}
      {id === 'pato' && (
        <g>
          <ellipse cx="50" cy="62" rx="30" ry="22" fill="#ffe14a" stroke={INK} strokeWidth="4" />
          <circle cx="72" cy="42" r="16" fill="#ffe14a" stroke={INK} strokeWidth="4" />
          <circle cx="78" cy="40" r="3" fill={INK} />
          <path d="M84 44 l16 4 -16 6z" fill="#ff8a00" stroke={INK} strokeWidth="3" />
        </g>
      )}
      {id === 'bloco' && (
        <g>
          <rect x="22" y="22" width="56" height="56" rx="12" fill="#3ddc78" stroke={INK} strokeWidth="4" />
          <path d="M50 36 L54 46 H66 L56 52 L60 64 L50 56 L40 64 L44 52 L34 46 H46 Z" fill="#fff" />
        </g>
      )}
    </svg>
  );
}

export function Pencil() {
  return (
    <svg viewBox="0 0 80 140" aria-hidden="true">
      <polygon points="40,8 52,36 28,36" fill="#f6c7a8" stroke={INK} strokeWidth="3" />
      <rect x="28" y="34" width="24" height="70" fill="#ffd000" stroke={INK} strokeWidth="3" />
      <rect x="28" y="78" width="24" height="16" fill="#ff4d8d" stroke={INK} strokeWidth="3" />
      <rect x="28" y="104" width="24" height="18" rx="3" fill="#3d8bff" stroke={INK} strokeWidth="3" />
    </svg>
  );
}

export function LettersABC() {
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true">
      <text x="8" y="58" fontSize="48" fontWeight="700" fill="#ff4d4d" fontFamily="Fredoka, sans-serif">
        A
      </text>
      <text x="42" y="58" fontSize="48" fontWeight="700" fill="#3d8bff" fontFamily="Fredoka, sans-serif">
        B
      </text>
      <text x="78" y="58" fontSize="48" fontWeight="700" fill="#3ddc78" fontFamily="Fredoka, sans-serif">
        C
      </text>
    </svg>
  );
}

export function StickerGraphic({ id }: { id: string }) {
  switch (id) {
    case 'missionario-1':
      return <Pebble color="#ffc83a" size={30} />;
    case 'missionario-2':
      return <Ark />;
    case 'missionario-3':
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="38" cy="58" r="22" fill="#7ad7ff" stroke={INK} strokeWidth="4" />
          <circle cx="66" cy="42" r="26" fill="#ff8ec8" stroke={INK} strokeWidth="4" />
        </svg>
      );
    case 'missionario-4':
      return <StarIcon />;
    case 'missionario-5':
      return <Animal id="pomba" />;
    case 'missionario-6':
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="34" fill="#ffd36a" stroke={INK} strokeWidth="4" />
          <text x="32" y="68" fontSize="54" fontWeight="700" fill="#2c2148" fontFamily="Fredoka, sans-serif">
            ?
          </text>
        </svg>
      );
    case 'missionario-7':
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="34" fill="#3ddc78" stroke={INK} strokeWidth="4" />
          <path d="M30 52 l14 14 l28-30" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );
    case 'missionario-8':
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path d="M50 82 C20 58 14 36 30 26 C40 20 48 28 50 36 C52 28 60 20 70 26 C86 36 80 58 50 82Z" fill="#ff4d6a" stroke={INK} strokeWidth="4" />
        </svg>
      );
    case 'escolinha-1':
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="28" fill="#ff3b3b" stroke="#fff" strokeWidth="6" />
        </svg>
      );
    case 'escolinha-2':
      return <Fruit id="maca" />;
    case 'escolinha-3':
      return <LettersABC />;
    case 'escolinha-4':
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <text x="28" y="72" fontSize="64" fontWeight="700" fill="#5b35e8" fontFamily="Fredoka, sans-serif">
            3
          </text>
        </svg>
      );
    case 'escolinha-5':
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <polygon points="50,12 90,84 10,84" fill="#ffd000" stroke={INK} strokeWidth="4" />
        </svg>
      );
    case 'higiene-1':
      return <SoapBar />;
    case 'higiene-2':
      return <Brush />;
    case 'higiene-3':
      return <Toy id="bola" />;
    case 'higiene-4':
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path d="M18 48 h64 v28 a24 24 0 0 1 -64 0z" fill="#7ad7ff" stroke={INK} strokeWidth="4" />
          <circle cx="36" cy="40" r="8" fill="#fff" stroke={INK} strokeWidth="3" />
          <circle cx="58" cy="32" r="10" fill="#fff" stroke={INK} strokeWidth="3" />
        </svg>
      );
    case 'higiene-5':
      return <Fruit id="maca" />;
    default:
      return <StarIcon />;
  }
}
