import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IExtendedUser, defaultValue } from 'app/shared/model/extended-user.model';

export const ACTION_TYPES = {
  SEARCH_EXTENDEDUSERS: 'extendedUser/SEARCH_EXTENDEDUSERS',
  FETCH_EXTENDEDUSER_LIST: 'extendedUser/FETCH_EXTENDEDUSER_LIST',
  FETCH_EXTENDEDUSER: 'extendedUser/FETCH_EXTENDEDUSER',
  CREATE_EXTENDEDUSER: 'extendedUser/CREATE_EXTENDEDUSER',
  UPDATE_EXTENDEDUSER: 'extendedUser/UPDATE_EXTENDEDUSER',
  DELETE_EXTENDEDUSER: 'extendedUser/DELETE_EXTENDEDUSER',
  RESET: 'extendedUser/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IExtendedUser>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ExtendedUserState = Readonly<typeof initialState>;

// Reducer

export default (state: ExtendedUserState = initialState, action): ExtendedUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_EXTENDEDUSERS):
    case REQUEST(ACTION_TYPES.FETCH_EXTENDEDUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EXTENDEDUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EXTENDEDUSER):
    case REQUEST(ACTION_TYPES.UPDATE_EXTENDEDUSER):
    case REQUEST(ACTION_TYPES.DELETE_EXTENDEDUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_EXTENDEDUSERS):
    case FAILURE(ACTION_TYPES.FETCH_EXTENDEDUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EXTENDEDUSER):
    case FAILURE(ACTION_TYPES.CREATE_EXTENDEDUSER):
    case FAILURE(ACTION_TYPES.UPDATE_EXTENDEDUSER):
    case FAILURE(ACTION_TYPES.DELETE_EXTENDEDUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_EXTENDEDUSERS):
    case SUCCESS(ACTION_TYPES.FETCH_EXTENDEDUSER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXTENDEDUSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EXTENDEDUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_EXTENDEDUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EXTENDEDUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/extended-users';
const apiSearchUrl = 'api/_search/extended-users';

// Actions

export const getSearchEntities: ICrudSearchAction<IExtendedUser> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_EXTENDEDUSERS,
  payload: axios.get<IExtendedUser>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IExtendedUser> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EXTENDEDUSER_LIST,
  payload: axios.get<IExtendedUser>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IExtendedUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EXTENDEDUSER,
    payload: axios.get<IExtendedUser>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IExtendedUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EXTENDEDUSER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IExtendedUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EXTENDEDUSER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IExtendedUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EXTENDEDUSER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
