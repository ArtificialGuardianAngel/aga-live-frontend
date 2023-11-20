"use client";
import { CosmosProvider } from "@nuahorg/aga";
import { PropsWithChildren } from "react";

export const WrappedCosmosProvider = ({ children }: PropsWithChildren) => {
    return (
        <CosmosProvider rpc="http://10.0.1.12:26657/">
            {children}
        </CosmosProvider>
    );
};
