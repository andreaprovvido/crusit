type LogoProps = {
  className?: string;
  title?: string;
};

export default function Logo({ className, title = "Crusit" }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <linearGradient id="crusitLogoGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A66BFF" />
          <stop offset="0.55" stopColor="#5B8DEF" />
          <stop offset="1" stopColor="#27C4FF" />
        </linearGradient>
        <mask id="crusitLogoMask">
          <path
            d="M365.1 127 A126 126 0 1 0 365.1 253"
            fill="none"
            stroke="white"
            strokeWidth="68"
            strokeLinecap="round"
          />
          <path
            d="M176 328.6 A160 160 0 0 0 336 328.6 C322 400 272 470 256 486 C240 470 190 400 176 328.6 Z"
            fill="white"
          />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="512"
        height="512"
        fill="url(#crusitLogoGradient)"
        mask="url(#crusitLogoMask)"
      />
    </svg>
  );
}
