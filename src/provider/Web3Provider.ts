import Web3 from "web3";

export default class Web3Provider {

    provideWeb3() {
        const httpProvider = "https://mainnet.infura.io/v3/" + process.env.INFURA_PROJECT_ID
        const provider = new Web3.providers.HttpProvider(httpProvider)
        return new Web3(provider);
    }
}

