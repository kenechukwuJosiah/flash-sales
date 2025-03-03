import mongoose from "mongoose";
import { Product, Purchase } from "../models";
import { Request, Response } from 'express';


export const purchaseProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const product = await Product.findById(productId).session(session);
      
      if (!product || product.availableUnits <= 0) {
        throw new Error('Product out of stock');
      }

      product.availableUnits -= 1;
      await product.save({ session });

      const purchase = new Purchase({ userId, productId });
      await purchase.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ success: true, message: 'Purchase successful' });
    } catch (err: any) {
      await session.abortTransaction();
      session.endSession();

      res.status(400).json({ success: false, message: err.message });
    }
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
}


export const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.productId);
  res.status(200).json({ availableUnits: product?.availableUnits });
}