import { ethers } from "hardhat";

const usdcAddress = "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b";

export async function interacting() {
  const staking = await ethers.getContract("StakingDao");
  //   const usdc = await (
  //     await ethers.getContractFactory("IERC20")
  //   ).attach(usdcAddress);

  const usdc = await ethers.getContractAt("IERC20", usdcAddress);

  console.log("Approving token");

  const approveTx = await usdc.approve(
    staking.address,
    ethers.utils.parseEther("11")
  );
  await approveTx.wait(1);

  console.log("Depositing Tokens");

  const depositTx = await staking.depositTokensToContract(10000000);
  await depositTx.wait(1);

  console.log("Staking Tokens");

  const stakeTx = await staking.stakeTokens(10000000);
  await stakeTx.wait(1);

  console.log("Done");

  const withdrawTx = await staking.withdrawTokens(1000000);
  await withdrawTx.wait(1);

  console.log("Tokens withdrawn");
}

interacting()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
