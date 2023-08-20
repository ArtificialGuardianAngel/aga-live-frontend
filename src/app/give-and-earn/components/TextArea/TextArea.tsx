import React from 'react';
import cn from 'classnames';

import styles from './TextArea.module.scss';

interface TextAreaProps {
  className?: string;
  label?: string;
  subLabel?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

type Props = TextAreaProps &
  Omit<React.HTMLProps<HTMLTextAreaElement>, 'onChange'>;

const TextArea: React.FC<Props> = ({
  className,
  label,
  subLabel,
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
      <textarea className={styles.textArea} onChange={onChange} {...props} />
    </div>
  );
};

export default TextArea;
