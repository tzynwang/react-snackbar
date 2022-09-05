import React, { memo, useState } from 'react';
import Snack from '@Components/Common/Snack';

function App(): React.ReactElement {
  /* States */
  const [show, setShow] = useState<boolean>(false);

  /* Main */
  return (
    <div>
      <button type="button" onClick={() => setShow(true)}>
        show snackbar
      </button>
      <Snack show={show} onClose={() => setShow(false)} pauseOnHover>
        <div>hello world</div>
      </Snack>
    </div>
  );
}

export default memo(App);
