const { execSync } = require("child_process");

const deployContract = () => {
  console.log("Deploying BuildAI smart contract...");
  try {
    const output = execSync("anchor deploy", { encoding: "utf-8" });
    console.log(output);
    console.log("Deployment successful!");
  } catch (error) {
    console.error("Deployment failed:", error.message);
  }
};

deployContract();
