import { Request, Response, NextFunction } from "express";

import * as creditUsageService from "../services/credit-usage.service.js";

export async function createCreditUsage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organizationId = Number(req.params.organizationId);

    const creditUsage = await creditUsageService.addCreditUsage(
      organizationId,
      req.body,
    );

    res.status(201).json(creditUsage);
  } catch (error) {
    next(error);
  }
}