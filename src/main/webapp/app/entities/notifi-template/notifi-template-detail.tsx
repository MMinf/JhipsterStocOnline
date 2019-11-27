import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './notifi-template.reducer';
import { INotifiTemplate } from 'app/shared/model/notifi-template.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotifiTemplateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NotifiTemplateDetail extends React.Component<INotifiTemplateDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { notifiTemplateEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="hondaStocOnlineApp.notifiTemplate.detail.title">NotifiTemplate</Translate> [
            <b>{notifiTemplateEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="emailAddresses">
                <Translate contentKey="hondaStocOnlineApp.notifiTemplate.emailAddresses">Email Addresses</Translate>
              </span>
            </dt>
            <dd>{notifiTemplateEntity.emailAddresses}</dd>
            <dt>
              <span id="message">
                <Translate contentKey="hondaStocOnlineApp.notifiTemplate.message">Message</Translate>
              </span>
            </dt>
            <dd>{notifiTemplateEntity.message}</dd>
          </dl>
          <Button tag={Link} to="/notifi-template" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/notifi-template/${notifiTemplateEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ notifiTemplate }: IRootState) => ({
  notifiTemplateEntity: notifiTemplate.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotifiTemplateDetail);
