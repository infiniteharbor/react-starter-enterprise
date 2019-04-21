import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middleware = [thunk];

export const mockStore = configureMockStore();
export const mockStoreWithReduxThunk = configureMockStore(middleware);
