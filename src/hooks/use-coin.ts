import { useBalances } from "@nuahorg/aga";

type CoinDenoms = "nuah" | "aga" | "nuahp";

export const useCoin = (denom: CoinDenoms) => {
    const { balances } = useBalances();

    const coin = balances.find((balance) => balance.denom === denom);
    return coin;
};
