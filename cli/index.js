#!/usr/bin/env node

import BuildAI from "../sdk/index.js";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Wallet } from "./wallet.js"; // Replace with your wallet setup

const connection = new Connection(clusterApiUrl("devnet"));
const wallet = new Wallet(); // Replace with your wallet configuration
const programId = "BuildAIxxxxxxx...";
const buildAI = new BuildAI(connection, wallet, programId);

const args = process.argv.slice(2);

(async () => {
  switch (args[0]) {
    case "initialize":
      await buildAI.initialize();
      console.log("Program initialized successfully.");
      break;

    case "submit":
      if (!args[1]) {
        console.error("Usage: submit <input>");
        return;
      }
      await buildAI.submitTask(args[1]);
      console.log("Task submitted successfully.");
      break;

    case "complete":
      if (!args[1] || !args[2]) {
        console.error("Usage: complete <taskId> <output>");
        return;
      }
      await buildAI.completeTask(Number(args[1]), args[2]);
      console.log("Task completed successfully.");
      break;

    default:
      console.error("Unknown command. Use: initialize, submit, complete");
  }
})();
