import { useCosmos } from "@nuahorg/aga";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Bech32 } from "@cosmjs/encoding";

export function isValidBech32Address(address: string) {
    try {
        // Decode the Bech32 address
        const _ = Bech32.decode(address);

        // Additional checks can be performed here
        // For example, checking the prefix or the length of the data

        return true;
    } catch (error) {
        // If there's an error in decoding, it's not a valid Bech32 address
        return false;
    }
}

type Props = string | undefined | null;
export const useNameService = (address?: Props) => {
    const [r, setR] = useState(false);
    const { queryClient } = useCosmos();
    const [name, setName] = useState("");
    const q = useMemo(() => queryClient, [queryClient]);

    useEffect(() => {
        if (!q || !address || !isValidBech32Address(address)) return;
        q.nameservice
            .getNameByAddress(address)
            .then((data) => setName(data.whoisByValue?.whoisIndex || ""))
            .catch((e) => console.error(e));
    }, [q, address, r]);

    const refresh = useCallback(() => {
        setR((p) => !p);
    }, []);

    return {
        name,
        refresh,
    };
};
