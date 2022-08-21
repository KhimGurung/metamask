import {
    configureStore,
    combineReducers
  } from '@reduxjs/toolkit';
  import authenticationReducer from "./slices/auth.slice";
  import userReducer from "./slices/user.slice";
  import alertReducer from "./slices/alertMessage.slice";

  
  const combinedReducer = combineReducers({
    authentication: authenticationReducer,
    user: userReducer,
    alert: alertReducer
  });
  
  const rootReducer = (state:any, action:any) => {
    if (action.type === 'authentication/logout') {
      state = undefined;
    }
    return combinedReducer(state, action)
  }
  
  const store = configureStore({
    reducer: rootReducer
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;

  export default store