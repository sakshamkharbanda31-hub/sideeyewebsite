import { connectDB } from "@/lib/mongodb";
import { Banner } from "@/models/Banner";

export interface BannerData {
  imagePath: string;
  alt: string;
  caption: string;
  grayscale: boolean;
}

export async function getBanner(pageKey: string): Promise<BannerData | null> {
  try {
    await connectDB();
    const banner = await Banner.findOne({ pageKey }).lean();
    if (!banner) return null;
    return JSON.parse(JSON.stringify(banner));
  } catch {
    return null;
  }
}