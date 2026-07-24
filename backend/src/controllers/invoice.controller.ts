import { Request, Response, NextFunction } from "express";

import * as invoiceService from "../services/invoice.service.js";

export async function generateInvoice(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organizationId = Number(
      req.params.organizationId,
    );

    const invoice =
      await invoiceService.generateInvoice(
        organizationId,
      );

    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
}