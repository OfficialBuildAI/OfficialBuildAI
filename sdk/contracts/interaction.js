import { PublicKey, Keypair } from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";
import idl from "./buildai_idl.json";

const programId = new PublicKey("BuildAIxxxxxxx...");

export const initializeContract = async (connection, wallet) => {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const program = new Program(idl, programId, provider);

  const stateAccount = Keypair.generate();
  const tx = await program.rpc.initialize({
    accounts: {
      state: stateAccount.publicKey,
      user: wallet.publicKey,
      systemProgram: PublicKey.default,
    },
    signers: [stateAccount],
  });

  console.log(`State account initialized: ${stateAccount.publicKey}`);
  return { tx, stateAccount };
};
