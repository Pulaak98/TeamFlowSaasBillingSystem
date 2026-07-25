import { Router } from "express";

import * as memberController from "../controllers/member.controller.js";
import { createMemberSchema, updateMemberStatusSchema } from "../validation/member.validation.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.get("/:organizationId/members", memberController.getMembers);

router.post(
  "/:organizationId/members",
  validate(createMemberSchema),
  memberController.createMember,
);

router.patch(
  "/:organizationId/members/:memberId",
  validate(updateMemberStatusSchema),
  memberController.updateMemberStatus,
);

export default router;
