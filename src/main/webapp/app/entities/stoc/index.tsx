import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Stoc from './stoc';
import StocDetail from './stoc-detail';
import StocUpdate from './stoc-update';
import StocDeleteDialog from './stoc-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StocUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StocUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StocDetail} />
      <ErrorBoundaryRoute path={match.url} component={Stoc} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StocDeleteDialog} />
  </>
);

export default Routes;
