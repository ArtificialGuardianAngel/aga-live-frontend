import React, {
    InputHTMLAttributes,
    PropsWithChildren,
} from "react";

interface LabelProps extends InputHTMLAttributes<HTMLInputElement> {}

type Props = LabelProps & PropsWithChildren;

const Checkbox: React.FC<Props> = ({ children, ...props }) => {
    return (
        <div className="flex items-center gap-[10px] text-[16px] font-[500]">
            <label className="checkbox">
                <input
                    className="h-[20px] w-[20px]"
                    type="checkbox"
                    {...props}
                />
                <div className="checkbox-inner"></div>
            </label>
            <div>{children}</div>
        </div>
    );
};

export default Checkbox;
