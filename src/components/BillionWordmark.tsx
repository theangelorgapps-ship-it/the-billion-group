type BillionWordmarkProps = {
  className?: string
}

export function BillionWordmark({ className }: BillionWordmarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 560 132"
      role="img"
      aria-label="Billion — The Billion Group"
      preserveAspectRatio="xMidYMid meet"
    >
      <text x="280" y="67" textAnchor="middle" fill="currentColor" fontFamily="Georgia, 'Times New Roman', serif" fontSize="70" letterSpacing="24">BILLION</text>
      <path d="M24 82H536M24 126H536" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="280" y="112" textAnchor="middle" fill="currentColor" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" letterSpacing="11">THE BILLION GROUP</text>
    </svg>
  )
}
