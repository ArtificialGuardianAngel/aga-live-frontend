type Props = {
    value: number;
};

export const ProgressBar = ({ value }: Props) => (
    <div className="relative h-[10px] rounded-[30px] bg-white/10">
        <div
            className={`absolute bottom-0 left-0 top-0 h-[10px] rounded-[30px] bg-accent-green transition-all duration-700`}
            style={{ width: value + "%" }}
        />
    </div>
);
