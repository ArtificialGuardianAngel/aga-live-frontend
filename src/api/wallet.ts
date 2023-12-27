import client from "./client";

type MnemonicResponse = {
    mnemonic: string;
};
const walletApi = {
    get: () => client.get("wallet"),
    createWallet: (password: string, email?: string) =>
        client.post<MnemonicResponse>("wallet/connect", {
            email,
            passowrd: password,
        }),
    connectWallet: (password: string) =>
        client.post<MnemonicResponse>("wallet/connect", {
            password,
        }),
};
export default walletApi;
