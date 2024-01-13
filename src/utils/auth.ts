// auth.ts
import pbkdf2 from "pbkdf2";
import { env } from "~/env";

const secretKey = env.NEXT_PUBLIC_REVERY_SECRET;
const publicKey = env.NEXT_PUBLIC_REVERY_PUBLIC;

export const getAuthenticationHeader = (json = false) => {
  const time = Math.round(new Date().getTime() / 1000);

  const derivedKey = pbkdf2.pbkdf2Sync(
    secretKey,
    time.toString(),
    128,
    32,
    "sha256",
  );

  const oneTimeCode = derivedKey.toString("hex");

  if (json) {
    return {
      public_key: publicKey,
      one_time_code: oneTimeCode,
      timestamp: time,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  } else {
    return {
      public_key: publicKey,
      one_time_code: oneTimeCode,
      timestamp: time,
    };
  }
};
