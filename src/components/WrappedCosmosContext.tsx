"use client";
// import { AppProvider } from "@/context/AppContext";
import { CosmosProvider } from "@nuahorg/aga";
import { PropsWithChildren } from "react";
export const WrappedCosmosProvider = ({ children }: PropsWithChildren) => {
    return (
        <CosmosProvider
            rpc={
                process.env.NEXT_PUBLIC_NODE_RPC_URL || "http://localhost:26657"
            }
            apiUrl={
                process.env.NEXT_PUBLIC_NODE_API_URL || "http://localhost:1317"
            }
        >
            {children}
        </CosmosProvider>
    );
};
