"use client";
import Button from "@/app/wishes/components/Button";
import { Input } from "..";
import { useBalances, useCosmos, usePreparedTransaction } from "@nuahorg/aga";
import { useEffect, useMemo, useState } from "react";
import { MsgSetNameEncodeObject } from "@nuahorg/aga/src/stargate/modules/nameservices";
import { useNameService } from "@/hooks/use-nameservice";
import { useAlert } from "@/hooks/use-alert";

export const ChangeNameModal = () => {
    const { queryClient, currentAccount, client } = useCosmos();
    const { toggle } = useAlert();
    const { name: myName } = useNameService(currentAccount?.address);
    const { balances } = useBalances();

    const [name, setName] = useState("");
    const [r, sR] = useState(false);

    const { executeSync, status, message } =
        usePreparedTransaction<MsgSetNameEncodeObject>({
            fee: {
                amount: "1",
                denom: "nuahp",
            },
        });

    const q = useMemo(() => queryClient, [queryClient]);

    const handleSetName = async () => {
        try {
            if (!client || !currentAccount?.address) return;
            const senderAddr = currentAccount.address;
            const msg: MsgSetNameEncodeObject = {
                typeUrl: "/nuah.nameservice.MsgSetName",
                value: {
                    name,
                    value: senderAddr,
                    creator: senderAddr,
                },
            };
            await executeSync([msg]);
            sR(true);
        } catch (error) {}
    };

    const isButtonDisabled = useMemo(() => {
        return (
            status === "pending" ||
            parseInt(balances.find((b) => b.denom === "nuahp")?.amount || "0") <
                1
        );
    }, [status, balances]);

    const reset = () => {
        sR(false);
    };

    const handleClose = () => {
        reset();
    };

    useEffect(() => {
        if (!q || !currentAccount?.address) return;
        q.nameservice
            .getNameByAddress(currentAccount?.address)
            .then((data) => setName(data.whoisByValue?.whoisIndex || ""))
            .catch((e) => console.error(e));
    }, [q, currentAccount?.address, r]);

    useEffect(() => {
        if (status === "failed") {
            toggle({ message: "Transaction failed", type: "error" });
        }
        if (status === "success") {
            toggle({
                message: "Successfuly set new name",
                type: "success",
            });
        }
    }, [status, message, toggle]);

    return (
        <>
            <h2 className="text-2xl text-accent-green mb-[40px]">
                {currentAccount?.address}
            </h2>
            <div
                className="mb-[40px] flex flex-col items-start gap-[20px]"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {!r ? (
                    <>
                        <div className="text-xl">
                            {myName ? "Change" : "Enter"} on-chain name
                        </div>
                        <Input
                            placeholder="nickname"
                            value={name}
                            onChange={(e) => setName(e)}
                        />
                        <Button
                            disabled={isButtonDisabled}
                            onClick={handleSetName}
                        >
                            Set name
                        </Button>
                    </>
                ) : (
                    <>
                        <p className="text-center">Your new on-chain name</p>
                        <h3 className="bold text-center text-xl">{name}</h3>
                        <Button onClick={handleClose}>ok!</Button>
                    </>
                )}
            </div>
        </>
    );
};
