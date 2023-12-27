"use client";
// import { AppProvider } from "@/context/AppContext";
import { CosmosProvider } from "@nuahorg/aga";
import { PropsWithChildren } from "react";
export const WrappedCosmosProvider = ({ children }: PropsWithChildren) => {
    return (
        <CosmosProvider
            rpc="https://nc-n1-me.aga.live:2096/"
            apiUrl="https://nc-n1-me.aga.live:2087/"
        >
            {children}
        </CosmosProvider>
    );
};
