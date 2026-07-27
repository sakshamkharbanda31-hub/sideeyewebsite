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
  alt,
  caption,
  grayscale = false,
  asBackground = false,
}: PageBannerProps) {
  if (!src) return null;

  if (asBackground) {
    return (
      <>
        <div className="absolute inset-0">
          <Image
            src={src}
            alt={alt || "Page background"}
            fill
            className={`object-cover ${grayscale ? "grayscale" : ""}`}
            priority
          />
          <div className="absolute inset-0 bg-stone/75" />
        </div>
        {caption && (
          <p className="absolute bottom-4 right-4 z-10 font-mono text-[10px] uppercase tracking-wider text-muted">
            {caption}
          </p>
        )}
      </>
    );
  }

  return (
    <section className="border-b border-black/10">
      <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-96">
        <Image
          src={src}
          alt={alt || "Page banner"}
          fill
          className={`object-cover ${grayscale ? "grayscale" : ""}`}
          priority
        />
        {caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-white/90">
              {caption}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}