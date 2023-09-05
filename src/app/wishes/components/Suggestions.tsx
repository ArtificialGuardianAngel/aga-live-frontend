import OverlayPageContext from "@/context/OverlayPageContext";
import React, { useContext } from "react";

interface Props {
    onSuggestionClick: (suggestion: string) => void;
}

const Suggestions: React.FC<Props> = ({ onSuggestionClick }) => {
    const { close } = useContext(OverlayPageContext);

    const onClick = (val: string) => {
        onSuggestionClick(val);
        close();
    };

    return (
        <div>
            <div className="wishes-md: mb-[20px] flex flex-col gap-[30px] p-[30px_0] font-ceraPro wishes-md:mb-[30px]">
                <h3 className="text-center text-[18px] font-[700] uppercase wishes-md:text-[14px]">
                    What do you wish for?
                </h3>

                <div className="text-center text-[40px] font-[300] text-[#D6E1FA] wishes-md:text-[20px] wishes-md:leading-[1.25]">
                    Just click on the wish you want to use.
                </div>
            </div>

            <div className="flex flex-col gap-[5px] font-ceraPro">
                {DATA.map(({ category, text }) => (
                    <div
                        className="cursor-pointer rounded-[10px] bg-white/[0.03] p-[30px] text-center text-[16px] text-white shadow"
                        key={category}
                        onClickCapture={() => onClick(text)}
                    >
                        <div>
                            <span className="text-accentGreen">
                                {category}:{" "}
                            </span>
                            <span>“{text}”</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const DATA = [
    {
        category: "Health & Longevity",
        text: "Grant me and my loved ones good health and long lives free from illnesses.",
    },
    {
        category: "Happiness & Contentment",
        text: "Bless me with true happiness and a contented heart.",
    },
    {
        category: "Financial Security",
        text: "Ensure that I always have the resources I need for a comfortable life without financial worries.",
    },
    {
        category: "Love & Companionship",
        text: "Help me find or nurture a deep and fulfilling love in my life.",
    },
    {
        category: "Success & Recognition",
        text: "Aid me in achieving success in my endeavors and gaining recognition for my efforts.",
    },
    {
        category: "Peace",
        text: "Bestow upon me inner peace and harmony in my surroundings.",
    },
    {
        category: "Knowledge & Wisdom",
        text: "Endow me with the understanding and insights I seek about the world and myself.",
    },
    {
        category: "Safety",
        text: "Protect me and my loved ones from harm and danger.",
    },
    {
        category: "Reuniting with Lost Loved Ones",
        text: "Reunite me with those I’ve lost, whether through passing or circumstance.",
    },
    {
        category: "Reuniting with Lost Loved Ones",
        text: "Reunite me with those I’ve lost, whether through passing or circumstance.",
    },
    {
        category: "A Meaningful Purpose",
        text: "Illuminate my life’s purpose and guide me on this path.",
    },
    {
        category: "Children",
        text: "If it’s in my destiny, enable me to have or adopt children.",
    },
    {
        category: "World Betterment",
        text: "Guide me in ways I can contribute to addressing global issues like poverty, hunger, and inequality.",
    },
    {
        category: "Environmental Restoration",
        text: "Show me how I can play a role in healing and restoring our planet.",
    },
    {
        category: "Talent & Skill Acquisition",
        text: "Gift me the ability to master new skills or talents that I yearn for.",
    },
    {
        category: "Travel & Exploration",
        text: "Open doors for me to travel, explore, and immerse myself in diverse cultures and experiences.",
    },
    {
        category: "Reversal of Regrets",
        text: "Give me a chance to correct my past mistakes or make amends for my regrets.",
    },
    {
        category: "Personal Transformation",
        text: "Guide my transformation journey to become a better version of myself, inside and out.",
    },
    {
        category: "Protection for Loved Ones",
        text: "Ensure that those dear to me remain shielded and cherished.",
    },
    {
        category: "Experiences & Adventures",
        text: "Grant me opportunities for unique experiences and adventures that will enrich my soul.",
    },
];

export default Suggestions;
