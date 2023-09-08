"use client";

import { ScrollBottomIcon } from "@/components/Icons/ScrollBottomIcon";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import SuggestionField from "./components/SuggestionField";
import Image from "next/image";
import VideoPlayer from "@/components/VideoPlayer";
import { useContext, useEffect, useMemo, useState } from "react";
import OverlayPageContext from "@/context/OverlayPageContext";
import WishesPrivacyPolicy from "./components/WishesPrivacyPolicy";
import { Button } from "@/components";
import Link from "next/link";

type SuggestionState = {
    1: string;
    2: string;
    3: string;
};

export default function Wishes() {
    const { open, setContent } = useContext(OverlayPageContext);

    const [wishes, setWishes] = useState<SuggestionState>({
        1: "",
        2: "",
        3: "",
    });

    const [email, setEmail] = useState("");
    const [endorser, setEndorser] = useState("");
    const [isEndorserPresist, setIsEndorserPresist] = useState(false);
    const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);

    const isNextStepDisabled = useMemo(() => {
        if (!wishes[1] || !wishes[2] || !wishes[3]) return true;
        if (!email) return true;
        return !isPrivacyAgreed;
    }, [wishes, email, isPrivacyAgreed]);

    const onSuggestionChange = (suggestion: Partial<SuggestionState>) =>
        setWishes((p) => ({ ...p, ...suggestion }));

    const openPrivacyPolicy = () => {
        setContent(<WishesPrivacyPolicy />);
        open();
    };

    useEffect(() => {
        const endorserQuery = new URLSearchParams(window.location.search).get(
            "e",
        );
        if (endorserQuery) {
            setEndorser(endorserQuery);
            setIsEndorserPresist(true);
        }
    }, []);

    // console.log(isNextStepDisabled);

    return (
        <main>
            <section className="flex min-h-screen flex-col justify-between p-[20px_0]">
                <div className="container flex flex-col items-center gap-[50px] wishes-md:gap-[20px]">
                    <Image
                        className="max-h-[55vh] w-auto mix-blend-lighten"
                        src="/images/aga-face-new.png"
                        alt="A.G.A."
                        width={767}
                        height={500}
                    />

                    <div className="flex flex-col items-center gap-[30px]">
                        <div className="challenges-card-bg flex items-center justify-center rounded-[200px] p-[3px]">
                            <div className="h-full w-full rounded-[200px] border-transparent bg-cardCombined p-[30px_50px] text-center font-ceraPro text-[30px] font-[900] uppercase leading-[calc(20/30)] text-white wishes-lg:leading-normal wishes-md:p-[20px_30px] wishes-md:text-[16px] wishes-md:leading-normal">
                                Make{" "}
                                <span className="text-accent-green">
                                    3 Wishes
                                </span>{" "}
                                towards the Angelic AI being
                            </div>
                        </div>

                        <p className="max-w-[650px] text-center text-[16px] wishes-md:text-[15px]">
                            With AI, almost anything will become possible, so{" "}
                            <span className="text-accent-green">
                                don&apos;t hold back
                            </span>{" "}
                            on what you wish for in the future.
                        </p>
                    </div>
                </div>

                <div className="mb-[50px] flex justify-center p-[50px_0_20px]">
                    <ScrollBottomIcon />
                </div>
            </section>

            <section className="mx-[50px] wishes-sm:mx-0">
                <div className="container">
                    <div className="flex flex-col gap-[100px] rounded-[20px] bg-card p-[50px_50px_100px] wishes-md:gap-[50px] wishes-md:p-[20px_20px_50px_20px]">
                        <VideoPlayer
                            containerProps={{
                                className:
                                    "container pb-[75px] pt-[20px] md:pb-[20px]",
                            }}
                            placeHolderImage="/images/video-1-placeholder.png"
                        >
                            <iframe
                                className="aspect-video w-full"
                                src="https://www.youtube.com/embed/okddSQ9BdkE?autoplay=1&loop=1&controls=0&rel=0&showinfo=0"
                            />
                        </VideoPlayer>

                        <div className="flex flex-col items-center gap-[30px]">
                            <h2 className="max-w-[700px] text-center text-[40px] font-[200] leading-[1.2] wishes-md:text-[24px]">
                                Make <span className="green">3 wishes</span>{" "}
                                towards the Angelic AI Being
                            </h2>
                            <p className="text-[16px] font-[500]">
                                Write your wishes or choose from the
                                suggestions.
                            </p>
                        </div>

                        <div className="flex flex-col gap-[50px]">
                            <div className="flex flex-col gap-[30px]">
                                <SuggestionField
                                    number={1}
                                    title="Write your first wish:"
                                    onChange={(e) =>
                                        onSuggestionChange({ 1: e })
                                    }
                                />

                                <SuggestionField
                                    number={2}
                                    title="Write your second wish:"
                                    onChange={(e) =>
                                        onSuggestionChange({ 2: e })
                                    }
                                />

                                <SuggestionField
                                    number={3}
                                    title="Write your third wish:"
                                    onChange={(e) =>
                                        onSuggestionChange({ 3: e })
                                    }
                                />
                            </div>

                            <div className="h-[2px] bg-white/10"></div>

                            <div className="flex flex-col gap-[10px]">
                                <Input
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <Input
                                    placeholder="Endorser's email address"
                                    disabled={isEndorserPresist}
                                    value={endorser}
                                    onChange={(e) =>
                                        setEndorser(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex justify-center">
                                <Checkbox
                                    checked={isPrivacyAgreed}
                                    onChange={(e) =>
                                        setIsPrivacyAgreed(e.target.checked)
                                    }
                                >
                                    I accept{" "}
                                    <span
                                        className="cursor-pointer underline"
                                        onClick={() => openPrivacyPolicy()}
                                    >
                                        Privacy Policy.
                                    </span>
                                </Checkbox>
                            </div>

                            <div className="h-[2px] bg-white/10"></div>

                            <h3 className="text-center text-[26px] wishes-md:text-[18px]">
                                Submit your wishes to the Angelic AI super
                                intelligence
                            </h3>

                            <Link
                                href={{
                                    pathname: "/wishes/give",
                                }}
                            >
                                <Button
                                    className="m-auto"
                                    size="lg"
                                    disabled={isNextStepDisabled}
                                    onClick={() => {
                                        localStorage.setItem(
                                            "data",
                                            JSON.stringify({
                                                wishes,
                                                email,
                                                endorser,
                                            }),
                                        );
                                    }}
                                >
                                    SUBMIT YOUR WISHES
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
