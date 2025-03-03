import mongoose from "mongoose";
import { Product, Purchase } from "../models";
import { Request, Response } from 'express';
import { purchaseValidator } from "../validators";

export const purchaseProduct = async (req: Request, res: Response) => {

  try {
    const { error } = purchaseValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

  const { productId, quantity } = req.body;
  const userId = req.user._id;

    const product = await Product.findOne(
      {
        _id: productId,
      }
    ).select('availableUnits saleEndTime');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.saleEndTime && product.saleEndTime < new Date()) {
      return res.status(400).json({ success: false, message: 'Flash sale has ended' });
    }

    if (product.availableUnits < quantity) {
      return res.status(400).json({ success: false, message: 'Quantity exceeds available stock' });
    }

    await Product.findOneAndUpdate(
      { _id: productId },
      { $inc: { availableUnits: -quantity } }
    );

    const purchase = new Purchase({
      userId,
      productId,
      quantity,
    });
    await purchase.save();

    res.status(200).json({ success: true, message: 'Purchase successful' });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};



export const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.status(200).json({ success: true, data: {
    name: product?.name,
    totalUnits: product?.totalUnits,
    availableUnits: product?.availableUnits,
    saleStartTime: product?.saleStartTime,
    saleEndTime: product?.saleEndTime,
  },  });
}