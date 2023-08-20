import React from 'react';
import cn from 'classnames';

import styles from './Input.module.scss';

interface InputProps {
  className?: string;
  label?: string;
  subLabel?: string;
  postfix?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type Props = InputProps &
  Omit<React.HTMLProps<HTMLInputElement>, 'className' | 'onChange'>;

const Input: React.FC<Props> = ({
  className,
  label,
  subLabel,
  postfix,
  onChange,
  ...props
}) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      {(label || subLabel) && (
        <div className={styles.labelWrapper}>
          <span className={styles.label}>{label}</span>
          <span className={styles.subLabel}>{subLabel}</span>
        </div>
      )}
      <div
        data-postfix={postfix}
        className={cn(styles.inputWrapper, { [styles.postfix]: postfix })}
      >
        <input
          className={cn(styles.input, { [styles.postfix]: postfix })}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
