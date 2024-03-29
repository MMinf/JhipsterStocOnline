import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './dealer.reducer';
import { IDealer } from 'app/shared/model/dealer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDealerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DealerDetail extends React.Component<IDealerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { dealerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="hondaStocOnlineApp.dealer.detail.title">Dealer</Translate> [<b>{dealerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="hondaStocOnlineApp.dealer.name">Name</Translate>
              </span>
            </dt>
            <dd>{dealerEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="hondaStocOnlineApp.dealer.description">Description</Translate>
              </span>
            </dt>
            <dd>{dealerEntity.description}</dd>
            <dt>
              <span id="tipAutovehicule">
                <Translate contentKey="hondaStocOnlineApp.dealer.tipAutovehicule">Tip Autovehicule</Translate>
              </span>
            </dt>
            <dd>{dealerEntity.tipAutovehicule}</dd>
            <dt>
              <span id="dealerId">
                <Translate contentKey="hondaStocOnlineApp.dealer.dealerId">Dealer Id</Translate>
              </span>
            </dt>
            <dd>{dealerEntity.dealerId}</dd>
            <dt>
              <Translate contentKey="hondaStocOnlineApp.dealer.user">User</Translate>
            </dt>
            <dd>
              {dealerEntity.users
                ? dealerEntity.users.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.login}</a>
                      {i === dealerEntity.users.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}{' '}
            </dd>
          </dl>
          <Button tag={Link} to="/dealer" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/dealer/${dealerEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ dealer }: IRootState) => ({
  dealerEntity: dealer.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealerDetail);
