import palette from '../palette';

export default {
  underline: {
    '&:before': {
      borderBottom: '2px solid rgba(216,216,216)',
    },
    '&&&&:hover:before': {
      borderBottomColor: palette.primary.main,
    },
    '&:after': {
      borderBottomColor: palette.primary.main,
    },
  },
};
