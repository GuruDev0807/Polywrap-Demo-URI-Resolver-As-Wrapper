import { buildAndDeployApi, initTestEnvironment } from "@web3api/test-env-js";
import path from "path";
import { getWeb3ApiClient } from "..";

export const ipfsUriResolver = async (
  chain: string,
  env: "local" | "prod",
  ipfsCid?: string
) => {
  let ipfsProvider: string | undefined = undefined;
  let uri = `w3://ipfs/${ipfsCid}`;

  if (env == "local") {
    const { ensAddress, ipfs } = await initTestEnvironment();
    ipfsProvider = ipfs;

    const apiPath: string = path.join(
      path.resolve(__dirname),
      "..",
      "..",
      ".."
    );

    const { ipfsCid } = await buildAndDeployApi(
      apiPath,
      ipfsProvider,
      ensAddress
    );

    uri = `w3://ipfs/${ipfsCid}`;
  }

  console.log("URI: ", uri);

  const client = await getWeb3ApiClient(chain, env, ipfsProvider);

  try {
    const result = await client.query({
      uri,
      query: `
          query {
            tryUriResolver(
            )
          }`,
      variables: {

      },
    });

    if (result.errors) throw result.errors;

    let canExecResult: any;
    let canExec: boolean;
    let execData: string;

    if (result.data) {
      canExecResult = result?.data.checker as unknown as {
        canExec: boolean;
        execPayload: string;
      };
    }
    if (canExecResult) {
      canExec = canExecResult.canExec;
      execData = canExecResult.execPayload;
      console.log(
        `${"\x1b[32m"}canExec${"\x1b[0m"}: ${canExec} \n${"\x1b[32m"}execData${"\x1b[0m"}: ${execData}`
      );
    }
  } catch (error) {
    console.log(error);
  }
};
