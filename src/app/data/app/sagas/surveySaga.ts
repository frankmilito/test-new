import { call, put, takeLatest } from "redux-saga/effects";

import { snackbarActions } from "../../snackbar/slice";
import surveyService from "@/app/services/survey-service";
import { surveyActions } from "../slices/surveySlice";
import { router } from "@/app/routes";

export function* createSurvey(action) {
  try {
    const response = yield call(surveyService.createSurvey, action.payload);
    yield put(surveyActions.createSurveySuccess(response));
    router.navigate("/survey");
    yield put(surveyActions.setSuccess());
    yield put(
      snackbarActions.showSnackBar({
        color: "success",
        text: response.message ?? "Survey created",
      })
    );
  } catch (error: any) {
    yield put(surveyActions.setError());
    yield put(
      snackbarActions.showSnackBar({
        color: "error",
        text: error.errorMessage ?? "Something went wrong",
      })
    );
  }
}

export function* getSurvey(action) {
  try {
    const response = yield call(surveyService.getSurvey, action.payload);

    yield put(surveyActions.getSurveySuccess(response));
    yield put(surveyActions.setSuccess());
  } catch (error: any) {
    yield put(surveyActions.setError());
    yield put(
      snackbarActions.showSnackBar({
        color: "error",
        text: error.errorMessage ?? "Something went wrong",
      })
    );
  }
}
export function* getCompany(action) {
  try {
    const response = yield call(surveyService.getCompany, action.payload);
    yield put(surveyActions.getCompanySuccess(response));
    yield put(surveyActions.setSuccess());
  } catch (error: any) {
    yield put(surveyActions.setError());
    yield put(
      snackbarActions.showSnackBar({
        color: "error",
        text: error.errorMessage ?? "Something went wrong",
      })
    );
  }
}

export function* getAllSurvey(action) {
  try {
    const response = yield call(surveyService.getAllSurvey, action.payload);
    yield put(surveyActions.getAllSurveysSuccess(response.data));
    yield put(surveyActions.setSuccess());
  } catch (error: any) {
    yield put(surveyActions.setError());
    yield put(
      snackbarActions.showSnackBar({
        color: "error",
        text: error.errorMessage ?? "Something went wrong",
      })
    );
  }
}

export function* addSurveyQuestion(action) {
  try {
    const response = yield call(
      surveyService.addSurveyQuestion,
      action.payload
    );

    yield put(surveyActions.getSurveySuccess(response));
    yield put(
      snackbarActions.showSnackBar({
        color: "success",
        text: "Question Added",
      })
    );
  } catch (error: any) {
    yield put(surveyActions.setError());
    yield put(
      snackbarActions.showSnackBar({
        color: "error",
        text: error.errorMessage ?? "Something went wrong",
      })
    );
  }
}

export function* reorderSurveyQuestion(action) {
  try {
    const response = yield call(
      surveyService.reorderSurveyQuestion,
      action.payload
    );
    yield call(getSurvey, { payload: response._id });

    yield put(
      snackbarActions.showSnackBar({
        color: "success",
        text: "Question order updated",
      })
    );
    yield put(surveyActions.setSuccess());
  } catch (error: any) {
    yield put(surveyActions.setError());
    yield put(
      snackbarActions.showSnackBar({
        color: "error",
        text: error.errorMessage ?? "Something went wrong",
      })
    );
  }
}

export function* removeSurveyQuestion(action) {
  try {
    const response = yield call(
      surveyService.removeSurveyQuestion,
      action.payload
    );
    yield call(getSurvey, { payload: response._id });

    yield put(
      snackbarActions.showSnackBar({
        color: "success",
        text: "Question removed",
      })
    );
    yield put(surveyActions.setSuccess());
  } catch (error: any) {
    yield put(surveyActions.setError());
    yield put(
      snackbarActions.showSnackBar({
        color: "error",
        text: error.errorMessage ?? "Something went wrong",
      })
    );
  }
}

export function* publishSurvey(action) {
  const { callback, ...rest } = action.payload;
  try {
    const response = yield call(surveyService.publishSurvey, rest);

    yield put(
      snackbarActions.showSnackBar({
        color: "success",
        text: "Survey published",
      })
    );
    callback.open();
    callback.close();
    console.log(response, "publish");
    yield put(surveyActions.setSuccess());
  } catch (error: any) {
    yield put(surveyActions.setError());
    yield put(
      snackbarActions.showSnackBar({
        color: "error",
        text: error.errorMessage ?? "Something went wrong",
      })
    );
  }
}

export function* surveySaga() {
  yield takeLatest(surveyActions.createSurvey, createSurvey);
  yield takeLatest(surveyActions.getSurvey, getSurvey);
  yield takeLatest(surveyActions.getAllSurveys, getAllSurvey);
  yield takeLatest(surveyActions.addSurveyQuestion, addSurveyQuestion);
  yield takeLatest(surveyActions.reorderSurveyQuestion, reorderSurveyQuestion);
  yield takeLatest(surveyActions.removeSurveyQuestion, removeSurveyQuestion);
  yield takeLatest(surveyActions.publishSurvey, publishSurvey);
  yield takeLatest(surveyActions.getCompany, getCompany);
}

export default surveySaga;
