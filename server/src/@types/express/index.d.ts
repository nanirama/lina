/**
 * Typescript type definition for context used inside
 * an Express request
 */
export { };
import { Context } from "../../context";

declare global {
  namespace Express {
    export interface Request {
      context: Context;
    }
  }
}
