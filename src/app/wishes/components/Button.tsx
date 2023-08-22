import React, { HtmlHTMLAttributes, PropsWithChildren } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'card';
  size?: 'sm' | 'lg';
  icon?: 'arrow' | 'external';
  link?: string;
  linkType?: 'external' | 'internal';
}

type Props = PropsWithChildren<
  ButtonProps & HtmlHTMLAttributes<HTMLButtonElement>
>;

const Button = ({
  size = 'sm',
  type = 'primary',
  icon,
  children,
  link,
  className,
  linkType,
  onClick,
}: Props) => {
  const stylesClass = cn(
    'relative cursor-pointer font-[600] rounded-[50px] uppercase inline-block text-center',
    className,
    {
      ['bg-accentGreen text-blue7 font-[600]']: type === 'primary',
      ['bg-transparent text-accentGreen border-[2px] border-accentGreen']:
        type === 'secondary',
      ['text-[11px] p-[15px_20px] leading-[calc(8/11)]']: size === 'sm',
      ['text-[13px] leading-[calc(9/13)] p-[25px_30px] text-[#4C5576]']:
        size === 'lg',
      ['pr-[40px]']: icon && size === 'sm',
      ['pr-[50px]']: icon && size === 'lg',
      ['bg-white/10 text-[#AEB9D2] font-bold']: type === 'card',
    },
  );

  if (link) {
    if (linkType === 'internal') {
      return (
        <Link href={link} className={stylesClass}>
          {children}
          {icon && (
            <Image
              className={cn('absolute top-[50%] translate-y-[-50%]', {
                ['right-[20px]']: size === 'sm',
                ['right-[30px]']: size === 'lg',
              })}
              src={`/icons/${icon}.svg`}
              alt=""
              width={10}
              height={10}
            />
          )}
        </Link>
      );
    }

    return (
      <a href={link} target="_blank" className={stylesClass}>
        {children}
        {icon && (
          <Image
            className={cn('absolute top-[50%] translate-y-[-50%]', {
              ['right-[20px]']: size === 'sm',
              ['right-[30px]']: size === 'lg',
            })}
            src={`/icons/${icon}.svg`}
            alt=""
            width={10}
            height={10}
          />
        )}
      </a>
    );
  }

  return (
    <button
      className={cn(
        'relative cursor-pointer font-[600] rounded-[50px] uppercase text-center',
        className,
        {
          ['bg-accentGreen text-blue7 font-[600]']: type === 'primary',
          ['bg-transparent text-accentGreen border-[2px] border-accentGreen']:
            type === 'secondary',
          ['text-[11px] p-[15px_20px] leading-[calc(8/11)]']: size === 'sm',
          ['text-[13px] leading-[calc(9/13)] p-[25px_30px] text-[#4C5576]']:
            size === 'lg',
          ['pr-[40px]']: icon,
          ['bg-white/10 text-[#AEB9D2] font-bold']: type === 'card',
        },
      )}
      onClick={onClick}
    >
      {children}
      {icon && (
        <Image
          className={cn(
            'absolute top-[50%] translate-y-[-50%] translate-x-[50%]',
            {
              ['right-[20px]']: size === 'sm',
              ['right-[30px]']: size === 'lg',
            },
          )}
          src={`/icons/${icon}.svg`}
          alt=""
          width={10}
          height={10}
        />
      )}
    </button>
  );
};

export default Button;
