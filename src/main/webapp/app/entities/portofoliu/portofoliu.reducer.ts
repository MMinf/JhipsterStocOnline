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

import { IPortofoliu, defaultValue } from 'app/shared/model/portofoliu.model';

export const ACTION_TYPES = {
  SEARCH_PORTOFOLIUS: 'portofoliu/SEARCH_PORTOFOLIUS',
  FETCH_PORTOFOLIU_LIST: 'portofoliu/FETCH_PORTOFOLIU_LIST',
  FETCH_PORTOFOLIU: 'portofoliu/FETCH_PORTOFOLIU',
  CREATE_PORTOFOLIU: 'portofoliu/CREATE_PORTOFOLIU',
  UPDATE_PORTOFOLIU: 'portofoliu/UPDATE_PORTOFOLIU',
  DELETE_PORTOFOLIU: 'portofoliu/DELETE_PORTOFOLIU',
  RESET: 'portofoliu/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPortofoliu>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PortofoliuState = Readonly<typeof initialState>;

// Reducer

export default (state: PortofoliuState = initialState, action): PortofoliuState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PORTOFOLIUS):
    case REQUEST(ACTION_TYPES.FETCH_PORTOFOLIU_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PORTOFOLIU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PORTOFOLIU):
    case REQUEST(ACTION_TYPES.UPDATE_PORTOFOLIU):
    case REQUEST(ACTION_TYPES.DELETE_PORTOFOLIU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_PORTOFOLIUS):
    case FAILURE(ACTION_TYPES.FETCH_PORTOFOLIU_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PORTOFOLIU):
    case FAILURE(ACTION_TYPES.CREATE_PORTOFOLIU):
    case FAILURE(ACTION_TYPES.UPDATE_PORTOFOLIU):
    case FAILURE(ACTION_TYPES.DELETE_PORTOFOLIU):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PORTOFOLIUS):
    case SUCCESS(ACTION_TYPES.FETCH_PORTOFOLIU_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_PORTOFOLIU):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PORTOFOLIU):
    case SUCCESS(ACTION_TYPES.UPDATE_PORTOFOLIU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PORTOFOLIU):
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

const apiUrl = 'api/portofolius';
const apiSearchUrl = 'api/_search/portofolius';

// Actions

export const getSearchEntities: ICrudSearchAction<IPortofoliu> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_PORTOFOLIUS,
  payload: axios.get<IPortofoliu>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<IPortofoliu> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PORTOFOLIU_LIST,
    payload: axios.get<IPortofoliu>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPortofoliu> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PORTOFOLIU,
    payload: axios.get<IPortofoliu>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPortofoliu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PORTOFOLIU,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IPortofoliu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PORTOFOLIU,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPortofoliu> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PORTOFOLIU,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
