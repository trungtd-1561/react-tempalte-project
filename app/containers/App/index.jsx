import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { createMuiTheme } from '@material-ui/core/styles';
import Theme from 'components/Theme';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import RootContainer from 'containers/Root';

const muiTheme = createMuiTheme(Theme);

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <RootContainer />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default compose(withRouter)(App);
