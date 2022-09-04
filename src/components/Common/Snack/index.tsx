import React, { memo, useEffect, useMemo, useState } from 'react';
import { css, keyframes } from '@emotion/css';
import cn from 'classnames';
import type { SnackProps } from './types';

const countDownAnimation = keyframes`
from {
  transform: scaleX(0%);
}
to {
  transform: scaleX(100%);
}
`;

function Snack(props: SnackProps): React.ReactElement {
  /* States */
  const {
    show,
    children,
    countDown = 2000,
    pauseOnHover = false,
    classes = { snack: '', closeButton: '' },
    onClose,
    ...rest
  } = props;
  const classNameFromProps = rest.className;
  delete rest.className;
  const animationDuration = countDown / 1000;

  /* Hooks */
  useEffect(() => {
    if (show && onClose) {
      setTimeout(() => {
        onClose();
      }, countDown);
    }
  }, [show, countDown, onClose]);

  /* Views */
  const Snack = useMemo(
    () =>
      show ? (
        <div
          className={cn(
            css({
              minHeight: '60px',
              minWidth: '240px',
              display: 'inline-block',
              position: 'fixed',
              top: '24px',
              right: '24px',
              padding: '8px',
              backgroundColor: '#fff',
              '&:hover::before': {
                animationPlayState: pauseOnHover ? 'paused' : 'running',
              },
              '&::before': {
                content: '""',
                width: '100%',
                height: '2px',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: '#4e342e',
                transform: 'scaleX(0%)',
                transformOrigin: 'top left',
                animation: `${countDownAnimation} ${animationDuration}s ease`,
              },
            }),
            classes.snack,
            classNameFromProps
          )}
        >
          {children}
          <button
            type="button"
            onClick={onClose}
            className={cn(
              css({
                width: '24px',
                height: '24px',
                position: 'absolute',
                top: '8px',
                right: '8px',
                borderRadius: '24px',
                border: 'none',
                cursor: 'pointer',
              }),
              classes.closeButton
            )}
          >
            X
          </button>
        </div>
      ) : (
        <React.Fragment />
      ),
    [
      show,
      animationDuration,
      classes.snack,
      classes.closeButton,
      classNameFromProps,
    ]
  );

  /* Main */
  return Snack;
}

export default memo(Snack);
