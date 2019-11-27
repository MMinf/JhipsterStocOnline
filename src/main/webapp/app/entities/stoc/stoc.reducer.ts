import axios from 'axios';
import {
  ICrudSearchAction,
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStoc, defaultValue } from 'app/shared/model/stoc.model';

export const ACTION_TYPES = {
  SEARCH_STOCS: 'stoc/SEARCH_STOCS',
  FETCH_STOC_LIST: 'stoc/FETCH_STOC_LIST',
  FETCH_STOC: 'stoc/FETCH_STOC',
  CREATE_STOC: 'stoc/CREATE_STOC',
  UPDATE_STOC: 'stoc/UPDATE_STOC',
  DELETE_STOC: 'stoc/DELETE_STOC',
  RESET: 'stoc/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStoc>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type StocState = Readonly<typeof initialState>;

// Reducer

export default (state: StocState = initialState, action): StocState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_STOCS):
    case REQUEST(ACTION_TYPES.FETCH_STOC_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STOC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STOC):
    case REQUEST(ACTION_TYPES.UPDATE_STOC):
    case REQUEST(ACTION_TYPES.DELETE_STOC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_STOCS):
    case FAILURE(ACTION_TYPES.FETCH_STOC_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STOC):
    case FAILURE(ACTION_TYPES.CREATE_STOC):
    case FAILURE(ACTION_TYPES.UPDATE_STOC):
    case FAILURE(ACTION_TYPES.DELETE_STOC):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_STOCS):
    case SUCCESS(ACTION_TYPES.FETCH_STOC_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_STOC):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STOC):
    case SUCCESS(ACTION_TYPES.UPDATE_STOC):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STOC):
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

const apiUrl = 'api/stocs';
const apiSearchUrl = 'api/_search/stocs';

// Actions

export const getSearchEntities: ICrudSearchAction<IStoc> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_STOCS,
  payload: axios.get<IStoc>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<IStoc> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_STOC_LIST,
    payload: axios.get<IStoc>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IStoc> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STOC,
    payload: axios.get<IStoc>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStoc> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STOC,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IStoc> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STOC,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStoc> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STOC,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
