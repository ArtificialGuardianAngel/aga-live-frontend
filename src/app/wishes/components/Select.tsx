import Image from 'next/image';
import React, { useState } from 'react';
import cn from 'classnames';

interface Props {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const Select: React.FC<Props> = ({ placeholder, options, value, onChange }) => {
  const [opened, setOpened] = useState(false);

  const openDropdown = () => {
    setOpened(true);
  };

  const closeDropdown = () => {
    setOpened(false);
  };

  const toggleDropdown = () => {
    if (opened) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const onSelect = (value: string) => {
    onChange(value);
    closeDropdown();
  };

  return (
    <div className="relative">
      <div
        className="p-[25px] text-[rgba(255,255,255,0.5)] bg-card rounded-[4px] text-[16px] leading-[calc(12/16)] outline-none font-[500] flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className={cn('flex-1', { ['text-[#D6E1FA]']: value })}>
          {value || placeholder}
        </span>
        <Image
          className={cn('transition-all', { ['rotate-180']: opened })}
          src="/icons/small-arrow.svg"
          alt=""
          width={14}
          height={14}
        />
      </div>
      {opened && (
        <div className="absolute bottom-[-5px] translate-y-[100%] rounded-[5px] w-[100%] p-[35px_25px] flex flex-col gap-[30px] bg-[#22304D]">
          {options.map((val) => (
            <div
              key={val}
              className="cursor-pointer"
              onClick={() => onSelect(val)}
            >
              {val}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
