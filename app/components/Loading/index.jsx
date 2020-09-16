import React, { memo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { debounce } from 'lodash';
import styles from './styles';

const renderFullScreenLoader = (classes, ref) => {
  return (
    <div
      className={classes.fullScreenWrapper}
      id="img-loading"
      ref={ref}
      role="button"
      tabIndex="0"
    >
      <CircularProgress
        className={classes.fullScreenProgress}
        size={24}
        thickness={4}
      />
    </div>
  );
};

const renderInlineLoader = classes => {
  return (
    <div className={classes.wrapper} id="img-loading">
      <CircularProgress className={classes.progress} size={24} thickness={4} />
    </div>
  );
};

const CircularIndeterminate = props => {
  const { classes, isFullScreen } = props;
  const wrapperElement = React.createRef();
  const fullScreen = Boolean(isFullScreen);

  debounce(() => {
    if (wrapperElement && wrapperElement.current && fullScreen) {
      wrapperElement.current.focus();
    }
  }, 0)();

  return fullScreen
    ? renderFullScreenLoader(classes, wrapperElement)
    : renderInlineLoader(classes);
};

CircularIndeterminate.defaultProps = {
  isFullScreen: false,
};

export default withStyles(styles)(memo(CircularIndeterminate));
