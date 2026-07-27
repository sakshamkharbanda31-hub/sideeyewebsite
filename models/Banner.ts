import { Schema, models, model } from "mongoose";

export interface IBanner {
  pageKey: string;
  imagePath: string;
  alt: string;
  caption: string;
  grayscale: boolean;
  updatedAt?: Date;
}

const BannerSchema = new Schema<IBanner>(
  {
    pageKey: { type: String, required: true, unique: true },
    imagePath: { type: String, required: true },
    alt: { type: String, default: "" },
    caption: { type: String, default: "" },
    grayscale: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Banner = models.Banner || model<IBanner>("Banner", BannerSchema);