import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INotifiTemplate, defaultValue } from 'app/shared/model/notifi-template.model';

export const ACTION_TYPES = {
  SEARCH_NOTIFITEMPLATES: 'notifiTemplate/SEARCH_NOTIFITEMPLATES',
  FETCH_NOTIFITEMPLATE_LIST: 'notifiTemplate/FETCH_NOTIFITEMPLATE_LIST',
  FETCH_NOTIFITEMPLATE: 'notifiTemplate/FETCH_NOTIFITEMPLATE',
  CREATE_NOTIFITEMPLATE: 'notifiTemplate/CREATE_NOTIFITEMPLATE',
  UPDATE_NOTIFITEMPLATE: 'notifiTemplate/UPDATE_NOTIFITEMPLATE',
  DELETE_NOTIFITEMPLATE: 'notifiTemplate/DELETE_NOTIFITEMPLATE',
  RESET: 'notifiTemplate/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INotifiTemplate>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type NotifiTemplateState = Readonly<typeof initialState>;

// Reducer

export default (state: NotifiTemplateState = initialState, action): NotifiTemplateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_NOTIFITEMPLATES):
    case REQUEST(ACTION_TYPES.FETCH_NOTIFITEMPLATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOTIFITEMPLATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NOTIFITEMPLATE):
    case REQUEST(ACTION_TYPES.UPDATE_NOTIFITEMPLATE):
    case REQUEST(ACTION_TYPES.DELETE_NOTIFITEMPLATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_NOTIFITEMPLATES):
    case FAILURE(ACTION_TYPES.FETCH_NOTIFITEMPLATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOTIFITEMPLATE):
    case FAILURE(ACTION_TYPES.CREATE_NOTIFITEMPLATE):
    case FAILURE(ACTION_TYPES.UPDATE_NOTIFITEMPLATE):
    case FAILURE(ACTION_TYPES.DELETE_NOTIFITEMPLATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_NOTIFITEMPLATES):
    case SUCCESS(ACTION_TYPES.FETCH_NOTIFITEMPLATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTIFITEMPLATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOTIFITEMPLATE):
    case SUCCESS(ACTION_TYPES.UPDATE_NOTIFITEMPLATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOTIFITEMPLATE):
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

const apiUrl = 'api/notifi-templates';
const apiSearchUrl = 'api/_search/notifi-templates';

// Actions

export const getSearchEntities: ICrudSearchAction<INotifiTemplate> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_NOTIFITEMPLATES,
  payload: axios.get<INotifiTemplate>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<INotifiTemplate> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NOTIFITEMPLATE_LIST,
  payload: axios.get<INotifiTemplate>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<INotifiTemplate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOTIFITEMPLATE,
    payload: axios.get<INotifiTemplate>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INotifiTemplate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOTIFITEMPLATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INotifiTemplate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOTIFITEMPLATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INotifiTemplate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOTIFITEMPLATE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
