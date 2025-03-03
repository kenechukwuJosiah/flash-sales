import { Schema, model, Document } from 'mongoose';

export interface IPurchase extends Document {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  purchaseTime: Date;
}

const purchaseSchema = new Schema<IPurchase>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  purchaseTime: { type: Date, default: Date.now },
});

export const Purchase = model<IPurchase>('Purchase', purchaseSchema);