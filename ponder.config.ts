import {createConfig, loadBalance, rateLimit} from "@ponder/core";
import {getAddress, http, webSocket} from "viem";

import { abi } from "./abis/abi";
//import { baseSepolia } from "viem/chains";

export default createConfig({
  networks: {
    baseSepolia: {
      chainId: 84532,
      transport: loadBalance([
        //http("https://cloudflare-eth.com"),
        //http("https://eth-mainnet.public.blastapi.io"),
        //webSocket("wss://ethereum-rpc.publicnode.com"),
        rateLimit(http(process.env.PONDER_RPC_URL_84532), { requestsPerSecond: 49 }),
      ]),
      //transport: rateLimit(http("https://rpc.ankr.com/eth"), { requestsPerSecond: 5 }),//http(process.env.PONDER_RPC_URL_1)

    },
  },
  contracts: {
    LandContract: {
      network: "baseSepolia",
      abi: abi,
      address: getAddress(process.env.PONDER_LAND_CONTRACT_ADDRESS_84532 as string),
      startBlock: 15709970,
    },
  },
});
