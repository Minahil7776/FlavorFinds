export default function HeroSVG() {
  return (
    <svg
      viewBox="0 0 1200 500"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      {/* Deep warm base */}
      <rect width="1200" height="500" fill="#1A0A02" />

      {/* Dark wood table surface */}
      <rect y="260" width="1200" height="240" fill="#0F0601" />

      {/* Wood grain lines */}
      <line x1="0" y1="270" x2="1200" y2="275" stroke="#1E0E04" strokeWidth="2" />
      <line x1="0" y1="310" x2="1200" y2="306" stroke="#1E0E04" strokeWidth="1.5" />
      <line x1="0" y1="360" x2="1200" y2="365" stroke="#1E0E04" strokeWidth="2" />
      <line x1="0" y1="410" x2="1200" y2="407" stroke="#1E0E04" strokeWidth="1" />
      <line x1="0" y1="450" x2="1200" y2="455" stroke="#1E0E04" strokeWidth="1.5" />

      {/* Ambient warm glows */}
      <ellipse cx="900" cy="180" rx="340" ry="200" fill="#8B3010" opacity="0.28" />
      <ellipse cx="1050" cy="100" rx="200" ry="140" fill="#C4580A" opacity="0.18" />
      <ellipse cx="750" cy="380" rx="300" ry="120" fill="#6B2A08" opacity="0.22" />

      {/* ── PASTA BOWL (right center) ── */}
      <g transform="translate(720,210)">
        <ellipse cx="0" cy="110" rx="165" ry="24" fill="#000" opacity="0.4" />
        <ellipse cx="0" cy="90" rx="162" ry="28" fill="#1A0A02" />
        <ellipse cx="0" cy="68" rx="162" ry="28" fill="#2D1506" />
        <ellipse cx="0" cy="66" rx="158" ry="26" fill="#3A1C08" />
        <ellipse cx="0" cy="60" rx="148" ry="22" fill="#8B2800" />
        <ellipse cx="0" cy="52" rx="140" ry="19" fill="#C4860A" />
        <path d="M-100,52 Q-70,38 -40,52 Q-10,66 20,52 Q50,38 80,52 Q110,66 130,52" stroke="#E8A820" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M-110,56 Q-80,42 -50,56 Q-20,70 10,56 Q40,42 70,56 Q100,70 125,56" stroke="#D4950F" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M-80,48 Q-50,36 -20,50 Q10,64 40,48 Q70,34 100,48" stroke="#F0B830" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="-30" cy="44" r="14" fill="#C02010" opacity="0.85" />
        <circle cx="40" cy="50" r="11" fill="#D03018" opacity="0.8" />
        <circle cx="-60" cy="52" r="9" fill="#B81808" opacity="0.75" />
        <ellipse cx="-20" cy="40" rx="10" ry="5" fill="#2A6010" transform="rotate(-20,-20,40)" />
        <ellipse cx="50" cy="44" rx="9" ry="4" fill="#347014" transform="rotate(15,50,44)" />
        <ellipse cx="10" cy="38" rx="12" ry="5" fill="#F0E8C0" opacity="0.7" transform="rotate(10,10,38)" />
        <ellipse cx="-50" cy="46" rx="10" ry="4" fill="#EEE4B8" opacity="0.65" transform="rotate(-15,-50,46)" />
        <path d="M-162,66 Q-170,90 -162,96" stroke="#5A2C10" strokeWidth="3" fill="none" />
      </g>

      {/* ── STEAK PLATE (far right) ── */}
      <g transform="translate(1050,270)">
        <ellipse cx="0" cy="80" rx="120" ry="16" fill="#000" opacity="0.35" />
        <ellipse cx="0" cy="64" rx="118" ry="17" fill="#1A0A02" />
        <ellipse cx="0" cy="60" rx="116" ry="16" fill="#2A1408" />
        <ellipse cx="0" cy="56" rx="110" ry="14" fill="#F5F0E8" />
        <ellipse cx="0" cy="52" rx="98" ry="12" fill="#F0EBE0" />
        <ellipse cx="5" cy="46" rx="62" ry="18" fill="#4A1508" transform="rotate(-8,5,46)" />
        <ellipse cx="5" cy="42" rx="58" ry="16" fill="#6B2010" transform="rotate(-8,5,42)" />
        <line x1="-30" y1="30" x2="-15" y2="54" stroke="#2A0A04" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="-10" y1="27" x2="5" y2="51" stroke="#2A0A04" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="12" y1="26" x2="27" y2="50" stroke="#2A0A04" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="-55" cy="46" r="14" fill="#1E4A08" />
        <ellipse cx="-55" cy="44" rx="12" ry="8" fill="#2A6010" />
        <path d="M20,36 Q35,28 50,36 Q55,44 48,52" stroke="#8B1A04" strokeWidth="3" fill="none" opacity="0.7" />
      </g>

      {/* ── SOUP BOWL ── */}
      <g transform="translate(930,310)">
        <ellipse cx="0" cy="60" rx="90" ry="13" fill="#000" opacity="0.3" />
        <ellipse cx="0" cy="50" rx="88" ry="13" fill="#1A0A02" />
        <ellipse cx="0" cy="46" rx="86" ry="12" fill="#2D1506" />
        <ellipse cx="0" cy="42" rx="80" ry="11" fill="#8B3800" />
        <ellipse cx="0" cy="36" rx="74" ry="10" fill="#C45A0A" />
        <ellipse cx="-20" cy="32" rx="20" ry="6" fill="#D4720C" opacity="0.6" />
        <ellipse cx="25" cy="34" rx="18" ry="5" fill="#BA4E08" opacity="0.5" />
        <circle cx="0" cy="30" r="6" fill="#1E4A08" />
        <circle cx="-10" cy="32" r="4" fill="#C02010" opacity="0.8" />
        <circle cx="12" cy="31" r="3" fill="#C02010" opacity="0.75" />
      </g>

      {/* ── HERB SPRIGS ── */}
      <g opacity="0.5">
        <ellipse cx="620" cy="300" rx="12" ry="5" fill="#2A5A0A" transform="rotate(30,620,300)" />
        <ellipse cx="635" cy="295" rx="10" ry="4" fill="#347010" transform="rotate(-20,635,295)" />
        <line x1="625" y1="302" x2="640" y2="290" stroke="#1E4008" strokeWidth="1.5" />
      </g>

      {/* ── SPICE PILES ── */}
      <ellipse cx="660" cy="320" rx="22" ry="8" fill="#8B1A04" opacity="0.4" transform="rotate(-10,660,320)" />
      <ellipse cx="650" cy="316" rx="18" ry="6" fill="#C02010" opacity="0.35" transform="rotate(-10,650,316)" />

      {/* ── WINE GLASS ── */}
      <g transform="translate(1170,200)" opacity="0.6">
        <line x1="0" y1="0" x2="0" y2="120" stroke="#8B6A40" strokeWidth="2" />
        <ellipse cx="0" cy="120" rx="18" ry="4" fill="#6B4A28" opacity="0.7" />
        <path d="M-22,0 Q-28,40 0,50 Q28,40 22,0 Z" fill="#6B1A30" opacity="0.55" />
        <path d="M-20,2 Q-14,18 0,22" stroke="#C090A0" strokeWidth="1" fill="none" opacity="0.4" />
        <ellipse cx="0" cy="35" rx="20" ry="6" fill="#8B1A30" opacity="0.5" />
      </g>

      {/* ── CHERRY TOMATOES ── */}
      <circle cx="845" cy="295" r="9" fill="#C02010" opacity="0.7" />
      <circle cx="858" cy="302" r="7" fill="#D03018" opacity="0.65" />
      <line x1="845" y1="286" x2="848" y2="280" stroke="#2A6010" strokeWidth="1.5" />
      <line x1="858" y1="295" x2="862" y2="289" stroke="#2A6010" strokeWidth="1.5" />

      {/* ── WOODEN SPOON ── */}
      <g transform="translate(680,290) rotate(-35,0,0)" opacity="0.55">
        <rect x="-4" y="-80" width="8" height="100" rx="4" fill="#8B5820" />
        <ellipse cx="0" cy="-85" rx="16" ry="12" fill="#A06828" />
      </g>

      {/* ── AMBIENT LIGHT POOLS ── */}
      <ellipse cx="850" cy="350" rx="200" ry="60" fill="#C4580A" opacity="0.06" />
      <ellipse cx="1100" cy="380" rx="150" ry="50" fill="#E8820A" opacity="0.05" />
    </svg>
  )
}