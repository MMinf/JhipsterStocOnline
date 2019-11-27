import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './notifi-template.reducer';
import { INotifiTemplate } from 'app/shared/model/notifi-template.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INotifiTemplateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INotifiTemplateUpdateState {
  isNew: boolean;
}

export class NotifiTemplateUpdate extends React.Component<INotifiTemplateUpdateProps, INotifiTemplateUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { notifiTemplateEntity } = this.props;
      const entity = {
        ...notifiTemplateEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/notifi-template');
  };

  render() {
    const { notifiTemplateEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="hondaStocOnlineApp.notifiTemplate.home.createOrEditLabel">
              <Translate contentKey="hondaStocOnlineApp.notifiTemplate.home.createOrEditLabel">Create or edit a NotifiTemplate</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : notifiTemplateEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="notifi-template-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="notifi-template-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="emailAddressesLabel" for="notifi-template-emailAddresses">
                    <Translate contentKey="hondaStocOnlineApp.notifiTemplate.emailAddresses">Email Addresses</Translate>
                  </Label>
                  <AvField
                    id="notifi-template-emailAddresses"
                    type="text"
                    name="emailAddresses"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="messageLabel" for="notifi-template-message">
                    <Translate contentKey="hondaStocOnlineApp.notifiTemplate.message">Message</Translate>
                  </Label>
                  <AvField
                    id="notifi-template-message"
                    type="text"
                    name="message"
                    validate={{
                      maxLength: { value: 600, errorMessage: translate('entity.validation.maxlength', { max: 600 }) }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/notifi-template" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  notifiTemplateEntity: storeState.notifiTemplate.entity,
  loading: storeState.notifiTemplate.loading,
  updating: storeState.notifiTemplate.updating,
  updateSuccess: storeState.notifiTemplate.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotifiTemplateUpdate);
