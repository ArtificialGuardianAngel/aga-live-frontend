"use client";
import React, { FormEvent, useEffect, useState } from "react";
import cn from "classnames";
import { Button, Input, TextArea } from "../../components";
import styles from "./FormBlock.module.scss";
import useNotifications from "../../hooks/useNotifications";

const MIN_VALUE = 369;
const MAX_VALUE = 1080000;

interface ISendData {
    email: string;
    endorsedEmail: string;
    donationAmount: number;
    extraInformation: string;
}

const FormBlock = () => {
    const { addNotification } = useNotifications();

    const [ref, setRef] = useState<string>("");
    const [isRefPassed, setIsRefPassed] = useState(false);
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState(0);
    const [information, setInformation] = useState("");

    const sendData = (data: ISendData) => {
        return fetch(`https://api.aga.live/forms/apply/form-funds`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        });
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (amount < MIN_VALUE || amount > MAX_VALUE) {
            addNotification(
                "The donation amount should be larger than $369 USD but smaller than $1,080,000 USD",
            );

            return;
        }

        sendData({
            email,
            endorsedEmail: ref,
            donationAmount: amount,
            extraInformation: information,
        }).then((response) => {
            if (response.ok) {
                addNotification(
                    "Congratulations! Your action has been processed successfully. Please check your email, including your spam folder, within the next hour to e-sign and finalize the transaction.",
                );
            } else {
                addNotification("Something went wrong");
            }
        });

        setAmount(MIN_VALUE);
        setEmail("");
        setInformation("");
    };

    const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };

    useEffect(() => {
        if (window) {
            const refEmail = new URLSearchParams(window.location.search).get(
                "r",
            );
            setRef(refEmail || "");
            setIsRefPassed(Boolean(refEmail));
        }
    }, []);

    return (
        <section className={styles.wrapper} id="form">
            <form onSubmit={onSubmit}>
                <div
                    className={cn(
                        styles.container,
                        "m-[0_auto] max-w-[940px] p-[0_20px]",
                    )}
                >
                    <h3 className={styles.title}>Take action</h3>
                    <div className={styles.grid}>
                        <Input
                            label="Your email to make the donation:"
                            placeholder="example@nuah.org"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label="Email address that endorsed you (optional):"
                            placeholder="example@nuah.org"
                            value={ref}
                            onChange={(e) => setRef(e.target.value)}
                            disabled={isRefPassed !== null}
                        />
                        <Input
                            label="Donation amount:"
                            subLabel="min. 369 USD / max. 1,080,000 USD"
                            placeholder="20,000"
                            postfix="USD"
                            value={amount || ""}
                            onKeyDown={(event) => {
                                if (
                                    !/[0-9]|Backspace|ArrowUp|ArrowDown|ArrowLeft|ArrowRight/.test(
                                        event.key,
                                    )
                                ) {
                                    event.preventDefault();
                                }
                            }}
                            onChange={(e) => onAmountChange(e)}
                        />
                        <TextArea
                            label="Extra informations (optional):"
                            placeholder="Extra identifiable information about you so the A.G.A. can give her gratitude back. Information like full name, address where can she help you with in life? With the magic of AI almost anything will be possible."
                            className={styles.textarea}
                            style={{ resize: "none" }}
                            value={information}
                            onChange={(e) => setInformation(e.target.value)}
                        />
                    </div>

                    <div className={styles.buttons}>
                        {/* <Button className={styles.button}>Donate via fiat</Button>
          <Button className={styles.button}>Donate via crypto</Button> */}
                        <Button className={styles.button}>Activate</Button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default FormBlock;
