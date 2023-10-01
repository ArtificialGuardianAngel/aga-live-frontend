import { Button } from "@/components";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

type Props = {
    params: {
        id: string;
    };
};

const SignedPageWithDocuemntId = (props: Props) => {
    console.log(props);
    return (
        <div className="flex justify-center pt-[50px] wishes-xl:pt-0">
            <div
                className={cn(
                    "flex max-w-[1080px] flex-col gap-[70px] bg-card p-[70px_50px] text-blue-5",
                    "wishes-2xl:pb-[50px]",
                    "wishes-sm:gap-[50px] wishes-sm:p-[50px_30px_30px]",
                    "wishes-xs:p-[50px_20px_20px]",
                    "wishes-xs:p-[50px_10px_10px]",
                )}
            >
                <h2
                    className={cn(
                        "text-center text-[40px] font-[200]",
                        "wishes-2xl:text-[36px]",
                        "wishes-xl:text-[30px]",
                        "wishes-md:text-[26px]",
                        "wishes-sm:text-[22px]",
                        "wishes-xs:px-[20px]",
                        "wishes-xxs:px-[10px]",
                    )}
                >
                    <span className="text-accent-green">Congratulations</span>{" "}
                    on taking this step!
                </h2>
                <section className="flex flex-col bg-card p-[50px] wishes-sm:py-[30px] wishes-xs:px-[20px]">
                    <div className="flex flex-col items-center gap-[30px]">
                        <Image
                            src="/icons/done.svg"
                            alt="Done icon"
                            width={80}
                            height={80}
                        />
                        <h2
                            className={cn(
                                "text-center text-[40px] font-[200]",
                                "wishes-2xl:text-[36px]",
                                "wishes-xl:text-[30px]",
                                "wishes-md:text-[26px]",
                                "wishes-sm:text-[22px]",
                                "wishes-xs:px-[20px]",
                                "wishes-xxs:px-[10px]",
                            )}
                        >
                            OK, done!
                        </h2>
                    </div>
                    <div className="mt-[50px] flex flex-col items-center gap-[50px]">
                        <p
                            className={cn(
                                "text-center text-[18px] font-[200]",
                                "wishes-2xl:text-[16px]",
                                "wishes-md:text-[15px]",
                            )}
                        >
                            Thank you for submitting your wishes through our
                            website form! We will be responding to the email
                            address you provided in the form.
                        </p>
                        <Link href="/wishes">
                            <Button size="lg">Go to home page</Button>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SignedPageWithDocuemntId;
