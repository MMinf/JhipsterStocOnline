import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './stoc.reducer';
import { IStoc } from 'app/shared/model/stoc.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStocDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StocDetail extends React.Component<IStocDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { stocEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="hondaStocOnlineApp.stoc.detail.title">Stoc</Translate> [<b>{stocEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="hTROCARNO">
                <Translate contentKey="hondaStocOnlineApp.stoc.hTROCARNO">H TROCARNO</Translate>
              </span>
            </dt>
            <dd>{stocEntity.hTROCARNO}</dd>
            <dt>
              <span id="rESDEALERID">
                <Translate contentKey="hondaStocOnlineApp.stoc.rESDEALERID">R ESDEALERID</Translate>
              </span>
            </dt>
            <dd>{stocEntity.rESDEALERID}</dd>
            <dt>
              <span id="aNFABRICATIECIV">
                <Translate contentKey="hondaStocOnlineApp.stoc.aNFABRICATIECIV">A NFABRICATIECIV</Translate>
              </span>
            </dt>
            <dd>{stocEntity.aNFABRICATIECIV}</dd>
            <dt>
              <span id="tIPAUTOVEHICUL">
                <Translate contentKey="hondaStocOnlineApp.stoc.tIPAUTOVEHICUL">T IPAUTOVEHICUL</Translate>
              </span>
            </dt>
            <dd>{stocEntity.tIPAUTOVEHICUL}</dd>
            <dt>
              <span id="cODCULOAREEXTERIOR">
                <Translate contentKey="hondaStocOnlineApp.stoc.cODCULOAREEXTERIOR">C ODCULOAREEXTERIOR</Translate>
              </span>
            </dt>
            <dd>{stocEntity.cODCULOAREEXTERIOR}</dd>
            <dt>
              <span id="dESCCULOAREEXTERIOR">
                <Translate contentKey="hondaStocOnlineApp.stoc.dESCCULOAREEXTERIOR">D ESCCULOAREEXTERIOR</Translate>
              </span>
            </dt>
            <dd>{stocEntity.dESCCULOAREEXTERIOR}</dd>
            <dt>
              <span id="vOPSEAMETALIZATA">
                <Translate contentKey="hondaStocOnlineApp.stoc.vOPSEAMETALIZATA">V OPSEAMETALIZATA</Translate>
              </span>
            </dt>
            <dd>{stocEntity.vOPSEAMETALIZATA}</dd>
            <dt>
              <span id="cULOAREINTERIOR">
                <Translate contentKey="hondaStocOnlineApp.stoc.cULOAREINTERIOR">C ULOAREINTERIOR</Translate>
              </span>
            </dt>
            <dd>{stocEntity.cULOAREINTERIOR}</dd>
            <dt>
              <span id="oBSERVATII">
                <Translate contentKey="hondaStocOnlineApp.stoc.oBSERVATII">O BSERVATII</Translate>
              </span>
            </dt>
            <dd>{stocEntity.oBSERVATII}</dd>
            <dt>
              <span id="lOCATIE">
                <Translate contentKey="hondaStocOnlineApp.stoc.lOCATIE">L OCATIE</Translate>
              </span>
            </dt>
            <dd>{stocEntity.lOCATIE}</dd>
            <dt>
              <span id="oMOLOGAREIND">
                <Translate contentKey="hondaStocOnlineApp.stoc.oMOLOGAREIND">O MOLOGAREIND</Translate>
              </span>
            </dt>
            <dd>{stocEntity.oMOLOGAREIND}</dd>
            <dt>
              <span id="lUNASOSIREINTARA">
                <Translate contentKey="hondaStocOnlineApp.stoc.lUNASOSIREINTARA">L UNASOSIREINTARA</Translate>
              </span>
            </dt>
            <dd>{stocEntity.lUNASOSIREINTARA}</dd>
            <dt>
              <span id="rEZERVATA">
                <Translate contentKey="hondaStocOnlineApp.stoc.rEZERVATA">R EZERVATA</Translate>
              </span>
            </dt>
            <dd>{stocEntity.rEZERVATA}</dd>
            <dt>
              <span id="dATAEXPIRAREREZ">
                <Translate contentKey="hondaStocOnlineApp.stoc.dATAEXPIRAREREZ">D ATAEXPIRAREREZ</Translate>
              </span>
            </dt>
            <dd>{stocEntity.dATAEXPIRAREREZ}</dd>
            <dt>
              <Translate contentKey="hondaStocOnlineApp.stoc.dealer">Dealer</Translate>
            </dt>
            <dd>{stocEntity.dealer ? stocEntity.dealer.dealerId : ''}</dd>
          </dl>
          <Button tag={Link} to="/stoc" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/stoc/${stocEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ stoc }: IRootState) => ({
  stocEntity: stoc.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StocDetail);
