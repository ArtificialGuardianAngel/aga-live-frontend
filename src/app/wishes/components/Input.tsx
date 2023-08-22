import React, { HTMLProps } from 'react';
import cn from 'classnames';

interface Props extends HTMLProps<HTMLInputElement> {}

const Input: React.FC<Props> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        className,
        'p-[20px_25px] placeholder:text-[rgba(255,255,255,0.5)] bg-card rounded-[4px] text-[16px] leading-[calc(12/16)] outline-none text-[#D6E1FA]',
      )}
      {...props}
    />
  );
};

export default Input;
