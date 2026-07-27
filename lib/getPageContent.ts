import { connectDB } from "@/lib/mongodb";
import { PageContent } from "@/models/PageContent";

export async function getPageContent<T>(pageKey: string, fallback: T): Promise<T> {
  try {
    await connectDB();
    const record = await PageContent.findOne({ pageKey }).lean();
    if (record && (record as any).data) {
      return { ...fallback, ...(record as any).data };
    }
  } catch {
    // fall through to fallback
  }
  return fallback;
}