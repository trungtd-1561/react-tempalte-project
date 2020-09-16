export default {
  progress: {
    color: 'rgb(37,155,229)',
  },
  fullScreenProgress: {
    color: 'rgb(37,155,229)',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    '&:focus': {
      outline: 'none',
    },
  },
  fullScreenWrapper: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1400,
    '&:focus': {
      outline: 'none',
    },
  },
};
