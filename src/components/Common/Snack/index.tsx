import React, { memo, useCallback, useEffect } from 'react';
import { css, keyframes } from '@emotion/css';
import cn from 'classnames';
import Portal from '@Components/Common/Portal';
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
  const animationDuration = countDown / 1000;
  const classNameFromProps = rest.className;
  delete rest.className;

  /* Functions */
  const closeSnack = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  /* Hooks */
  useEffect(() => {
    document.addEventListener('animationend', closeSnack);
    return () => {
      document.removeEventListener('animationend', closeSnack);
    };
  }, [closeSnack]);

  /* Main */
  return show ? (
    <Portal>
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
    </Portal>
  ) : (
    <React.Fragment />
  );
}

export default memo(Snack);
