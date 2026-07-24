import { Router } from "express";

import * as memberController from "../controllers/member.controller.js";
import { createMemberSchema } from "../validation/member.validation.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.get("/:organizationId/members", memberController.getMembers);

router.post(
  "/:organizationId/members",
  validate(createMemberSchema),
  memberController.createMember,
);

export default router;
