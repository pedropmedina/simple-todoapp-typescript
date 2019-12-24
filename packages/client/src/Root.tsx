import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouterProps,
  Link
} from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ApolloProvider } from '@apollo/react-hooks';

import { App } from './containers/App';
import { Signup } from './containers/Signup';
import { client } from './client';

const Root: React.FC<BrowserRouterProps> = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/signup' component={Signup} />
          <Route
            render={() => (
              <div>
                Nothing here, go back to home <Link to='/'>Home</Link>
              </div>
            )}
          />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default hot(Root);
