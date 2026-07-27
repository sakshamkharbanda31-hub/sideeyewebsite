import { Schema, model, models } from "mongoose";

const PageContentSchema = new Schema(
  {
    pageKey: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const PageContent =
  models.PageContent || model("PageContent", PageContentSchema);