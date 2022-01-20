/**
 * Context for every request, which includes a user object for logged in users.
 */
import { User } from "./models/user";

export interface Context {
  user: User;
}
