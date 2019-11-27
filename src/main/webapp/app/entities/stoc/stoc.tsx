import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, reset } from './stoc.reducer';
import { IStoc } from 'app/shared/model/stoc.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IStocProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IStocState extends IPaginationBaseState {
  search: string;
}

export class Stoc extends React.Component<IStocProps, IStocState> {
  state: IStocState = {
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
    const { stocList, match } = this.props;
    return (
      <div>
        <h2 id="stoc-heading">
          <Translate contentKey="hondaStocOnlineApp.stoc.home.title">Stocs</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hondaStocOnlineApp.stoc.home.createLabel">Create a new Stoc</Translate>
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
                    placeholder={translate('hondaStocOnlineApp.stoc.home.search')}
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
            {stocList && stocList.length > 0 ? (
              <Table responsive aria-describedby="stoc-heading">
                <thead>
                  <tr>
                    <th className="hand" onClick={this.sort('id')}>
                      <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('hTROCARNO')}>
                      <Translate contentKey="hondaStocOnlineApp.stoc.hTROCARNO">H TROCARNO</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('rESDEALERID')}>
                      <Translate contentKey="hondaStocOnlineApp.stoc.rESDEALERID">R ESDEALERID</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('aNFABRICATIECIV')}>
                      <Translate contentKey="hondaStocOnlineApp.stoc.aNFABRICATIECIV">A NFABRICATIECIV</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('tIPAUTOVEHICUL')}>
                      <Translate contentKey="hondaStocOnlineApp.stoc.tIPAUTOVEHICUL">T IPAUTOVEHICUL</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('cODCULOAREEXTERIOR')}>
                      <Translate contentKey="hondaStocOnlineApp.stoc.cODCULOAREEXTERIOR">C ODCULOAREEXTERIOR</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('dESCCULOAREEXTERIOR')}>
                      <Translate contentKey="hondaStocOnlineApp.stoc.dESCCULOAREEXTERIOR">D ESCCULOAREEXTERIOR</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('vOPSEAMETALIZATA')}>
                      <Translate contentKey="hondaStocOnlineApp.stoc.vOPSEAMETALIZATA">V OPSEAMETALIZATA</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('cULOAREINTERIOR')}>
                      <Translate contentKey="hondaStocOnlineApp.stoc.cULOAREINTERIOR">C ULOAREINTERIOR</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('oBSERVATII')}>
                      <Translate contentKey="hondaStocOnlineApp.stoc.oBSERVATII">O BSERVATII</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('lOCATIE')}>
                      <Translate contentKey="hondaStocOnlineApp.stoc.lOCATIE">L OCATIE</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('oMOLOGAREIND')}>
                      <Translate contentKey="hondaStocOnlineApp.stoc.oMOLOGAREIND">O MOLOGAREIND</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('lUNASOSIREINTARA')}>
                      <Translate contentKey="hondaStocOnlineApp.stoc.lUNASOSIREINTARA">L UNASOSIREINTARA</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('rEZERVATA')}>
                      <Translate contentKey="hondaStocOnlineApp.stoc.rEZERVATA">R EZERVATA</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('dATAEXPIRAREREZ')}>
                      <Translate contentKey="hondaStocOnlineApp.stoc.dATAEXPIRAREREZ">D ATAEXPIRAREREZ</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="hondaStocOnlineApp.stoc.dealer">Dealer</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {stocList.map((stoc, i) => (
                    <tr key={`entity-${i}`}>
                      <td>
                        <Button tag={Link} to={`${match.url}/${stoc.id}`} color="link" size="sm">
                          {stoc.id}
                        </Button>
                      </td>
                      <td>{stoc.hTROCARNO}</td>
                      <td>{stoc.rESDEALERID}</td>
                      <td>{stoc.aNFABRICATIECIV}</td>
                      <td>{stoc.tIPAUTOVEHICUL}</td>
                      <td>{stoc.cODCULOAREEXTERIOR}</td>
                      <td>{stoc.dESCCULOAREEXTERIOR}</td>
                      <td>{stoc.vOPSEAMETALIZATA}</td>
                      <td>{stoc.cULOAREINTERIOR}</td>
                      <td>{stoc.oBSERVATII}</td>
                      <td>{stoc.lOCATIE}</td>
                      <td>{stoc.oMOLOGAREIND}</td>
                      <td>{stoc.lUNASOSIREINTARA}</td>
                      <td>{stoc.rEZERVATA}</td>
                      <td>{stoc.dATAEXPIRAREREZ}</td>
                      <td>{stoc.dealer ? <Link to={`dealer/${stoc.dealer.id}`}>{stoc.dealer.dealerId}</Link> : ''}</td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${stoc.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${stoc.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${stoc.id}/delete`} color="danger" size="sm">
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
                <Translate contentKey="hondaStocOnlineApp.stoc.home.notFound">No Stocs found</Translate>
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ stoc }: IRootState) => ({
  stocList: stoc.entities,
  totalItems: stoc.totalItems,
  links: stoc.links,
  entity: stoc.entity,
  updateSuccess: stoc.updateSuccess
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
)(Stoc);
