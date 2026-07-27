import { Schema, models, model } from "mongoose";

export interface IHeroVideo {
  key: string;
  videoPath: string;
  updatedAt?: Date;
}

const HeroVideoSchema = new Schema<IHeroVideo>(
  {
    key: { type: String, required: true, unique: true, default: "home-hero" },
    videoPath: { type: String, required: true },
  },
  { timestamps: true }
);

export const HeroVideo = models.HeroVideo || model<IHeroVideo>("HeroVideo", HeroVideoSchema);