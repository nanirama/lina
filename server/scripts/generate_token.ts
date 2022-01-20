/**
 * Script used to generate user/provider auth tokens for debugging,
 * as well as admin tokens for retool
 */
import { signAdminToken, signToken } from "@healthgent/server/src/logic/auth";

const tokenType = process.argv[process.argv.length - 1];
if (tokenType === "--admin") {
  const token = signAdminToken("retool", 86400 * 180);
  console.log(token);
  process.exit(0);
}
if (process.argv.length < 4) {
  console.error("Please provide a user ID");
  process.exit(-1);
}
const userId = process.argv[3];
const signedToken = signToken(parseInt(userId));
if (tokenType === "--provider") {
  console.log(
    `https://healthgent-provider.vercel.app/login?token=${signedToken}`
  );
} else if (tokenType == "--patient") {
  console.log(`https://joinhealthgent.com/login?token=${signedToken}`);
} else {
  console.log(signedToken);
}
