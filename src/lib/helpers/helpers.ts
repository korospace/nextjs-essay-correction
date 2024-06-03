// nextjs
import { NextResponse } from "next/server";
// external lib
import CryptoJS from "crypto-js";
// types
import { ZodError } from "zod";

export const ResponseFormating = {
  json: (message: string, httpCode: number = 200, data: any = false) => {
    let payload: any = {
      status: httpCode >= 300 ? false : true,
      message,
    };

    if (data !== false) {
      payload.data = data;
    }

    return NextResponse.json(payload, { status: httpCode });
  },
  zodErrors: (errors: ZodError) => {
    return errors.issues.reduce((acc: any, issue) => {
      const key = issue.path[0];
      acc[key] = issue.message;
      return acc;
    }, {});
  },
};

export const Hash = {
  encrypt: (plainText: string): string => {
    const hash = CryptoJS.AES.encrypt(
      plainText,
      process.env.APP_KEY ?? ""
    ).toString();
    return hash;
  },
  decrypt: (hashText: string): string | null => {
    try {
      const bytes = CryptoJS.AES.decrypt(hashText, process.env.APP_KEY ?? "");
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedText ? decryptedText : null;
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
  },
  compare: (plainText: string, hashText: string): boolean => {
    try {
      const bytes = CryptoJS.AES.decrypt(hashText, process.env.APP_KEY ?? "");
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      return plainText === decryptedText;
    } catch (error) {
      console.error("Comparison decryption error:", error);
      return false;
    }
  },
};
