import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './extended-user.reducer';
import { IExtendedUser } from 'app/shared/model/extended-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExtendedUserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IExtendedUserState {
  search: string;
}

export class ExtendedUser extends React.Component<IExtendedUserProps, IExtendedUserState> {
  state: IExtendedUserState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.setState({ search: '' }, () => {
      this.props.getEntities();
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { extendedUserList, match } = this.props;
    return (
      <div>
        <h2 id="extended-user-heading">
          <Translate contentKey="hondaStocOnlineApp.extendedUser.home.title">Extended Users</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hondaStocOnlineApp.extendedUser.home.createLabel">Create a new Extended User</Translate>
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
                    placeholder={translate('hondaStocOnlineApp.extendedUser.home.search')}
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
          {extendedUserList && extendedUserList.length > 0 ? (
            <Table responsive aria-describedby="extended-user-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hondaStocOnlineApp.extendedUser.birthday">Birthday</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hondaStocOnlineApp.extendedUser.gender">Gender</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hondaStocOnlineApp.extendedUser.mobileNo">Mobile No</Translate>
                  </th>
                  <th>
                    <Translate contentKey="hondaStocOnlineApp.extendedUser.user">User</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {extendedUserList.map((extendedUser, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${extendedUser.id}`} color="link" size="sm">
                        {extendedUser.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={extendedUser.birthday} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{extendedUser.gender}</td>
                    <td>{extendedUser.mobileNo}</td>
                    <td>{extendedUser.user ? extendedUser.user.id : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${extendedUser.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${extendedUser.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${extendedUser.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="hondaStocOnlineApp.extendedUser.home.notFound">No Extended Users found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ extendedUser }: IRootState) => ({
  extendedUserList: extendedUser.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtendedUser);
