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

export const DateFormating = {
  isValidDateFormat: (value: string) => {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    return regex.test(value);
  },
  getCurrentUnixTimestamp: () => {
    return Math.floor(Date.now() / 1000);
  },
  toUnixTimeStamp: (dateString: string) => {
    const date = new Date(dateString);
    return Math.floor(date.getTime() / 1000);
  },
  changeDateFormat: (originalDate: string) => {
    // Split the original date into parts
    const parts = originalDate.split(/[-\/]/);
    // Extract day, month, and year from the original date
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}-${month}-${year}`;
  },
  extractDateTime: (datetime: string) => {
    const dateObj = new Date(datetime);

    // Extract date components
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(dateObj.getDate()).padStart(2, "0");

    // Extract time components
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");

    // Construct date and time strings
    const date = `${year}-${month}-${day}`;
    const time = `${hours}:${minutes}`;

    // Return date and time object
    return { date, time };
  },
};

export const HashText = {
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

export const pathCheck = (path: string, pathList: string[]): boolean => {
  return pathList.some((p) => {
    const regex = new RegExp(`^${p}(\/\\d+)?$`);

    return regex.test(path);
  });
};
