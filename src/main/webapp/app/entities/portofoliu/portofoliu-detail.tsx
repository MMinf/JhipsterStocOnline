import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './portofoliu.reducer';
import { IPortofoliu } from 'app/shared/model/portofoliu.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPortofoliuDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PortofoliuDetail extends React.Component<IPortofoliuDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { portofoliuEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="hondaStocOnlineApp.portofoliu.detail.title">Portofoliu</Translate> [<b>{portofoliuEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="hTROCARNO">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.hTROCARNO">H TROCARNO</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.hTROCARNO}</dd>
            <dt>
              <span id="dEALER">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.dEALER">D EALER</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.dEALER}</dd>
            <dt>
              <span id="dATAREZSAUFACTURA">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.dATAREZSAUFACTURA">D ATAREZSAUFACTURA</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.dATAREZSAUFACTURA}</dd>
            <dt>
              <span id="dATAEXPIRARE">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.dATAEXPIRARE">D ATAEXPIRARE</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.dATAEXPIRARE}</dd>
            <dt>
              <span id="rESDEALERID">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.rESDEALERID">R ESDEALERID</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.rESDEALERID}</dd>
            <dt>
              <span id="tIPLINIE">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.tIPLINIE">T IPLINIE</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.tIPLINIE}</dd>
            <dt>
              <span id="lOCATIE">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.lOCATIE">L OCATIE</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.lOCATIE}</dd>
            <dt>
              <span id="lUNAPRODUCTIE">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.lUNAPRODUCTIE">L UNAPRODUCTIE</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.lUNAPRODUCTIE}</dd>
            <dt>
              <span id="lUNASOSIREINTARA">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.lUNASOSIREINTARA">L UNASOSIREINTARA</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.lUNASOSIREINTARA}</dd>
            <dt>
              <span id="cODMODEL">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.cODMODEL">C ODMODEL</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.cODMODEL}</dd>
            <dt>
              <span id="tIPAUTOVEHICUL">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.tIPAUTOVEHICUL">T IPAUTOVEHICUL</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.tIPAUTOVEHICUL}</dd>
            <dt>
              <span id="cODCULOAREEXT">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.cODCULOAREEXT">C ODCULOAREEXT</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.cODCULOAREEXT}</dd>
            <dt>
              <span id="cULOAREEXTERIOR">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.cULOAREEXTERIOR">C ULOAREEXTERIOR</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.cULOAREEXTERIOR}</dd>
            <dt>
              <span id="cULOAREIntegerERIOR">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.cULOAREIntegerERIOR">C ULOARE Integer ERIOR</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.cULOAREIntegerERIOR}</dd>
            <dt>
              <span id="oBSERVATII">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.oBSERVATII">O BSERVATII</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.oBSERVATII}</dd>
            <dt>
              <span id="nUMECLIENT">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.nUMECLIENT">N UMECLIENT</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.nUMECLIENT}</dd>
            <dt>
              <span id="nUMEVANZATOR">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.nUMEVANZATOR">N UMEVANZATOR</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.nUMEVANZATOR}</dd>
            <dt>
              <span id="vIN">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.vIN">V IN</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.vIN}</dd>
            <dt>
              <span id="eNGINENO">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.eNGINENO">E NGINENO</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.eNGINENO}</dd>
            <dt>
              <span id="aNFABRICATIECFCIV">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.aNFABRICATIECFCIV">A NFABRICATIECFCIV</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.aNFABRICATIECFCIV}</dd>
            <dt>
              <span id="oMOLOGAREINDIVIDUALA">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.oMOLOGAREINDIVIDUALA">O MOLOGAREINDIVIDUALA</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.oMOLOGAREINDIVIDUALA}</dd>
            <dt>
              <span id="pRETLISTA">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.pRETLISTA">P RETLISTA</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.pRETLISTA}</dd>
            <dt>
              <span id="dISCOUNTSTANDARD">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.dISCOUNTSTANDARD">D ISCOUNTSTANDARD</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.dISCOUNTSTANDARD}</dd>
            <dt>
              <span id="dISCOUNTSUPLIMENTAR">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.dISCOUNTSUPLIMENTAR">D ISCOUNTSUPLIMENTAR</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.dISCOUNTSUPLIMENTAR}</dd>
            <dt>
              <span id="tRUSALEGISLATIVA">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.tRUSALEGISLATIVA">T RUSALEGISLATIVA</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.tRUSALEGISLATIVA}</dd>
            <dt>
              <span id="pRETFINAL">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.pRETFINAL">P RETFINAL</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.pRETFINAL}</dd>
            <dt>
              <span id="aVANSPLATIT">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.aVANSPLATIT">A VANSPLATIT</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.aVANSPLATIT}</dd>
            <dt>
              <span id="rESTDEPLATA">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.rESTDEPLATA">R ESTDEPLATA</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.rESTDEPLATA}</dd>
            <dt>
              <span id="cUSTOMERTRXID">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.cUSTOMERTRXID">C USTOMERTRXID</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.cUSTOMERTRXID}</dd>
            <dt>
              <span id="rEZCUSTID">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.rEZCUSTID">R EZCUSTID</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.rEZCUSTID}</dd>
            <dt>
              <span id="sOLDCUSTID">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.sOLDCUSTID">S OLDCUSTID</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.sOLDCUSTID}</dd>
            <dt>
              <span id="pROFORMA">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.pROFORMA">P ROFORMA</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.pROFORMA ? 'true' : 'false'}</dd>
            <dt>
              <span id="tRANSPORT">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.tRANSPORT">T RANSPORT</Translate>
              </span>
            </dt>
            <dd>{portofoliuEntity.tRANSPORT ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="hondaStocOnlineApp.portofoliu.dealer">Dealer</Translate>
            </dt>
            <dd>{portofoliuEntity.dealer ? portofoliuEntity.dealer.dealerId : ''}</dd>
          </dl>
          <Button tag={Link} to="/portofoliu" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/portofoliu/${portofoliuEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ portofoliu }: IRootState) => ({
  portofoliuEntity: portofoliu.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortofoliuDetail);
