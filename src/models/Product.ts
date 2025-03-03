import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  totalUnits: number;
  availableUnits: number;
  saleStartTime: Date;
  saleEndTime?: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  totalUnits: { type: Number, default: 200 },
  availableUnits: { type: Number, default: 200 },
  saleStartTime: { type: Date, required: true },
  saleEndTime: { type: Date },
});

export const Product = model<IProduct>('Product', productSchema);