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
            d="M256 486 C168 372 96 300 96 190 A160 160 0 1 1 416 190 C416 300 344 372 256 486 Z"
            fill="white"
          />
          <circle cx="256" cy="190" r="92" fill="black" />
          <rect x="256" y="142" width="220" height="96" fill="black" />
        </mask>
      </defs>
      <path
        d="M256 486 C168 372 96 300 96 190 A160 160 0 1 1 416 190 C416 300 344 372 256 486 Z"
        fill="url(#crusitLogoGradient)"
        mask="url(#crusitLogoMask)"
      />
    </svg>
  );
}
