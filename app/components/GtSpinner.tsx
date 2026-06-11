export function GtSpinner() {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="size-14 animate-spin"
        viewBox="0 0 50 50"
      >
        {/* Arco exterior */}
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="85 30"
        />

        {/* Palo central (flipper bat) */}
        <line
          x1="25"
          y1="4"
          x2="25"
          y2="26"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        <line
        x1="26"
        y1="4"
        x2="26"
        y2="26"
        stroke="white"
        strokeWidth="3.5"
        />

        <line
        x1="26"
        y1="4"
        x2="27"
        y2="26"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

