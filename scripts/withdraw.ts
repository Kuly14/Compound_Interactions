import { ethers, getNamedAccounts } from "hardhat";

const usdcAddress = "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b";

export async function withdrawTokens() {
  const { deployer } = await getNamedAccounts();
  const usdc = await ethers.getContractAt("IERC20", usdcAddress);
  const staking = await ethers.getContract("StakingDao");

  const balance = await usdc.balanceOf(staking.address);
  console.log(balance.toString());

  await staking.withdraw(10000000, deployer);

  console.log("Balance withdrawn");
}

withdrawTokens()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
