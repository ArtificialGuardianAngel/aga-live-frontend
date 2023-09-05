import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLButtonElement>;

const VideoPlayButton = (props: Props) => {
    return (
        <button {...props}>
            <svg
                width="102"
                height="102"
                viewBox="0 0 102 102"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="51"
                    cy="51"
                    r="50"
                    stroke="white"
                    strokeOpacity="0.8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M37.0938 76.834V25.1649C37.0938 24.3515 38.0131 23.8784 38.675 24.3511L74.8434 50.1857C75.4018 50.5845 75.4018 51.4144 74.8434 51.8132L38.675 77.6478C38.0131 78.1205 37.0938 77.6474 37.0938 76.834Z"
                    stroke="white"
                    strokeOpacity="0.8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
};

export default VideoPlayButton;
