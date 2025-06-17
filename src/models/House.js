import { Schema } from "mongoose";

export const HouseSchema = new Schema(
  {
    bedrooms: { type: Number, max: 30, min: 0, required: true },
    bathrooms: { type: Number, max: 25, min: 0, required: true },
    levels: { type: Number, max: 4, min: 1, required: true },
    price: { type: Number, max: 10000000, min: 0, required: true },
    imgUrl: { type: String, minLength: 0, maxLength: 500, required: true },
    year: { type: Number, min: 1000, max: 2024, required: true },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }
  }
)

HouseSchema.virtual('creator',
  {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
  }
)