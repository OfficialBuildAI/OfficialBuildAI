import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "buildai.log");

export const log = (message) => {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, formattedMessage);
};

export const logTransaction = (txId) => {
  log(`Transaction submitted: ${txId}`);
};
