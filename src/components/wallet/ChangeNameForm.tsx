import Button from "@/app/wishes/components/Button";
import { Input } from "..";
import { useBalances, useCosmos, usePreparedTransaction } from "@nuahorg/aga";
import { useEffect, useMemo, useState } from "react";
import {
    nameserviceTypes,
    MsgSetNameEncodeObject,
} from "@nuahorg/aga/src/stargate/modules/nameservices";
import {
    DeliverTxResponse,
    GasPrice,
    SigningStargateClient,
    StdFee,
    assertIsDeliverTxSuccess,
} from "@cosmjs/stargate";
import cn from "classnames";
import { useNameService } from "@/hooks/use-nameservice";

type ChangeNameFormProps = {
    open?: boolean;
    onClose?: () => void;
};
export const ChangeNameModal = ({ onClose, open }: ChangeNameFormProps) => {
    const { queryClient, currentAccount, client } = useCosmos();
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

    const error = useMemo(() => {
        if (
            parseInt(balances.find((b) => b.denom === "nuahp")?.amount || "0") <
            1
        ) {
            return "insufficient balance";
        }
    }, [balances]);

    const reset = () => {
        sR(false);
    };

    const handleClose = () => {
        reset();
        onClose?.();
    };

    useEffect(() => {
        if (!q || !currentAccount?.address) return;
        q.nameservice
            .getNameByAddress(currentAccount?.address)
            .then((data) => setName(data.whoisByValue?.whoisIndex || ""))
            .catch((e) => console.error(e));
    }, [q, currentAccount?.address, r]);

    return (
        <div
            className={cn(
                "fixed inset-0 flex items-center justify-center backdrop-blur-md",
                {
                    hidden: !open,
                    flex: open,
                },
            )}
            onClick={handleClose}
        >
            <div
                className="flex max-w-[296px] flex-col gap-[20px] rounded-[10px] border border-blue-5 bg-white/[3%] p-[40px_20px]"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {!r ? (
                    <>
                        <div className="text-center">
                            {myName ? "Change" : "Enter"} on-chain name
                        </div>
                        <Input
                            placeholder="nickname"
                            value={name}
                            onChange={(e) => setName(e)}
                        />
                        <div></div>
                        <Button
                            disabled={isButtonDisabled}
                            onClick={handleSetName}
                        >
                            Set name
                        </Button>
                        {status !== "pending" && (
                            <p
                                className={cn("break-words", {
                                    "text-red-500": status === "failed",
                                    "text-accent-green": status === "success",
                                })}
                            >
                                {message || error}
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <p className="text-center">Your new on-chain name</p>
                        <h3 className="bold text-center text-xl">{name}</h3>
                        <Button onClick={handleClose}>ok!</Button>
                    </>
                )}
            </div>
        </div>
    );
};
