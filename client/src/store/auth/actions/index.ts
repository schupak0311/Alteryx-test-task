import { createAction } from 'redux-actions';

export const dispatchSignInRequest = createAction("SIGNIN_REQUEST");
export const dispatchSignInSuccess = createAction("LOGIN_SUCCESS");
export const dispatchSignInFailure = createAction("LOGIN_FAILURE");
