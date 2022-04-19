import React from 'react';
import { Button } from '@material-ui/core';

import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div>Your page doesn' exist</div>
      <Button component={Link} to="/" variant="contained" color="primary">Back to home</Button>
    </>
  )
}

export default NotFound
