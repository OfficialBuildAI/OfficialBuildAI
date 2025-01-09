import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

export const walletAdapter = new PhantomWalletAdapter({
  network: WalletAdapterNetwork.Devnet,
});
