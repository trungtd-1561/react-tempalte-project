import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import clsx from 'clsx';
import useStyles from './styles';

const Root = () => {
  const classes = useStyles();

  return (
    <div
      className={clsx({
        [classes.root]: true,
      })}
    >
      Home page
    </div>
  );
};

export default compose(withRouter)(Root);
