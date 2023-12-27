"use client";
import { AppProvider } from "@/context/AppContext";
import { CosmosProvider } from "@nuahorg/aga";
import { PropsWithChildren } from "react";
export const WrappedCosmosProvider = ({ children }: PropsWithChildren) => {
    return (
        <CosmosProvider
            rpc="http://34.18.36.107:26657"
            apiUrl="http://34.18.36.107:1316"
        >
            {children}
        </CosmosProvider>
    );
};
