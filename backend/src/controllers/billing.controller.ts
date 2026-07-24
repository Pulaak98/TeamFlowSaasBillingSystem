import {
  Request,
  Response,
  NextFunction,
} from "express";

import * as billingService from "../services/billing.service.js";

export async function upcomingInvoice(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organizationId = Number(
      req.params.organizationId,
    );

    const invoice =
      await billingService.getUpcomingInvoice(
        organizationId,
      );

    res.json(invoice);
  } catch (error) {
    next(error);
  }
}

export async function getInvoices(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organizationId = Number(
      req.params.organizationId,
    );

    const invoices =
      await billingService.getInvoices(
        organizationId,
      );

    res.json(invoices);
  } catch (error) {
    next(error);
  }
}