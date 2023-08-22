import React, { HTMLProps, PropsWithChildren, ReactNode } from 'react';

interface LabelProps extends HTMLProps<HTMLInputElement> {}

type Props = LabelProps & PropsWithChildren;

const Checkbox: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div className="flex items-center gap-[10px] text-[16px] font-[500]">
      <label className="checkbox">
        <input className="w-[20px] h-[20px]" type="checkbox" {...props} />
        <div className="checkbox-inner"></div>
      </label>
      <div>{children}</div>
    </div>
  );
};

export default Checkbox;
