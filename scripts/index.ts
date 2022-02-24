import { encryptWithMockPublicKey, ipfsUriResolver } from "./utils";
import { ethers } from "ethers";

const main = async () => {
  const mockApi = "https://api.com";
  const encrypted = await encryptWithMockPublicKey(mockApi);

  const userConfig = {
    counterAddress: "0xaBB322c65e9E0F8c7D4f28F3a5Deb8084aF6d2F4",
    encodedApi: encrypted,
  };
  const gasPrice = ethers.utils.parseUnits("100", "gwei");

  const cid = "QmThZvZAdHfsu2PsSFZmx8p3AUp4J1YrhnCjRiHNnqEL7z";

  ipfsUriResolver("goerli", "local", userConfig, gasPrice, cid);
};

main();
