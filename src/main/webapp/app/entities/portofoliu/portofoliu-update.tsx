import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDealer } from 'app/shared/model/dealer.model';
import { getEntities as getDealers } from 'app/entities/dealer/dealer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './portofoliu.reducer';
import { IPortofoliu } from 'app/shared/model/portofoliu.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPortofoliuUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPortofoliuUpdateState {
  isNew: boolean;
  dealerId: string;
}

export class PortofoliuUpdate extends React.Component<IPortofoliuUpdateProps, IPortofoliuUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      dealerId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDealers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { portofoliuEntity } = this.props;
      const entity = {
        ...portofoliuEntity,
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
    this.props.history.push('/portofoliu');
  };

  render() {
    const { portofoliuEntity, dealers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="hondaStocOnlineApp.portofoliu.home.createOrEditLabel">
              <Translate contentKey="hondaStocOnlineApp.portofoliu.home.createOrEditLabel">Create or edit a Portofoliu</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : portofoliuEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="portofoliu-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="portofoliu-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="hTROCARNOLabel" for="portofoliu-hTROCARNO">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.hTROCARNO">H TROCARNO</Translate>
                  </Label>
                  <AvField id="portofoliu-hTROCARNO" type="string" className="form-control" name="hTROCARNO" />
                </AvGroup>
                <AvGroup>
                  <Label id="dEALERLabel" for="portofoliu-dEALER">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.dEALER">D EALER</Translate>
                  </Label>
                  <AvField id="portofoliu-dEALER" type="text" name="dEALER" />
                </AvGroup>
                <AvGroup>
                  <Label id="dATAREZSAUFACTURALabel" for="portofoliu-dATAREZSAUFACTURA">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.dATAREZSAUFACTURA">D ATAREZSAUFACTURA</Translate>
                  </Label>
                  <AvField id="portofoliu-dATAREZSAUFACTURA" type="text" name="dATAREZSAUFACTURA" />
                </AvGroup>
                <AvGroup>
                  <Label id="dATAEXPIRARELabel" for="portofoliu-dATAEXPIRARE">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.dATAEXPIRARE">D ATAEXPIRARE</Translate>
                  </Label>
                  <AvField id="portofoliu-dATAEXPIRARE" type="text" name="dATAEXPIRARE" />
                </AvGroup>
                <AvGroup>
                  <Label id="rESDEALERIDLabel" for="portofoliu-rESDEALERID">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.rESDEALERID">R ESDEALERID</Translate>
                  </Label>
                  <AvField id="portofoliu-rESDEALERID" type="string" className="form-control" name="rESDEALERID" />
                </AvGroup>
                <AvGroup>
                  <Label id="tIPLINIELabel" for="portofoliu-tIPLINIE">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.tIPLINIE">T IPLINIE</Translate>
                  </Label>
                  <AvField id="portofoliu-tIPLINIE" type="text" name="tIPLINIE" />
                </AvGroup>
                <AvGroup>
                  <Label id="lOCATIELabel" for="portofoliu-lOCATIE">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.lOCATIE">L OCATIE</Translate>
                  </Label>
                  <AvField id="portofoliu-lOCATIE" type="text" name="lOCATIE" />
                </AvGroup>
                <AvGroup>
                  <Label id="lUNAPRODUCTIELabel" for="portofoliu-lUNAPRODUCTIE">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.lUNAPRODUCTIE">L UNAPRODUCTIE</Translate>
                  </Label>
                  <AvField id="portofoliu-lUNAPRODUCTIE" type="text" name="lUNAPRODUCTIE" />
                </AvGroup>
                <AvGroup>
                  <Label id="lUNASOSIREINTARALabel" for="portofoliu-lUNASOSIREINTARA">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.lUNASOSIREINTARA">L UNASOSIREINTARA</Translate>
                  </Label>
                  <AvField id="portofoliu-lUNASOSIREINTARA" type="text" name="lUNASOSIREINTARA" />
                </AvGroup>
                <AvGroup>
                  <Label id="cODMODELLabel" for="portofoliu-cODMODEL">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.cODMODEL">C ODMODEL</Translate>
                  </Label>
                  <AvField id="portofoliu-cODMODEL" type="text" name="cODMODEL" />
                </AvGroup>
                <AvGroup>
                  <Label id="tIPAUTOVEHICULLabel" for="portofoliu-tIPAUTOVEHICUL">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.tIPAUTOVEHICUL">T IPAUTOVEHICUL</Translate>
                  </Label>
                  <AvField id="portofoliu-tIPAUTOVEHICUL" type="text" name="tIPAUTOVEHICUL" />
                </AvGroup>
                <AvGroup>
                  <Label id="cODCULOAREEXTLabel" for="portofoliu-cODCULOAREEXT">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.cODCULOAREEXT">C ODCULOAREEXT</Translate>
                  </Label>
                  <AvField id="portofoliu-cODCULOAREEXT" type="text" name="cODCULOAREEXT" />
                </AvGroup>
                <AvGroup>
                  <Label id="cULOAREEXTERIORLabel" for="portofoliu-cULOAREEXTERIOR">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.cULOAREEXTERIOR">C ULOAREEXTERIOR</Translate>
                  </Label>
                  <AvField id="portofoliu-cULOAREEXTERIOR" type="text" name="cULOAREEXTERIOR" />
                </AvGroup>
                <AvGroup>
                  <Label id="cULOAREIntegerERIORLabel" for="portofoliu-cULOAREIntegerERIOR">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.cULOAREIntegerERIOR">C ULOARE Integer ERIOR</Translate>
                  </Label>
                  <AvField id="portofoliu-cULOAREIntegerERIOR" type="text" name="cULOAREIntegerERIOR" />
                </AvGroup>
                <AvGroup>
                  <Label id="oBSERVATIILabel" for="portofoliu-oBSERVATII">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.oBSERVATII">O BSERVATII</Translate>
                  </Label>
                  <AvField id="portofoliu-oBSERVATII" type="text" name="oBSERVATII" />
                </AvGroup>
                <AvGroup>
                  <Label id="nUMECLIENTLabel" for="portofoliu-nUMECLIENT">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.nUMECLIENT">N UMECLIENT</Translate>
                  </Label>
                  <AvField id="portofoliu-nUMECLIENT" type="text" name="nUMECLIENT" />
                </AvGroup>
                <AvGroup>
                  <Label id="nUMEVANZATORLabel" for="portofoliu-nUMEVANZATOR">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.nUMEVANZATOR">N UMEVANZATOR</Translate>
                  </Label>
                  <AvField id="portofoliu-nUMEVANZATOR" type="text" name="nUMEVANZATOR" />
                </AvGroup>
                <AvGroup>
                  <Label id="vINLabel" for="portofoliu-vIN">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.vIN">V IN</Translate>
                  </Label>
                  <AvField id="portofoliu-vIN" type="text" name="vIN" />
                </AvGroup>
                <AvGroup>
                  <Label id="eNGINENOLabel" for="portofoliu-eNGINENO">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.eNGINENO">E NGINENO</Translate>
                  </Label>
                  <AvField id="portofoliu-eNGINENO" type="text" name="eNGINENO" />
                </AvGroup>
                <AvGroup>
                  <Label id="aNFABRICATIECFCIVLabel" for="portofoliu-aNFABRICATIECFCIV">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.aNFABRICATIECFCIV">A NFABRICATIECFCIV</Translate>
                  </Label>
                  <AvField id="portofoliu-aNFABRICATIECFCIV" type="string" className="form-control" name="aNFABRICATIECFCIV" />
                </AvGroup>
                <AvGroup>
                  <Label id="oMOLOGAREINDIVIDUALALabel" for="portofoliu-oMOLOGAREINDIVIDUALA">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.oMOLOGAREINDIVIDUALA">O MOLOGAREINDIVIDUALA</Translate>
                  </Label>
                  <AvField id="portofoliu-oMOLOGAREINDIVIDUALA" type="text" name="oMOLOGAREINDIVIDUALA" />
                </AvGroup>
                <AvGroup>
                  <Label id="pRETLISTALabel" for="portofoliu-pRETLISTA">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.pRETLISTA">P RETLISTA</Translate>
                  </Label>
                  <AvField id="portofoliu-pRETLISTA" type="string" className="form-control" name="pRETLISTA" />
                </AvGroup>
                <AvGroup>
                  <Label id="dISCOUNTSTANDARDLabel" for="portofoliu-dISCOUNTSTANDARD">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.dISCOUNTSTANDARD">D ISCOUNTSTANDARD</Translate>
                  </Label>
                  <AvField id="portofoliu-dISCOUNTSTANDARD" type="string" className="form-control" name="dISCOUNTSTANDARD" />
                </AvGroup>
                <AvGroup>
                  <Label id="dISCOUNTSUPLIMENTARLabel" for="portofoliu-dISCOUNTSUPLIMENTAR">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.dISCOUNTSUPLIMENTAR">D ISCOUNTSUPLIMENTAR</Translate>
                  </Label>
                  <AvField id="portofoliu-dISCOUNTSUPLIMENTAR" type="string" className="form-control" name="dISCOUNTSUPLIMENTAR" />
                </AvGroup>
                <AvGroup>
                  <Label id="tRUSALEGISLATIVALabel" for="portofoliu-tRUSALEGISLATIVA">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.tRUSALEGISLATIVA">T RUSALEGISLATIVA</Translate>
                  </Label>
                  <AvField id="portofoliu-tRUSALEGISLATIVA" type="string" className="form-control" name="tRUSALEGISLATIVA" />
                </AvGroup>
                <AvGroup>
                  <Label id="pRETFINALLabel" for="portofoliu-pRETFINAL">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.pRETFINAL">P RETFINAL</Translate>
                  </Label>
                  <AvField id="portofoliu-pRETFINAL" type="string" className="form-control" name="pRETFINAL" />
                </AvGroup>
                <AvGroup>
                  <Label id="aVANSPLATITLabel" for="portofoliu-aVANSPLATIT">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.aVANSPLATIT">A VANSPLATIT</Translate>
                  </Label>
                  <AvField id="portofoliu-aVANSPLATIT" type="string" className="form-control" name="aVANSPLATIT" />
                </AvGroup>
                <AvGroup>
                  <Label id="rESTDEPLATALabel" for="portofoliu-rESTDEPLATA">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.rESTDEPLATA">R ESTDEPLATA</Translate>
                  </Label>
                  <AvField id="portofoliu-rESTDEPLATA" type="string" className="form-control" name="rESTDEPLATA" />
                </AvGroup>
                <AvGroup>
                  <Label id="cUSTOMERTRXIDLabel" for="portofoliu-cUSTOMERTRXID">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.cUSTOMERTRXID">C USTOMERTRXID</Translate>
                  </Label>
                  <AvField id="portofoliu-cUSTOMERTRXID" type="string" className="form-control" name="cUSTOMERTRXID" />
                </AvGroup>
                <AvGroup>
                  <Label id="rEZCUSTIDLabel" for="portofoliu-rEZCUSTID">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.rEZCUSTID">R EZCUSTID</Translate>
                  </Label>
                  <AvField id="portofoliu-rEZCUSTID" type="text" name="rEZCUSTID" />
                </AvGroup>
                <AvGroup>
                  <Label id="sOLDCUSTIDLabel" for="portofoliu-sOLDCUSTID">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.sOLDCUSTID">S OLDCUSTID</Translate>
                  </Label>
                  <AvField id="portofoliu-sOLDCUSTID" type="string" className="form-control" name="sOLDCUSTID" />
                </AvGroup>
                <AvGroup>
                  <Label id="pROFORMALabel" check>
                    <AvInput id="portofoliu-pROFORMA" type="checkbox" className="form-control" name="pROFORMA" />
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.pROFORMA">P ROFORMA</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="tRANSPORTLabel" check>
                    <AvInput id="portofoliu-tRANSPORT" type="checkbox" className="form-control" name="tRANSPORT" />
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.tRANSPORT">T RANSPORT</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="portofoliu-dealer">
                    <Translate contentKey="hondaStocOnlineApp.portofoliu.dealer">Dealer</Translate>
                  </Label>
                  <AvInput id="portofoliu-dealer" type="select" className="form-control" name="dealer.id">
                    <option value="" key="0" />
                    {dealers
                      ? dealers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.dealerId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/portofoliu" replace color="info">
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
  dealers: storeState.dealer.entities,
  portofoliuEntity: storeState.portofoliu.entity,
  loading: storeState.portofoliu.loading,
  updating: storeState.portofoliu.updating,
  updateSuccess: storeState.portofoliu.updateSuccess
});

const mapDispatchToProps = {
  getDealers,
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
)(PortofoliuUpdate);
