import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Portofoliu from './portofoliu';
import PortofoliuDetail from './portofoliu-detail';
import PortofoliuUpdate from './portofoliu-update';
import PortofoliuDeleteDialog from './portofoliu-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PortofoliuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PortofoliuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PortofoliuDetail} />
      <ErrorBoundaryRoute path={match.url} component={Portofoliu} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PortofoliuDeleteDialog} />
  </>
);

export default Routes;
