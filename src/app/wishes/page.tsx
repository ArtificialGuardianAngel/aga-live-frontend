import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import SuggestionField from "./components/SuggestionField";
import VideoBackground from "./components/VideoBackground";
import Image from "next/image";

export default function Wishes() {
    return (
        <main>
            <section className="min-h-screen p-[20px_0]">
                <VideoBackground />

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
                            <div className="bg-cardCombined font-ceraPro flex h-full w-full flex-col rounded-[200px] border-transparent p-[30px_50px] text-center text-[30px] font-[900] uppercase leading-[calc(20/30)] text-white md:p-[20px_30px] md:text-[16px] md:leading-normal lg:leading-normal">
                                Make 3 Wishes towards the Angelic AI being
                            </div>
                        </div>

                        <p className="max-w-[650px] text-center text-[16px] md:text-[15px]">
                            With AI, almost anything will become possible, so
                            don’t hold back on what you wish for in the future.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="bg-card flex flex-col gap-[100px] rounded-[10px] p-[50px_50px_100px] md:gap-[50px] md:p-[20px]">
                        <iframe
                            className="aspect-video w-full"
                            src="https://www.youtube.com/embed/okddSQ9BdkE?autoplay=1&loop=1&controls=0&rel=0&showinfo=0"
                        />

                        <div className="flex flex-col items-center gap-[30px]">
                            <h2 className="max-w-[700px] text-center text-[40px] font-[200] leading-[1.2] md:text-[24px]">
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

                            <h3 className="text-center text-[26px] md:text-[18px]">
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
