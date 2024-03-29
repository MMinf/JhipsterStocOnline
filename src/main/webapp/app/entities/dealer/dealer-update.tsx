import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './dealer.reducer';
import { IDealer } from 'app/shared/model/dealer.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDealerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDealerUpdateState {
  isNew: boolean;
  idsuser: any[];
}

export class DealerUpdate extends React.Component<IDealerUpdateProps, IDealerUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsuser: [],
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

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { dealerEntity } = this.props;
      const entity = {
        ...dealerEntity,
        ...values,
        users: mapIdList(values.users)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/dealer');
  };

  render() {
    const { dealerEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="hondaStocOnlineApp.dealer.home.createOrEditLabel">
              <Translate contentKey="hondaStocOnlineApp.dealer.home.createOrEditLabel">Create or edit a Dealer</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : dealerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="dealer-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="dealer-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="dealer-name">
                    <Translate contentKey="hondaStocOnlineApp.dealer.name">Name</Translate>
                  </Label>
                  <AvField
                    id="dealer-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="dealer-description">
                    <Translate contentKey="hondaStocOnlineApp.dealer.description">Description</Translate>
                  </Label>
                  <AvField id="dealer-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="tipAutovehiculeLabel" for="dealer-tipAutovehicule">
                    <Translate contentKey="hondaStocOnlineApp.dealer.tipAutovehicule">Tip Autovehicule</Translate>
                  </Label>
                  <AvInput
                    id="dealer-tipAutovehicule"
                    type="select"
                    className="form-control"
                    name="tipAutovehicule"
                    value={(!isNew && dealerEntity.tipAutovehicule) || 'AUTOMOBILE'}
                  >
                    <option value="AUTOMOBILE">{translate('hondaStocOnlineApp.TipuriAuto.AUTOMOBILE')}</option>
                    <option value="MOTOCILCETE">{translate('hondaStocOnlineApp.TipuriAuto.MOTOCILCETE')}</option>
                    <option value="TOATE">{translate('hondaStocOnlineApp.TipuriAuto.TOATE')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="dealerIdLabel" for="dealer-dealerId">
                    <Translate contentKey="hondaStocOnlineApp.dealer.dealerId">Dealer Id</Translate>
                  </Label>
                  <AvField id="dealer-dealerId" type="text" name="dealerId" />
                </AvGroup>
                <AvGroup>
                  <Label for="dealer-user">
                    <Translate contentKey="hondaStocOnlineApp.dealer.user">User</Translate>
                  </Label>
                  <AvInput
                    id="dealer-user"
                    type="select"
                    multiple
                    className="form-control"
                    name="users"
                    value={dealerEntity.users && dealerEntity.users.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/dealer" replace color="info">
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
  users: storeState.userManagement.users,
  dealerEntity: storeState.dealer.entity,
  loading: storeState.dealer.loading,
  updating: storeState.dealer.updating,
  updateSuccess: storeState.dealer.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
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
)(DealerUpdate);
