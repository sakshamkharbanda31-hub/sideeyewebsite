import mongoose, { Schema, models, model } from "mongoose";

export interface ILead {
  name: string;
  email: string;
  phone: string;
  interest: string;
  budget: string;
  message: string;
  optInTimestamp: Date;
  status: "new" | "contacted" | "closed";
  createdAt?: Date;
  updatedAt?: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    interest: { type: String, required: true },
    budget: { type: String, required: true },
    message: { type: String, required: true, trim: true },
    optInTimestamp: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export const Lead = models.Lead || model<ILead>("Lead", LeadSchema);
