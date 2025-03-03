import { Schema, model, Document } from 'mongoose';

export interface IPurchase extends Document {
  userId: string;
  productId: Schema.Types.ObjectId;
  purchaseTime: Date;
}

const purchaseSchema = new Schema<IPurchase>({
  userId: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  purchaseTime: { type: Date, default: Date.now },
});

export default model<IPurchase>('Purchase', purchaseSchema);