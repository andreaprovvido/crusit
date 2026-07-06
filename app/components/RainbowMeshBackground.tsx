type ColorBlob = {
  rgb: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
};

const HOME_BLOBS: ColorBlob[] = [
  { rgb: "0, 220, 120", x: -6, y: -4, width: 58, height: 42, opacity: 0.62 },
  { rgb: "0, 205, 255", x: 14, y: 10, width: 46, height: 36, opacity: 0.58 },
  { rgb: "35, 90, 255", x: 38, y: 2, width: 54, height: 48, opacity: 0.6 },
  { rgb: "145, 45, 255", x: 24, y: 16, width: 50, height: 44, opacity: 0.58 },
  { rgb: "255, 35, 165", x: 18, y: 28, width: 48, height: 40, opacity: 0.55 },
  { rgb: "255, 45, 45", x: 58, y: 34, width: 42, height: 34, opacity: 0.56 },
  { rgb: "255, 120, 0", x: 68, y: 40, width: 46, height: 38, opacity: 0.58 },
  { rgb: "255, 230, 0", x: 78, y: 46, width: 40, height: 32, opacity: 0.54 },
  { rgb: "0, 220, 120", x: 82, y: 6, width: 38, height: 30, opacity: 0.28 },
  { rgb: "255, 35, 165", x: 72, y: -8, width: 34, height: 28, opacity: 0.22 },
  { rgb: "35, 90, 255", x: 8, y: 40, width: 36, height: 30, opacity: 0.24 },
  { rgb: "255, 120, 0", x: 44, y: -6, width: 32, height: 26, opacity: 0.2 },
];

const SPOTS_BLOBS: ColorBlob[] = [
  { rgb: "0, 220, 120", x: -8, y: -6, width: 40, height: 26, opacity: 0.3 },
  { rgb: "0, 205, 255", x: 12, y: 4, width: 34, height: 22, opacity: 0.28 },
  { rgb: "35, 90, 255", x: 36, y: -2, width: 38, height: 28, opacity: 0.29 },
  { rgb: "145, 45, 255", x: 22, y: 10, width: 36, height: 24, opacity: 0.27 },
  { rgb: "255, 35, 165", x: 16, y: 18, width: 34, height: 22, opacity: 0.26 },
  { rgb: "255, 45, 45", x: 56, y: 22, width: 30, height: 20, opacity: 0.27 },
  { rgb: "255, 120, 0", x: 66, y: 26, width: 32, height: 22, opacity: 0.28 },
  { rgb: "255, 230, 0", x: 76, y: 30, width: 28, height: 18, opacity: 0.25 },
];

type RainbowMeshBackgroundProps = {
  variant?: "home" | "spots";
};

const VARIANT_CONFIG = {
  home: {
    blobs: HOME_BLOBS,
    blur: 110,
    grainClassName: "opacity-[0.06]",
    mask: undefined,
  },
  spots: {
    blobs: SPOTS_BLOBS,
    blur: 118,
    grainClassName: "opacity-[0.04]",
    mask:
      "linear-gradient(to bottom, black 0%, black 16%, rgba(0,0,0,0.75) 32%, rgba(0,0,0,0.35) 48%, rgba(0,0,0,0.08) 62%, transparent 78%)",
  },
} as const;

export default function RainbowMeshBackground({
  variant = "home",
}: RainbowMeshBackgroundProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={
        config.mask
          ? {
              WebkitMaskImage: config.mask,
              maskImage: config.mask,
            }
          : undefined
      }
      aria-hidden
    >
      <div
        className="absolute inset-0 scale-110 transform-gpu"
        style={{ filter: `blur(${config.blur}px)` }}
      >
        {config.blobs.map((blob, index) => (
          <div
            key={index}
            className="absolute rounded-full"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: `${blob.width}vw`,
              height: `${blob.height}vh`,
              backgroundColor: `rgba(${blob.rgb}, ${blob.opacity})`,
            }}
          />
        ))}
      </div>
      <div className={`mesh-grain absolute inset-0 ${config.grainClassName}`} />
    </div>
  );
}
