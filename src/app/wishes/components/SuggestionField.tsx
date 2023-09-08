"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "./Button";
import OverlayPageContext from "@/context/OverlayPageContext";
import Suggestions from "./Suggestions";

interface Props {
    number: number;
    title: string;
    onChange?: (v?: string) => void;
}

const SuggestionField: React.FC<Props> = ({
    title,
    number,
    onChange,
}) => {
    const { open, setContent } = useContext(OverlayPageContext);
    const [value, setValue] = useState("");

    const openOverlayPage = () => {
        setContent(
            <Suggestions onSuggestionClick={(text) => setValue(text)} />,
        );
        open();
    };

    useEffect(() => {
        onChange?.(value);
    }, [value]);

    return (
        <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[15px] wishes-md:flex-wrap">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-accentGreen text-[13px] font-bold text-blue7">
                    {number}
                </div>

                <h4 className="flex-1">{title}</h4>

                <Button
                    className="wishes-md:w-full"
                    type="card"
                    onClick={() => openOverlayPage()}
                >
                    suggestions
                </Button>
            </div>

            <div className="challenges-card-bg rounded-[15px] p-[2px]">
                <textarea
                    placeholder="Your wish..."
                    className="block h-full min-h-[200px] w-full resize-none rounded-[15px] bg-cardCombined p-[40px] text-[16px] text-white outline-none placeholder:text-white/50 wishes-md:min-h-[100px] wishes-md:p-[15px]"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                ></textarea>
            </div>
        </div>
    );
};

export default SuggestionField;
