import { call, put } from 'redux-saga/effects'
import api from '../../../apis/api'
import { login } from '../../../apis/user';
import * as actions from '../actions/index';

export function* loginSaga(action) {
  try {
    const { data } = yield call(login, action.payload)
    yield put(actions.dispatchSignInSuccess(data))
  } catch (e) {
    yield put(actions.dispatchSignInFailure(e))
  }
}

function* signOut() {
  try {
    yield call(api.postData, '/logout')
  } catch (error) {}
}
