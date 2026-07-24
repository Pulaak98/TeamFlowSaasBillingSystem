import { Router } from "express";

import * as invoiceController from "../controllers/invoice.controller.js";

const router = Router();

router.post(
  "/:organizationId/invoices/generate",
  invoiceController.generateInvoice,
);

export default router;