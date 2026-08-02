import Image from "next/image";

interface PageBannerProps {
  src?: string;
  alt?: string;
  caption?: string;
  grayscale?: boolean;
  asBackground?: boolean;
}

export default function PageBanner({
  src,
  alt = "Page banner",
  caption,
  grayscale = false,
  asBackground = false,
}: PageBannerProps) {
  // If src is missing, null, or empty string, render nothing safely
  if (!src || typeof src !== "string" || src.trim() === "") {
    return null;
  }

  if (asBackground) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className={`relative h-full w-full ${grayscale ? "grayscale" : ""}`}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover opacity-30"
            unoptimized
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-neutral-900 my-6">
      <div className={`relative h-48 sm:h-64 md:h-80 w-full ${grayscale ? "grayscale" : ""}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      {caption && (
        <p className="p-3 text-center text-xs text-neutral-400 bg-neutral-900/80">
          {caption}
        </p>
      )}
    </div>
  );
}