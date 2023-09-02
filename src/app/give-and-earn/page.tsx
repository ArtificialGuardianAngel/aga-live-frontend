"use client";

import {
    FormBlock,
    JoinUsBlock,
    VideoPresentationBlock,
    WelcomeBlock,
    WhyImportantBlock,
} from "./blocks";
import { Notifications } from "./components";
import { NotificationsContextProvider } from "./context/NotificationsContext";

const GiveAndEarnPage = () => {
    return (
        <>
            <NotificationsContextProvider>
                <a href="/" className={"fixed-back-link"}></a>
                <WelcomeBlock />

                <VideoPresentationBlock />

                <WhyImportantBlock />

                <JoinUsBlock />

                <FormBlock />

                <Notifications />
            </NotificationsContextProvider>
        </>
    );
};

export default GiveAndEarnPage;
