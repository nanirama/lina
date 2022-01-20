/**
 * Middleware used to authenticate JSON web tokens (https://jwt.io/)
 * Easily extended to support multiple types of tokens, depending on the use case.
 */
import { Request, Response } from "express";
import { AccountType, User } from "../models/user";
import { verifyAdminToken, verifyToken } from "../logic/auth";
import { ForbiddenError } from "../utils/errors";

// TOOD(sbb): Add typing here so controllers aren't so bad
const authenticateJWTWithRoles = (accountTypes: Array<AccountType>) => {
  return async (req: Request, res: Response, next: () => unknown) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      await verifyToken(token)
        .then((user) => {
          if (accountTypes.indexOf(user.accountType) === -1) {
            throw new ForbiddenError("Invalid token (account type)");
          }
          req.context = { user };
          next();
        })
        .catch(() => {
          res.sendStatus(403);
        });
    } else {
      res.sendStatus(401);
    }
  };
};

export const authenticateRetool = async (
  req: Request,
  res: Response,
  next: () => unknown
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      await verifyAdminToken(token, "retool");
    } catch (e: any) {
      return res.sendStatus(e.getCode());
    }
    next();
  } else {
    res.sendStatus(401);
  }
};

export const getUserFromRequest = async (
  req: Request
): Promise<User | undefined> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return;
  }
  const token = authHeader.split(" ")[1];
  const user = await verifyToken(token).catch((e) => undefined);
  return user;
};

export const authenticatePatient = authenticateJWTWithRoles([
  AccountType.PATIENT,
]);
export const authenticateProvider = authenticateJWTWithRoles([
  AccountType.PROVIDER,
]);
export const authenticateSuperuser = authenticateJWTWithRoles([
  AccountType.SUPERUSER,
]);

export const authenticateUser = authenticateJWTWithRoles([
  AccountType.ADMIN,
  AccountType.PATIENT,
  AccountType.PROVIDER,
]);
