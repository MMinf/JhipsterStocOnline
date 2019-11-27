import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, reset } from './portofoliu.reducer';
import { IPortofoliu } from 'app/shared/model/portofoliu.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPortofoliuProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPortofoliuState extends IPaginationBaseState {
  search: string;
}

export class Portofoliu extends React.Component<IPortofoliuProps, IPortofoliuState> {
  state: IPortofoliuState = {
    search: '',
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.updateSuccess) {
      this.reset();
    }
  }

  search = () => {
    if (this.state.search) {
      this.props.reset();
      this.setState({ activePage: 1 }, () => {
        const { activePage, itemsPerPage, sort, order, search } = this.state;
        this.props.getSearchEntities(search, activePage - 1, itemsPerPage, `${sort},${order}`);
      });
    }
  };

  clear = () => {
    this.props.reset();
    this.setState({ search: '', activePage: 1 }, () => {
      this.props.getEntities();
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => {
      this.getEntities();
    });
  };

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
    }
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => {
        this.reset();
      }
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order, search } = this.state;
    if (search) {
      this.props.getSearchEntities(search, activePage - 1, itemsPerPage, `${sort},${order}`);
    } else {
      this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
    }
  };

  render() {
    const { portofoliuList, match } = this.props;
    return (
      <div>
        <h2 id="portofoliu-heading">
          <Translate contentKey="hondaStocOnlineApp.portofoliu.home.title">Portofolius</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hondaStocOnlineApp.portofoliu.home.createLabel">Create a new Portofoliu</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('hondaStocOnlineApp.portofoliu.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage - 1 < this.props.links.next}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            {portofoliuList && portofoliuList.length > 0 ? (
              <Table responsive aria-describedby="portofoliu-heading">
                <thead>
                  <tr>
                    <th className="hand" onClick={this.sort('id')}>
                      <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('hTROCARNO')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.hTROCARNO">H TROCARNO</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('dEALER')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.dEALER">D EALER</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('dATAREZSAUFACTURA')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.dATAREZSAUFACTURA">D ATAREZSAUFACTURA</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('dATAEXPIRARE')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.dATAEXPIRARE">D ATAEXPIRARE</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('rESDEALERID')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.rESDEALERID">R ESDEALERID</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('tIPLINIE')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.tIPLINIE">T IPLINIE</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('lOCATIE')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.lOCATIE">L OCATIE</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('lUNAPRODUCTIE')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.lUNAPRODUCTIE">L UNAPRODUCTIE</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('lUNASOSIREINTARA')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.lUNASOSIREINTARA">L UNASOSIREINTARA</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('cODMODEL')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.cODMODEL">C ODMODEL</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('tIPAUTOVEHICUL')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.tIPAUTOVEHICUL">T IPAUTOVEHICUL</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('cODCULOAREEXT')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.cODCULOAREEXT">C ODCULOAREEXT</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('cULOAREEXTERIOR')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.cULOAREEXTERIOR">C ULOAREEXTERIOR</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('cULOAREIntegerERIOR')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.cULOAREIntegerERIOR">C ULOARE Integer ERIOR</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('oBSERVATII')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.oBSERVATII">O BSERVATII</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('nUMECLIENT')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.nUMECLIENT">N UMECLIENT</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('nUMEVANZATOR')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.nUMEVANZATOR">N UMEVANZATOR</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('vIN')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.vIN">V IN</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('eNGINENO')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.eNGINENO">E NGINENO</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('aNFABRICATIECFCIV')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.aNFABRICATIECFCIV">A NFABRICATIECFCIV</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('oMOLOGAREINDIVIDUALA')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.oMOLOGAREINDIVIDUALA">O MOLOGAREINDIVIDUALA</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('pRETLISTA')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.pRETLISTA">P RETLISTA</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('dISCOUNTSTANDARD')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.dISCOUNTSTANDARD">D ISCOUNTSTANDARD</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('dISCOUNTSUPLIMENTAR')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.dISCOUNTSUPLIMENTAR">D ISCOUNTSUPLIMENTAR</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('tRUSALEGISLATIVA')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.tRUSALEGISLATIVA">T RUSALEGISLATIVA</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('pRETFINAL')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.pRETFINAL">P RETFINAL</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('aVANSPLATIT')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.aVANSPLATIT">A VANSPLATIT</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('rESTDEPLATA')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.rESTDEPLATA">R ESTDEPLATA</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('cUSTOMERTRXID')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.cUSTOMERTRXID">C USTOMERTRXID</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('rEZCUSTID')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.rEZCUSTID">R EZCUSTID</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('sOLDCUSTID')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.sOLDCUSTID">S OLDCUSTID</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('pROFORMA')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.pROFORMA">P ROFORMA</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('tRANSPORT')}>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.tRANSPORT">T RANSPORT</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="hondaStocOnlineApp.portofoliu.dealer">Dealer</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {portofoliuList.map((portofoliu, i) => (
                    <tr key={`entity-${i}`}>
                      <td>
                        <Button tag={Link} to={`${match.url}/${portofoliu.id}`} color="link" size="sm">
                          {portofoliu.id}
                        </Button>
                      </td>
                      <td>{portofoliu.hTROCARNO}</td>
                      <td>{portofoliu.dEALER}</td>
                      <td>{portofoliu.dATAREZSAUFACTURA}</td>
                      <td>{portofoliu.dATAEXPIRARE}</td>
                      <td>{portofoliu.rESDEALERID}</td>
                      <td>{portofoliu.tIPLINIE}</td>
                      <td>{portofoliu.lOCATIE}</td>
                      <td>{portofoliu.lUNAPRODUCTIE}</td>
                      <td>{portofoliu.lUNASOSIREINTARA}</td>
                      <td>{portofoliu.cODMODEL}</td>
                      <td>{portofoliu.tIPAUTOVEHICUL}</td>
                      <td>{portofoliu.cODCULOAREEXT}</td>
                      <td>{portofoliu.cULOAREEXTERIOR}</td>
                      <td>{portofoliu.cULOAREIntegerERIOR}</td>
                      <td>{portofoliu.oBSERVATII}</td>
                      <td>{portofoliu.nUMECLIENT}</td>
                      <td>{portofoliu.nUMEVANZATOR}</td>
                      <td>{portofoliu.vIN}</td>
                      <td>{portofoliu.eNGINENO}</td>
                      <td>{portofoliu.aNFABRICATIECFCIV}</td>
                      <td>{portofoliu.oMOLOGAREINDIVIDUALA}</td>
                      <td>{portofoliu.pRETLISTA}</td>
                      <td>{portofoliu.dISCOUNTSTANDARD}</td>
                      <td>{portofoliu.dISCOUNTSUPLIMENTAR}</td>
                      <td>{portofoliu.tRUSALEGISLATIVA}</td>
                      <td>{portofoliu.pRETFINAL}</td>
                      <td>{portofoliu.aVANSPLATIT}</td>
                      <td>{portofoliu.rESTDEPLATA}</td>
                      <td>{portofoliu.cUSTOMERTRXID}</td>
                      <td>{portofoliu.rEZCUSTID}</td>
                      <td>{portofoliu.sOLDCUSTID}</td>
                      <td>{portofoliu.pROFORMA ? 'true' : 'false'}</td>
                      <td>{portofoliu.tRANSPORT ? 'true' : 'false'}</td>
                      <td>{portofoliu.dealer ? <Link to={`dealer/${portofoliu.dealer.id}`}>{portofoliu.dealer.dealerId}</Link> : ''}</td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${portofoliu.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${portofoliu.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${portofoliu.id}/delete`} color="danger" size="sm">
                            <FontAwesomeIcon icon="trash" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.delete">Delete</Translate>
                            </span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="alert alert-warning">
                <Translate contentKey="hondaStocOnlineApp.portofoliu.home.notFound">No Portofolius found</Translate>
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ portofoliu }: IRootState) => ({
  portofoliuList: portofoliu.entities,
  totalItems: portofoliu.totalItems,
  links: portofoliu.links,
  entity: portofoliu.entity,
  updateSuccess: portofoliu.updateSuccess
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portofoliu);
