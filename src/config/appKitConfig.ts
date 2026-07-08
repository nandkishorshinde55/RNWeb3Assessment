import "@walletconnect/react-native-compat";
import "react-native-get-random-values";

import { reownStorage } from "@/storage/reownStorage";
import {
  createAppKit,
  type AppKitNetwork,
} from "@reown/appkit-react-native";
import { EthersAdapter } from "@reown/appkit-ethers-react-native";

const projectId ="5de4cd1a6388d6dcf7524027e151da84";

const metadata = {
  name: "RN Web3 Assessment",
  description: "React Native Web3 Technical Assessment",
  url: "https://github.com/nandkishorshinde55/RNWeb3Assessment",
  icons: ["https://avatars.githubusercontent.com/u/1?v=4"],
  redirect: {
    native: "rnweb3assessment://",
  },
};

export const sepoliaNetwork: AppKitNetwork = {
  id: 11155111,
  name: "Ethereum Sepolia",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://ethereum-sepolia-rpc.publicnode.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Sepolia Etherscan",
      url: "https://sepolia.etherscan.io",
    },
  },
  chainNamespace: "eip155",
  caipNetworkId: "eip155:11155111",
};

const ethersAdapter = new EthersAdapter();

export const appKit = createAppKit({
  projectId,
  metadata,
  storage: reownStorage,
  adapters: [ethersAdapter],
  networks: [sepoliaNetwork],
  defaultNetwork: sepoliaNetwork,
});