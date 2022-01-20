/**
 * Dumb hack required to make express play well with async controller functions.
 */
import { RequestHandler } from "express";

export const expressAsyncHandler: (handler: RequestHandler) => RequestHandler =
  (fn) =>
    function asyncUtilWrap(...args: any) {
      // @ts-ignore
      const fnReturn = fn(...args);
      const next = args[args.length - 1];
      return Promise.resolve(fnReturn).catch(next);
    };
