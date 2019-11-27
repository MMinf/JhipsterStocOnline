import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ExtendedUser from './extended-user';
import NotifiTemplate from './notifi-template';
import Dealer from './dealer';
import Portofoliu from './portofoliu';
import Stoc from './stoc';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}extended-user`} component={ExtendedUser} />
      <ErrorBoundaryRoute path={`${match.url}notifi-template`} component={NotifiTemplate} />
      <ErrorBoundaryRoute path={`${match.url}dealer`} component={Dealer} />
      <ErrorBoundaryRoute path={`${match.url}portofoliu`} component={Portofoliu} />
      <ErrorBoundaryRoute path={`${match.url}stoc`} component={Stoc} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
