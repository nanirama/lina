/**
 * Operations used for treat eprescribe
 */
import { Request, Response } from "express";
import { getJwt } from "../../lib/treat";
import { providerTreatLogin } from "../../logic/oauth";
import { Provider } from "../../models/provider";
import { NotFoundError } from "../../utils/errors";

export const treatLogin = async (req: Request, res: Response) => {
  const { authToken } = await providerTreatLogin(
    req.context.user?.provider as Provider,
    req.body.authCode
  );
  res.json({ authToken });
};

export const getToken = async (req: Request, res: Response) => {
  const refreshToken = req.context.user.provider?.treatRefreshToken;
  if (!refreshToken) {
    throw new NotFoundError("No Treat login found");
  }
  const { authToken } = await getJwt(refreshToken);
  res.json({ authToken });
};
