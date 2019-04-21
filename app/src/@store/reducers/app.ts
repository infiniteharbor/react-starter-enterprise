import { AppState, SET_CONFIG } from '~@store/constants/app';

export const initialState: AppState = {
  config: {
    name: '',
    version: ''
  }
};

const appReducer = ( state: AppState = initialState, action ) => {

  if (action.type === SET_CONFIG ) {
    const config = { ...state.config };
    config.name = action.payload.name;
    config.version = action.payload.version;
    return {
      ...state,
      config
    };
  } else {
    return state;
  }

};

export default appReducer;
