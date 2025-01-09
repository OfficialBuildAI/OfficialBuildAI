import { PublicKey } from "@solana/web3.js";

/**
 * Converts a string to a PublicKey object
 * @param {string} key
 * @returns {PublicKey}
 */
export const toPublicKey = (key) => {
  try {
    return new PublicKey(key);
  } catch (error) {
    throw new Error("Invalid PublicKey format");
  }
};

/**
 * Logs transaction details
 * @param {string} txId
 * @param {object} connection
 */
export const logTransaction = async (txId, connection) => {
  const txDetails = await connection.getTransaction(txId, { commitment: "confirmed" });
  console.log("Transaction Details:", txDetails);
};
