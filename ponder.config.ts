import {createConfig, loadBalance, rateLimit} from "@ponder/core";
import {getAddress, http, webSocket} from "viem";

import { abi } from "./abis/abi";
import {base} from "viem/chains";
import { baseSepolia } from "viem/chains";

export default createConfig({
  networks: {
    base: {
      //maxRequestsPerSecond: 1000,

      chainId: 84532,
      transport:
          loadBalance([
        //http("https://cloudflare-eth.com"),
        //http("https://eth-mainnet.public.blastapi.io"),
        //
        //

            //webSocket(process.env.PONDER_RPC_URL_84532_WSS),
        //webSocket(process.env.PONDER_RPC_URL_84532_WSS_2),
        //rateLimit(http(process.env.PONDER_RPC_URL_84532), { requestsPerSecond: 49 }),
            rateLimit(http(process.env.PONDER_RPC_URL_84532), { requestsPerSecond: 49 }),
            //rateLimit(http(process.env.PONDER_RPC_URL_8453_2), { requestsPerSecond: 49 }),
            //http(process.env.PONDER_RPC_URL_84532),
            //http(process.env.PONDER_RPC_URL_84532_2),

      ]),
      //transport: rateLimit(http("https://rpc.ankr.com/eth"), { requestsPerSecond: 5 }),//http(process.env.PONDER_RPC_URL_1)

    },
  },
  contracts: {
    LandContract: {
      network: "baseSepolia",
      abi: abi,
      address: getAddress(process.env.PONDER_LAND_CONTRACT_ADDRESS_84532 as string),
      startBlock: 20549550,
    },
  },
});
