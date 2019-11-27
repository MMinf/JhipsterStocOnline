import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NotifiTemplate from './notifi-template';
import NotifiTemplateDetail from './notifi-template-detail';
import NotifiTemplateUpdate from './notifi-template-update';
import NotifiTemplateDeleteDialog from './notifi-template-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NotifiTemplateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NotifiTemplateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NotifiTemplateDetail} />
      <ErrorBoundaryRoute path={match.url} component={NotifiTemplate} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NotifiTemplateDeleteDialog} />
  </>
);

export default Routes;
