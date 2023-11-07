import ExchangeMoneyForm from "@/components/wallet/ExchangeMoneyForm";
import GetMoneyForm from "@/components/wallet/GetMoneyForm";
import LoginsTable from "@/components/wallet/LoginsTable";
import MoneyRequestsReceivedTable from "@/components/wallet/MoneyRequestsReceivedTable";
import MoneyRequestsSentTable from "@/components/wallet/MoneyRequestsSentTable";
import RequestMoneyForm from "@/components/wallet/RequestMoneyForm";
import SendMoneyForm from "@/components/wallet/SendMoneyForm";
import TransactionsTable from "@/components/wallet/TransactionsTable";
import WalletTable from "@/components/wallet/WalletTable";
import { ReactNode } from "react";

export enum MenuItems {
    WALLET,
    WALLET_ALL,
    WALLET_STABLE,
    WALLET_NATIVE,
    EXCHANGE_MONEY,
    SEND_MONEY,
    REQUEST_MONEY,
    GET_MONEY,
    TRANSACTIONS,
    MONEY_REQUESTS,
    MONEY_REQUESTS_SENT,
    MONEY_REQUESTS_RECEIVED,
    LOGINS,
}

export interface IWalletTab {
    title: string;
    icon: string;
    element: ReactNode;
}

export const WalletTabs: {
    [key in MenuItems]?: IWalletTab;
} = {
    [MenuItems.WALLET_ALL]: {
        title: "Wallet",
        icon: "wallet.svg",
        element: <WalletTable type="ALL" />,
    },
    [MenuItems.WALLET_NATIVE]: {
        title: "Wallet",
        icon: "wallet.svg",
        element: <WalletTable type="NATIVE" />,
    },
    [MenuItems.WALLET_STABLE]: {
        title: "Wallet",
        icon: "wallet.svg",
        element: <WalletTable type="STABLE" />,
    },
    [MenuItems.SEND_MONEY]: {
        title: "Send money",
        icon: "send-money.svg",
        element: <SendMoneyForm />,
    },
    [MenuItems.REQUEST_MONEY]: {
        title: "Request money",
        icon: "request-money.svg",
        element: <RequestMoneyForm />,
    },
    [MenuItems.GET_MONEY]: {
        title: "Get money",
        icon: "get-money.svg",
        element: <GetMoneyForm />,
    },
    [MenuItems.EXCHANGE_MONEY]: {
        title: "Exchange money",
        icon: "exchange-money.svg",
        element: <ExchangeMoneyForm />,
    },
    [MenuItems.TRANSACTIONS]: {
        title: "Transactions",
        icon: "transactions.svg",
        element: <TransactionsTable />,
    },
    [MenuItems.MONEY_REQUESTS_SENT]: {
        title: "Money requests",
        icon: "money-requests.svg",
        element: <MoneyRequestsSentTable />,
    },
    [MenuItems.MONEY_REQUESTS_RECEIVED]: {
        title: "Money requests",
        icon: "money-requests.svg",
        element: <MoneyRequestsReceivedTable />,
    },
    [MenuItems.LOGINS]: {
        title: "Logins",
        icon: "logins.svg",
        element: <LoginsTable />,
    },
};
