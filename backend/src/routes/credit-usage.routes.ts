import { Router } from "express";

import * as creditUsageController from "../controllers/credit-usage.controller.js";
import { validate } from "../middlewares/validate.js";
import { createCreditUsageSchema } from "../validation/credit-usage.validation.js";

const router = Router();

router.post(
  "/:organizationId/credit-usage",
  validate(createCreditUsageSchema),
  creditUsageController.createCreditUsage,
);

export default router;