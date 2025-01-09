import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";

export default class BuildAI {
  constructor(connection, wallet, programId) {
    this.connection = connection;
    this.provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });
    this.program = new Program(idl, programId, this.provider);
  }

  async initialize() {
    const keypair = Keypair.generate();
    const tx = await this.program.rpc.initialize({
      accounts: {
        state: keypair.publicKey,
        user: this.provider.wallet.publicKey,
        systemProgram: PublicKey.default,
      },
    });
    console.log("Transaction:", tx);
  }

  async submitTask(input) {
    const tx = await this.program.rpc.submitTask(input, {
      accounts: {
        state: this.provider.wallet.publicKey,
        user: this.provider.wallet.publicKey,
      },
    });
    console.log("Task Submitted:", tx);
  }

  async completeTask(id, output) {
    const tx = await this.program.rpc.completeTask(id, output, {
      accounts: {
        state: this.provider.wallet.publicKey,
        user: this.provider.wallet.publicKey,
      },
    });
    console.log("Task Completed:", tx);
  }
}
3. Frontend Example
frontend/src/App.js

javascript
Copy code
import React, { useState } from "react";
import BuildAI from "@buildai/sdk";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const App = () => {
  const [taskInput, setTaskInput] = useState("");
  const connection = new Connection(clusterApiUrl(WalletAdapterNetwork.Devnet));
  const wallet = /* Wallet integration setup */;
  const programId = "BuildAIxxxxxxx...";
  const buildAI = new BuildAI(connection, wallet, programId);

  const handleSubmit = async () => {
    await buildAI.submitTask(taskInput);
    alert("Task submitted!");
  };

  return (
    <div>
      <h1>BuildAI Task Submission</h1>
      <input
        type="text"
        placeholder="Task input"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Task</button>
    </div>
  );
};

export default App;
4. Tests
tests/buildai.js

javascript
Copy code
const assert = require("assert");
const { Connection, clusterApiUrl, Keypair } = require("@solana/web3.js");
const BuildAI = require("../sdk");

describe("BuildAI Tests", () => {
  const connection = new Connection(clusterApiUrl("devnet"));
  const wallet = Keypair.generate();
  const programId = "BuildAIxxxxxxx...";
  const buildAI = new BuildAI(connection, wallet, programId);

  it("should initialize the program", async () => {
    await buildAI.initialize();
    console.log("Program initialized successfully.");
  });

  it("should submit a task", async () => {
    const input = "Analyze this text.";
    await buildAI.submitTask(input);
    console.log("Task submitted successfully.");
  });

  it("should complete a task", async () => {
    const taskId = 0;
    const output = "Positive sentiment detected.";
    await buildAI.completeTask(taskId, output);
    console.log("Task completed successfully.");
  });
});
