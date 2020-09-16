import loglevel from 'loglevel';

switch (window.Environment) {
  /* istanbul ignore next: production environment */ case 'prd':
  /* istanbul ignore next: production environment */ case 'stg':
  /* istanbul ignore next: production environment */ case 'int': /* istanbul ignore next: production environment */ {
    loglevel.setLevel(loglevel.levels.INFO);
    break;
  }
  default: {
    loglevel.setLevel(loglevel.levels.DEBUG);
  }
}

export default loglevel;
