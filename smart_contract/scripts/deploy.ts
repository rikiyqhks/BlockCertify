import { ethers } from "hardhat";

const deploy = async () => {
  // コントラクト`EducationalUser`をデプロイ
  const EducationalUser = await ethers.deployContract("EducationalUser");
  await EducationalUser.waitForDeployment();

  // デプロイされたアドレスを出力
  // -> フロントエンドで接続するための情報として必要
  console.log("Educationaluser deployed to:", EducationalUser.target);
}

const runDeploy = async () => {
	try {
		await deploy();
		process.exit(0);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
}

runDeploy();