import { Purchase } from "../models";
import { paginationUtil } from "../utils";
import { Request, Response } from "express";

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { offset, limit, sortFields } = paginationUtil.prePaginate({
      page: req.query.page as unknown as number,
      pageSize: req.query.pageSize as unknown as number,
      sort: req.query.sort as unknown as string
    });

    const leaderboard = await Purchase.find()
      .sort(sortFields)
      .skip(offset)
      .limit(limit)
      .populate('productId', 'name')
      .exec();

    const total = await Purchase.countDocuments();

    const page = Number(req.query.page);

    const result = paginationUtil.postPaginate(total, leaderboard, page, limit);

    res.status(200).json({
      success: true,
      message: 'Successful',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
}