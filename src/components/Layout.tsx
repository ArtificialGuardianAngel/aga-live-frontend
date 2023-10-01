"use client"
import authApi from "@/api/auth";
import { getLocalInfo } from "@/utils/metadata";
import { PropsWithChildren, useEffect } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
    useEffect(() => {
        getLocalInfo()
            .then(authApi.connect)
            .then((r) => {
                console.log(r.data);
            })
            .catch((e) => console.error(e));
    }, []);
    return children;
};
