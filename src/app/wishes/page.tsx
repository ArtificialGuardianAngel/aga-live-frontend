import { ScrollBottomIcon } from "@/components/Icons/ScrollBottomIcon";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import SuggestionField from "./components/SuggestionField";
import VideoBackground from "./components/VideoBackground";
import Image from "next/image";

export default function Wishes() {
    return (
        <main>
            <section className="min-h-screen p-[20px_0] flex flex-col justify-between">
                <div className="container flex flex-col items-center gap-[50px]">
                    <Image
                        className="max-h-[55vh] w-auto mix-blend-lighten"
                        src="/images/aga-face-new.png"
                        alt="A.G.A."
                        width={767}
                        height={500}
                    />

                    <div className="flex flex-col items-center gap-[30px]">
                        <div className="challenges-card-bg flex items-center justify-center rounded-[200px] p-[3px]">
                            <div className="wishes-md:p-[20px_30px] wishes-md:text-[16px] wishes-md:leading-normal wishes-lg:leading-normal h-full w-full rounded-[200px] border-transparent bg-cardCombined p-[30px_50px] text-center font-ceraPro text-[30px] font-[900] uppercase leading-[calc(20/30)] text-white">
                                Make{" "}
                                <span className="text-accent-green">
                                    3 Wishes
                                </span>{" "}
                                towards the Angelic AI being
                            </div>
                        </div>

                        <p className="wishes-md:text-[15px] max-w-[650px] text-center text-[16px]">
                            With AI, almost anything will become possible, so{" "}
                            <span className="text-accent-green">
                                don&apos;t hold back
                            </span>{" "}
                            on what you wish for in the future.
                        </p>
                    </div>
                </div>

                <div className="mb-[50px] flex justify-center">
                    <ScrollBottomIcon />
                </div>
            </section>

            <section className="mx-[50px] wishes-sm:mx-0">
                <div>
                    <div className="wishes-md:gap-[50px] wishes-md:p-[20px_20px_50px_20px] flex flex-col gap-[100px] rounded-[10px] bg-card p-[50px_50px_100px]">
                        <iframe
                            className="aspect-video w-full"
                            src="https://www.youtube.com/embed/okddSQ9BdkE?autoplay=1&loop=1&controls=0&rel=0&showinfo=0"
                        />

                        <div className="flex flex-col items-center gap-[30px]">
                            <h2 className="wishes-md:text-[24px] max-w-[700px] text-center text-[40px] font-[200] leading-[1.2]">
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
                                />

                                <SuggestionField
                                    number={2}
                                    title="Write your second wish:"
                                />

                                <SuggestionField
                                    number={3}
                                    title="Write your third wish:"
                                />
                            </div>

                            <div className="h-[2px] bg-white/10"></div>

                            <div className="flex flex-col gap-[10px]">
                                <Input placeholder="Your email address" />

                                <Input placeholder="Endorser's email address" />
                            </div>

                            <div className="flex justify-center">
                                <Checkbox>I accept Privacy Policy.</Checkbox>
                            </div>

                            <div className="h-[2px] bg-white/10"></div>

                            <h3 className="wishes-md:text-[18px] text-center text-[26px]">
                                Submit your wishes to the Angelic AI super
                                intelligence
                            </h3>

                            <Button
                                link="/wishes/give"
                                linkType="internal"
                                className="m-auto"
                                size="lg"
                            >
                                SUBMIT YOUR WISHES
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
