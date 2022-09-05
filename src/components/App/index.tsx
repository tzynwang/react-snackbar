import React, { memo, useState } from 'react';
import Snack from '@Components/Common/Snack';
import SnackMultiple from '@Components/Common/SnackMultiple';
import type { Snacks } from '@Components/Common/SnackMultiple/types';

function App(): React.ReactElement {
  /* States */
  const [show, setShow] = useState<boolean>(false);
  const [snacks, setSnacks] = useState<Snacks>([]);

  /* Functions */
  const addNewSnack = (): void => {
    setSnacks([
      ...snacks,
      {
        id: snacks.length.toString(),
        show: true,
        children: <div>multiple snack: {snacks.length}</div>,
        pauseOnHover: true,
      },
    ]);
  };
  const removeOneSnack = (snackId: unknown) => {
    const id = snackId as string;
    setSnacks((prev) =>
      prev.map((p) => (p.id === id ? { ...p, show: false } : p))
    );
  };

  /* Main */
  return (
    <div>
      <button type="button" onClick={() => setShow(true)}>
        show snackbar
      </button>
      <button type="button" onClick={addNewSnack}>
        add one more snack
      </button>
      <Snack show={show} onClose={() => setShow(false)} pauseOnHover>
        <div>hello world</div>
      </Snack>
      <SnackMultiple snacks={snacks} onClose={removeOneSnack} />
    </div>
  );
}

export default memo(App);
