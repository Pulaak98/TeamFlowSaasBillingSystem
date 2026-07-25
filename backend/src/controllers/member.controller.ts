import { Request, Response, NextFunction } from "express";

import * as memberService from "../services/member.service.js";

export async function getMembers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const organizationId = Number(req.params.organizationId);

    const members =
      await memberService.getMembers(organizationId);

    res.json(members);
  } catch (error) {
    next(error);
  }
}

export async function createMember(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const organizationId = Number(req.params.organizationId);

    const member =
      await memberService.addMember(
        organizationId,
        req.body
      );

    res.status(201).json(member);
  } catch (error) {
    next(error);
  }
}

export async function updateMemberStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organizationId = Number(req.params.organizationId);
    const memberId = Number(req.params.memberId);

    const member = await memberService.updateMemberStatus(
      organizationId,
      memberId,
      req.body.status,
    );

    res.json({
      success: true,
      data: member,
    });
  } catch (error) {
    next(error);
  }
}