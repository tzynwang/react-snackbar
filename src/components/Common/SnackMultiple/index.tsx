import React, { memo, useCallback } from 'react';
import { css } from '@emotion/css';
import Portal from '@Components/Common/Portal';
import Snack from '@Components/Common/Snack';
import type { SnackMultipleProps, Snacks } from './types';

function SnackMultiple(props: SnackMultipleProps): React.ReactElement {
  /* States */
  const { snacks, onClose } = props;

  /* Functions */
  const closeSingleSnack = (snackId: unknown): void => {
    if (onClose) {
      onClose(snackId);
    }
  };
  const calcHeight = useCallback((array: Snacks, index: number) => {
    const top = array.slice(0, index).filter((s) => s.show).length;
    return css({
      transform: `translateY(calc(${top * (60 + 24)}px))`,
      transition: 'transform .3s ease-in',
    });
  }, []);

  /* Main */
  return (
    <Portal>
      <React.Fragment>
        {snacks.map((snack, index) => (
          <Snack
            key={snack.id}
            show={snack.show}
            onClose={() => closeSingleSnack(snack.id)}
            classes={{ snack: calcHeight(snacks, index) }}
            countDown={snack.countDown}
            disableAutoClose={snack.disableAutoClose}
            pauseOnHover={snack.pauseOnHover}
          >
            {snack.children}
          </Snack>
        ))}
      </React.Fragment>
    </Portal>
  );
}

export default memo(SnackMultiple);
