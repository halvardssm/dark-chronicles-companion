import axios from "axios";
import { call, cancel, cancelled, fork, put, take } from "redux-saga/effects";
import {
  AUTH_ACTIONS,
  FLOW_LOGIN,
  FLOW_LOGOUT,
  URL_LOGIN,
} from "../../constants";

export type AuthRequestBody = {
  email: string;
  password: string;
};

export type AuthResponseBody = {
  token: string;
  password: string;
};

export function requestAuthorize(
  email: string,
  password: string,
): Promise<AuthResponseBody> {
  const body: AuthRequestBody = {
    email,
    password,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(URL_LOGIN, {
        data: body,
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}

export function* authorize(email: string, password: string) {
  yield put({ type: AUTH_ACTIONS.START });
  try {
    const { token }: AuthResponseBody = yield call(
      requestAuthorize,
      email,
      password,
    );
    yield put({ type: AUTH_ACTIONS.SUCCESS, email, password, token });
  } catch (error) {
    yield put({ type: AUTH_ACTIONS.FAIL, error });
  } finally {
    if (yield cancelled()) {
      yield put({ type: AUTH_ACTIONS.LOGOUT });
    }
  }
}

export function* loginFlow() {
  while (true) {
    const { email, password } = yield take(FLOW_LOGIN);
    const task = yield fork(authorize, email, password);
    const action = yield take([FLOW_LOGOUT, AUTH_ACTIONS.FAIL]);
    if (action.type === FLOW_LOGOUT) {
      yield cancel(task);
    }
  }
}

export function* logActions() {
  while (true) {
    const action = yield take("*");
    console.log(action.type);
  }
}
