import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
}

const BackButton: React.FC<Props> = ({ className }) => {
  return (
    <Link href="/" className={cn(className, 'flex gap-[15px] items-center')}>
      <div className="rounded-full bg-accentGreen w-[40px] h-[40px] flex items-center justify-center">
        <Image
          className="rotate-180"
          src="/icons/arrow.svg"
          alt=""
          width={14}
          height={14}
        />
      </div>

      <div className="text-[13px] font-[600] uppercase md:hidden">Back</div>
    </Link>
  );
};

export default BackButton;
