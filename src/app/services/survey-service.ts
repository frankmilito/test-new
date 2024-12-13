import {
  makeDeleteCaller,
  makeGetCaller,
  makePatchCaller,
  makePostCaller,
  makePutCaller,
} from "../utils";

export const endpoints = () => ({
  createSurvey: (payload) => {
    return makePostCaller("/surveys", payload);
  },
  getSurvey: (surveyId: string) => makeGetCaller(`/surveys/${surveyId}`),
  getAllSurvey: (teamId: string) => makeGetCaller(`/surveys?team=${teamId}`),
  reorderSurveyQuestion: (payload) => {
    return makePutCaller(`/surveys/${payload.id}/reorder`, {
      team: payload.team,
      questionsOrder: payload.questionsOrder,
    });
  },

  addSurveyQuestion: (payload) => {
    const { id, ...rest } = payload;
    return makePatchCaller(`/surveys/${payload.id}/questions`, rest);
  },
  removeSurveyQuestion: (payload) =>
    makeDeleteCaller(
      `/surveys/${payload.surveyId}/questions/${payload.questionId}?team=${payload.team}`
    ),
  publishSurvey: (payload) => {
    const { id, ...rest } = payload;
    return makePatchCaller(`/surveys/${payload.id}`, rest);
  },
  getCompany: (teamId: string) => makeGetCaller(`/teams/${teamId}`),
});

export default (function SurveyService() {
  return endpoints();
})();
