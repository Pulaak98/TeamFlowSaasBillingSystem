import { Router } from "express";

import * as billingController from "../controllers/billing.controller.js";

const router = Router();

router.get(
  "/:organizationId/billing/upcoming-invoice",
  billingController.upcomingInvoice,
);

router.get(
  "/:organizationId/invoices",
  billingController.getInvoices,
);

export default router;