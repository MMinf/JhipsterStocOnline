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
import { getEntity, updateEntity, createEntity, reset } from './stoc.reducer';
import { IStoc } from 'app/shared/model/stoc.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStocUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IStocUpdateState {
  isNew: boolean;
  dealerId: string;
}

export class StocUpdate extends React.Component<IStocUpdateProps, IStocUpdateState> {
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
      const { stocEntity } = this.props;
      const entity = {
        ...stocEntity,
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
    this.props.history.push('/stoc');
  };

  render() {
    const { stocEntity, dealers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="hondaStocOnlineApp.stoc.home.createOrEditLabel">
              <Translate contentKey="hondaStocOnlineApp.stoc.home.createOrEditLabel">Create or edit a Stoc</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : stocEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="stoc-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="stoc-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="hTROCARNOLabel" for="stoc-hTROCARNO">
                    <Translate contentKey="hondaStocOnlineApp.stoc.hTROCARNO">H TROCARNO</Translate>
                  </Label>
                  <AvField id="stoc-hTROCARNO" type="string" className="form-control" name="hTROCARNO" />
                </AvGroup>
                <AvGroup>
                  <Label id="rESDEALERIDLabel" for="stoc-rESDEALERID">
                    <Translate contentKey="hondaStocOnlineApp.stoc.rESDEALERID">R ESDEALERID</Translate>
                  </Label>
                  <AvField id="stoc-rESDEALERID" type="string" className="form-control" name="rESDEALERID" />
                </AvGroup>
                <AvGroup>
                  <Label id="aNFABRICATIECIVLabel" for="stoc-aNFABRICATIECIV">
                    <Translate contentKey="hondaStocOnlineApp.stoc.aNFABRICATIECIV">A NFABRICATIECIV</Translate>
                  </Label>
                  <AvField id="stoc-aNFABRICATIECIV" type="string" className="form-control" name="aNFABRICATIECIV" />
                </AvGroup>
                <AvGroup>
                  <Label id="tIPAUTOVEHICULLabel" for="stoc-tIPAUTOVEHICUL">
                    <Translate contentKey="hondaStocOnlineApp.stoc.tIPAUTOVEHICUL">T IPAUTOVEHICUL</Translate>
                  </Label>
                  <AvField id="stoc-tIPAUTOVEHICUL" type="text" name="tIPAUTOVEHICUL" />
                </AvGroup>
                <AvGroup>
                  <Label id="cODCULOAREEXTERIORLabel" for="stoc-cODCULOAREEXTERIOR">
                    <Translate contentKey="hondaStocOnlineApp.stoc.cODCULOAREEXTERIOR">C ODCULOAREEXTERIOR</Translate>
                  </Label>
                  <AvField id="stoc-cODCULOAREEXTERIOR" type="text" name="cODCULOAREEXTERIOR" />
                </AvGroup>
                <AvGroup>
                  <Label id="dESCCULOAREEXTERIORLabel" for="stoc-dESCCULOAREEXTERIOR">
                    <Translate contentKey="hondaStocOnlineApp.stoc.dESCCULOAREEXTERIOR">D ESCCULOAREEXTERIOR</Translate>
                  </Label>
                  <AvField id="stoc-dESCCULOAREEXTERIOR" type="text" name="dESCCULOAREEXTERIOR" />
                </AvGroup>
                <AvGroup>
                  <Label id="vOPSEAMETALIZATALabel" for="stoc-vOPSEAMETALIZATA">
                    <Translate contentKey="hondaStocOnlineApp.stoc.vOPSEAMETALIZATA">V OPSEAMETALIZATA</Translate>
                  </Label>
                  <AvField id="stoc-vOPSEAMETALIZATA" type="text" name="vOPSEAMETALIZATA" />
                </AvGroup>
                <AvGroup>
                  <Label id="cULOAREINTERIORLabel" for="stoc-cULOAREINTERIOR">
                    <Translate contentKey="hondaStocOnlineApp.stoc.cULOAREINTERIOR">C ULOAREINTERIOR</Translate>
                  </Label>
                  <AvField id="stoc-cULOAREINTERIOR" type="text" name="cULOAREINTERIOR" />
                </AvGroup>
                <AvGroup>
                  <Label id="oBSERVATIILabel" for="stoc-oBSERVATII">
                    <Translate contentKey="hondaStocOnlineApp.stoc.oBSERVATII">O BSERVATII</Translate>
                  </Label>
                  <AvField id="stoc-oBSERVATII" type="text" name="oBSERVATII" />
                </AvGroup>
                <AvGroup>
                  <Label id="lOCATIELabel" for="stoc-lOCATIE">
                    <Translate contentKey="hondaStocOnlineApp.stoc.lOCATIE">L OCATIE</Translate>
                  </Label>
                  <AvField id="stoc-lOCATIE" type="text" name="lOCATIE" />
                </AvGroup>
                <AvGroup>
                  <Label id="oMOLOGAREINDLabel" for="stoc-oMOLOGAREIND">
                    <Translate contentKey="hondaStocOnlineApp.stoc.oMOLOGAREIND">O MOLOGAREIND</Translate>
                  </Label>
                  <AvField id="stoc-oMOLOGAREIND" type="text" name="oMOLOGAREIND" />
                </AvGroup>
                <AvGroup>
                  <Label id="lUNASOSIREINTARALabel" for="stoc-lUNASOSIREINTARA">
                    <Translate contentKey="hondaStocOnlineApp.stoc.lUNASOSIREINTARA">L UNASOSIREINTARA</Translate>
                  </Label>
                  <AvField id="stoc-lUNASOSIREINTARA" type="text" name="lUNASOSIREINTARA" />
                </AvGroup>
                <AvGroup>
                  <Label id="rEZERVATALabel" for="stoc-rEZERVATA">
                    <Translate contentKey="hondaStocOnlineApp.stoc.rEZERVATA">R EZERVATA</Translate>
                  </Label>
                  <AvField id="stoc-rEZERVATA" type="text" name="rEZERVATA" />
                </AvGroup>
                <AvGroup>
                  <Label id="dATAEXPIRAREREZLabel" for="stoc-dATAEXPIRAREREZ">
                    <Translate contentKey="hondaStocOnlineApp.stoc.dATAEXPIRAREREZ">D ATAEXPIRAREREZ</Translate>
                  </Label>
                  <AvField id="stoc-dATAEXPIRAREREZ" type="text" name="dATAEXPIRAREREZ" />
                </AvGroup>
                <AvGroup>
                  <Label for="stoc-dealer">
                    <Translate contentKey="hondaStocOnlineApp.stoc.dealer">Dealer</Translate>
                  </Label>
                  <AvInput id="stoc-dealer" type="select" className="form-control" name="dealer.id">
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
                <Button tag={Link} id="cancel-save" to="/stoc" replace color="info">
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
  stocEntity: storeState.stoc.entity,
  loading: storeState.stoc.loading,
  updating: storeState.stoc.updating,
  updateSuccess: storeState.stoc.updateSuccess
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
)(StocUpdate);
