/**
 * Тематические векторные иллюстрации. Это рисунки, а не фотографии садика.
 */

type Props = { className?: string; title?: string };

function Svg({ className, title, viewBox, children }: Props & { viewBox: string; children: React.ReactNode }) {
  return (
    <svg viewBox={viewBox} className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

/** Запасная иллюстрация для первого экрана: домик-садик с солнцем */
export function KindergartenScene({ className, title }: Props) {
  return (
    <Svg viewBox="0 0 400 360" className={className} title={title}>
      <rect width="400" height="360" fill="#E9D9FF" />
      <circle cx="320" cy="70" r="36" fill="#FFD666" />
      <path d="M40 90c0-14 12-24 26-22 4-12 16-20 30-18 14 2 22 12 22 24 12 0 20 8 20 18H40Z" fill="#fff" />
      <path d="M0 270c80-40 160-40 240-14s120 18 160-6v110H0Z" fill="#B9EBC8" />
      <rect x="110" y="150" width="180" height="130" rx="14" fill="#FFF6E0" />
      <path d="M96 160 200 88l104 72Z" fill="#E8608F" />
      <rect x="180" y="210" width="40" height="70" rx="20" fill="#A78BFA" />
      <rect x="128" y="182" width="36" height="34" rx="10" fill="#9ED8F5" />
      <rect x="236" y="182" width="36" height="34" rx="10" fill="#9ED8F5" />
      <circle cx="200" cy="130" r="14" fill="#FFE6A7" />
      <circle cx="60" cy="280" r="18" fill="#2F9E5B" />
      <rect x="57" y="290" width="6" height="26" fill="#8C6239" />
      <circle cx="340" cy="270" r="22" fill="#2F9E5B" />
      <rect x="337" y="282" width="6" height="30" fill="#8C6239" />
    </Svg>
  );
}

/** Балапан — цыплёнок */
export function ChickIllustration({ className }: Props) {
  return (
    <Svg viewBox="0 0 120 120" className={className}>
      <ellipse cx="60" cy="104" rx="34" ry="6" fill="#F5B42A" opacity=".25" />
      <ellipse cx="60" cy="72" rx="34" ry="30" fill="#FFD23F" />
      <circle cx="60" cy="42" r="24" fill="#FFD23F" />
      <path d="M54 18c2-8 10-10 12-4-4 0-6 2-6 6Z" fill="#F5B42A" />
      <circle cx="51" cy="40" r="3.6" fill="#28334A" />
      <circle cx="69" cy="40" r="3.6" fill="#28334A" />
      <circle cx="52.2" cy="38.8" r="1.2" fill="#fff" />
      <circle cx="70.2" cy="38.8" r="1.2" fill="#fff" />
      <path d="M54 48h12l-6 8Z" fill="#F28C28" />
      <circle cx="44" cy="50" r="4" fill="#FF9DBE" opacity=".8" />
      <circle cx="76" cy="50" r="4" fill="#FF9DBE" opacity=".8" />
      <path d="M28 70c-8 2-10 12-4 16 6-2 10-8 4-16Z" fill="#F5B42A" />
      <path d="M92 70c8 2 10 12 4 16-6-2-10-8-4-16Z" fill="#F5B42A" />
      <path d="M50 100v6M70 100v6" stroke="#F28C28" strokeWidth="4" strokeLinecap="round" />
    </Svg>
  );
}

/** Ботақан — верблюжонок */
export function CamelIllustration({ className }: Props) {
  return (
    <Svg viewBox="0 0 120 120" className={className}>
      <ellipse cx="60" cy="108" rx="38" ry="5" fill="#2F9E5B" opacity=".2" />
      <path d="M30 72c0-14 8-26 18-26 6 0 8 6 12 6s6-10 14-10c10 0 14 14 14 30Z" fill="#D9A066" />
      <rect x="28" y="66" width="62" height="18" rx="9" fill="#D9A066" />
      <path d="M34 82v22M46 82v22M72 82v22M84 82v22" stroke="#C08850" strokeWidth="7" strokeLinecap="round" />
      <path d="M86 70c6-6 8-18 8-28" stroke="#D9A066" strokeWidth="10" strokeLinecap="round" fill="none" />
      <ellipse cx="98" cy="36" rx="13" ry="10" fill="#D9A066" />
      <ellipse cx="108" cy="40" rx="6" ry="5" fill="#E8B985" />
      <circle cx="98" cy="33" r="2.6" fill="#28334A" />
      <path d="M90 26c-2-4 0-7 3-6" stroke="#C08850" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="94" cy="40" r="2.6" fill="#FF9DBE" />
      <path d="M40 60c8-2 12 4 20 2" stroke="#E8608F" strokeWidth="3" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

/** Балдәурен — книга, звезда и карандаш (подготовка к школе) */
export function SchoolIllustration({ className }: Props) {
  return (
    <Svg viewBox="0 0 120 120" className={className}>
      <ellipse cx="60" cy="108" rx="40" ry="5" fill="#6D4BD1" opacity=".18" />
      <path d="M14 46c16-6 32-4 46 6v52c-14-10-30-12-46-6Z" fill="#fff" stroke="#6D4BD1" strokeWidth="3" />
      <path d="M106 46c-16-6-32-4-46 6v52c14-10 30-12 46-6Z" fill="#F4ECFF" stroke="#6D4BD1" strokeWidth="3" />
      <path d="M24 62c8-2 18-1 26 4M24 74c8-2 18-1 26 4M70 66c8-5 18-6 26-4M70 78c8-5 18-6 26-4" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 6l5 10 11 1.5-8 7.5 2 11-10-5.5L50 36l2-11-8-7.5L55 16Z" fill="#FFD23F" />
      <rect x="86" y="14" width="10" height="34" rx="2" transform="rotate(30 91 31)" fill="#E8608F" />
      <path d="m99.5 44.5-6 3.5 1-7Z" fill="#28334A" />
    </Svg>
  );
}

/** Тарелка с едой для раздела «Тамақтану» */
export function PlateIllustration({ className, title }: Props) {
  return (
    <Svg viewBox="0 0 240 240" className={className} title={title}>
      <circle cx="120" cy="124" r="104" fill="#fff" />
      <circle cx="120" cy="124" r="104" fill="none" stroke="#E9D9FF" strokeWidth="8" />
      <circle cx="120" cy="124" r="78" fill="#FFF8EC" />
      {/* брокколи */}
      <circle cx="82" cy="96" r="14" fill="#3DB36B" />
      <circle cx="96" cy="88" r="12" fill="#2F9E5B" />
      <circle cx="72" cy="84" r="10" fill="#4CC47A" />
      <rect x="84" y="102" width="8" height="18" rx="4" fill="#8BD3A2" />
      {/* морковь */}
      <path d="M150 74c14 6 22 18 22 24-10 2-24-6-30-18Z" fill="#FF8A3D" />
      <path d="M152 74c-2-8 2-12 6-12M150 74c-6-6-4-12 0-12" stroke="#2F9E5B" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* яичница/сырник */}
      <ellipse cx="124" cy="150" rx="36" ry="24" fill="#FFFFFF" stroke="#F3E6C8" strokeWidth="3" />
      <circle cx="128" cy="148" r="12" fill="#FFC93C" />
      {/* помидорки */}
      <circle cx="78" cy="148" r="12" fill="#F2545B" />
      <circle cx="90" cy="168" r="10" fill="#F2545B" />
      <path d="M74 137l4 3 4-3M86 159l4 3 4-3" stroke="#2F9E5B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* ягоды */}
      <circle cx="168" cy="132" r="7" fill="#A78BFA" />
      <circle cx="178" cy="144" r="7" fill="#8F6FF0" />
      <circle cx="164" cy="148" r="7" fill="#B9A0FF" />
    </Svg>
  );
}

export function AppleIcon({ className }: Props) {
  return (
    <Svg viewBox="0 0 40 40" className={className}>
      <path d="M20 12c-6-4-15-1-15 9 0 9 6 16 10 16 2 0 3-1 5-1s3 1 5 1c4 0 10-7 10-16 0-10-9-13-15-9Z" fill="#F2545B" />
      <path d="M20 12c0-4 2-7 6-8" stroke="#8C6239" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M21 8c4-4 9-3 10 0-4 2-7 2-10 0Z" fill="#3DB36B" />
    </Svg>
  );
}

export function PearIcon({ className }: Props) {
  return (
    <Svg viewBox="0 0 40 40" className={className}>
      <path d="M20 8c4 0 5 5 5 9 4 3 7 7 7 11 0 6-5 9-12 9S8 34 8 28c0-4 3-8 7-11 0-4 1-9 5-9Z" fill="#A6D94E" />
      <path d="M20 8V3" stroke="#8C6239" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M21 5c3-3 7-2 8 0-3 2-6 2-8 0Z" fill="#3DB36B" />
    </Svg>
  );
}

export function CarrotIcon({ className }: Props) {
  return (
    <Svg viewBox="0 0 40 40" className={className}>
      <path d="M8 34 26 14c3-3 8 2 5 5L11 37c-2 1-4-1-3-3Z" fill="#FF8A3D" />
      <path d="M28 12c0-5 3-8 6-8M30 14c4-2 8-1 8 2M27 12c-3-3-2-7 0-8" stroke="#3DB36B" strokeWidth="3" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

/** Логопед: облачко речи с буквами */
export function SpeechIllustration({ className }: Props) {
  return (
    <Svg viewBox="0 0 120 100" className={className}>
      <path d="M14 12h66a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H44l-16 14v-14H14A10 10 0 0 1 4 56V22a10 10 0 0 1 10-10Z" fill="#fff" stroke="#E8608F" strokeWidth="3" />
      <text x="47" y="48" textAnchor="middle" fontSize="24" fontWeight="800" fill="#E8608F" fontFamily="inherit">Ә Ө</text>
      <path d="M96 30c6 4 6 14 0 18M104 24c10 8 10 22 0 30" stroke="#A78BFA" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

/** Таеквондо: ребёнок в добоке с поясом */
export function TaekwondoIllustration({ className }: Props) {
  return (
    <Svg viewBox="0 0 120 110" className={className}>
      <ellipse cx="56" cy="104" rx="34" ry="4" fill="#2F9E5B" opacity=".25" />
      <circle cx="52" cy="20" r="13" fill="#F3C9A1" />
      <path d="M40 16c2-10 22-12 25 0-6-4-17-4-25 0Z" fill="#28334A" />
      <circle cx="47.5" cy="21" r="1.8" fill="#28334A" />
      <circle cx="57" cy="21" r="1.8" fill="#28334A" />
      <path d="M49 27c2 1.6 4 1.6 6 0" stroke="#28334A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M36 38c4-4 28-4 32 0l4 26H32Z" fill="#fff" stroke="#BFC7D6" strokeWidth="2" />
      <path d="M52 36v28" stroke="#BFC7D6" strokeWidth="2" />
      <rect x="32" y="56" width="40" height="7" rx="3" fill="#28334A" />
      <path d="M46 63l-4 10M58 63l4 10" stroke="#28334A" strokeWidth="4" strokeLinecap="round" />
      <path d="M68 42 96 30" stroke="#fff" strokeWidth="11" strokeLinecap="round" />
      <path d="M68 42 96 30" stroke="#BFC7D6" strokeWidth="1.5" strokeLinecap="round" opacity=".6" />
      <circle cx="100" cy="28" r="6" fill="#F3C9A1" />
      <path d="M38 44 24 58" stroke="#fff" strokeWidth="11" strokeLinecap="round" />
      <circle cx="22" cy="61" r="6" fill="#F3C9A1" />
      <path d="M42 66 36 100M62 66l8 34" stroke="#fff" strokeWidth="12" strokeLinecap="round" />
      <path d="M42 66 36 100M62 66l8 34" stroke="#BFC7D6" strokeWidth="1.5" strokeLinecap="round" opacity=".6" />
    </Svg>
  );
}

/** Ағылшын тілі: кубики ABC */
export function AbcIllustration({ className }: Props) {
  const blocks = [
    { x: 8, y: 48, c: "#FFD23F", l: "A", r: -6 },
    { x: 46, y: 52, c: "#A78BFA", l: "B", r: 4 },
    { x: 26, y: 12, c: "#3DB36B", l: "C", r: 8 },
  ];
  return (
    <Svg viewBox="0 0 100 100" className={className}>
      <ellipse cx="50" cy="94" rx="40" ry="4" fill="#6D4BD1" opacity=".15" />
      {blocks.map((b) => (
        <g key={b.l} transform={`rotate(${b.r} ${b.x + 20} ${b.y + 20})`}>
          <rect x={b.x} y={b.y} width="40" height="40" rx="8" fill={b.c} />
          <rect x={b.x + 5} y={b.y + 5} width="30" height="30" rx="6" fill="#fff" opacity=".9" />
          <text x={b.x + 20} y={b.y + 29} textAnchor="middle" fontSize="22" fontWeight="900" fill="#28334A" fontFamily="inherit">
            {b.l}
          </text>
        </g>
      ))}
    </Svg>
  );
}
