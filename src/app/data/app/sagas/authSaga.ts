import authService from "@/app/services/auth-service";
import { snackbarActions } from "../../snackbar/slice";
import { call, put, takeLatest } from "redux-saga/effects";
import { router } from "@/app/routes";
import { getUserProfile } from "./userSaga";
import { appActions } from "../slices/slice";

export function* requestOtp(action) {
  try {
    const response = yield call(authService.requestOtp, action.payload);
    yield put(
      snackbarActions.showSnackBar({
        color: "success",
        text: response.message,
      })
    );
    yield put(appActions.setSuccess());
    router.navigate(`/verify-email?ref=${action.payload.purpose}`);
  } catch (error: any) {
    yield put(appActions.setError());
    yield put(
      snackbarActions.showSnackBar({
        color: "error",
        text: error.errorMessage ?? "Something went wrong",
      })
    );
  }
}

export function* signupRequest(action) {
  try {
    const response = yield call(authService.signup, action.payload);
    yield put(appActions.setToken(response));
    // router.navigate("/onboarding?step=1");
    yield put(appActions.setSuccess());
  } catch (error: any) {
    yield put(appActions.setError());
    yield put(
      snackbarActions.showSnackBar({
        color: "error",
        text: error.errorMessage ?? "Something went wrong",
      })
    );
  }
}

export function* login(action) {
  try {
    const response = yield call(authService.login, action.payload);
    yield put(appActions.setToken(response));
    // yield call(getUserProfile);
    yield put(appActions.setSuccess());
    router.navigate("/dashboard");
  } catch (error: any) {
    yield put(appActions.setError());
    yield put(
      snackbarActions.showSnackBar({
        color: "error",
        text: error.errorMessage ?? "Something went wrong",
      })
    );
  }
}

export function* authSaga() {
  yield takeLatest(appActions.requestOtp, requestOtp);
  yield takeLatest(appActions.signup, signupRequest);
  yield takeLatest(appActions.login, login);
}

export default authSaga;
