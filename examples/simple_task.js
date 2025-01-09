import BuildAI from "@buildai/sdk";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const wallet = Keypair.generate();
const programId = "BuildAIxxxxxxx...";
const buildAI = new BuildAI(connection, wallet, programId);

(async () => {
  console.log("Initializing BuildAI...");
  await buildAI.initialize();

  console.log("Submitting a task...");
  const input = "Translate text to French.";
  await buildAI.submitTask(input);

  console.log("Completing the task...");
  const taskId = 0;
  const output = "Traduire le texte en français.";
  await buildAI.completeTask(taskId, output);

  console.log("Task completed successfully!");
})();
