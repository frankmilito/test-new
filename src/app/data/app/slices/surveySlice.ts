import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { store } from "../../../../store/configureStore";
import { FilterFormValues } from "@/app/components/modal/FilterModal";
import { Survey } from "@/types/survey";

export interface AppState {
  error: boolean;
  loading: boolean;
  filters: FilterFormValues;
  currentSurvey: Survey;
  surveys: Survey[];
  company: Record<string, any>;
}

const initFilterState = {
  ageRange: "",
  gender: "",
  country: "",
  language: "",
  purchaseFrequency: "",
  categories: "",
  emailEngagement: "",
  averageValue: "",
  responseHistory: "",
};

const initSurveyState = {
  _id: "",
  team: "",
  title: "",
  description: "",
  targetAudience: "",
  questions: [],
  isActive: false,
  isArchived: false,
  createdAt: "",
  updatedAt: "",
};

export const initialState: AppState | undefined = {
  error: false,
  loading: false,
  filters: initFilterState,
  currentSurvey: initSurveyState,
  surveys: [],
  company: {},
};

const slice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    initAction: (state) => {
      state.loading = true;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    createSurvey: (state, action) => {
      state.loading = true;
    },
    createSurveySuccess: (state, action) => {
      state.loading = false;
      state.currentSurvey = action.payload;
    },
    getSurvey: (state, action) => {
      state.loading = true;
    },
    getCompany: (state, action) => {
      state.loading = true;
    },
    getCompanySuccess: (state, action) => {
      state.loading = true;
      state.company = action.payload;
    },
    getSurveySuccess: (state, action) => {
      state.loading = false;
      state.currentSurvey = action.payload;
    },
    getAllSurveys: (state, action) => {
      state.loading = true;
    },
    getAllSurveysSuccess: (state, action) => {
      state.loading = false;
      state.surveys = action.payload;
    },
    addSurveyQuestion: (state) => {
      state.loading = true;
    },
    reorderSurveyQuestion: (state, action) => {
      state.loading = true;
    },
    removeSurveyQuestion: (state, action) => {
      state.loading = true;
    },
    publishSurvey: (state, action) => {
      state.loading = true;
    },
    setError: (state) => {
      state.error = true;
      state.loading = false;
    },
    setSuccess: (state) => {
      state.loading = false;
    },
  },
  selectors: {
    isLoading: (state) => state.loading,
    getFilters: (state) => state.filters,
    getCurrentSurvey: (state) => state.currentSurvey,
    getCompany: (state) => state.company,
    getAllSurvey: (state) => state.surveys,
    clearFilters: (state) => (state.filters = initFilterState),
  },
});

export const {
  actions: surveyActions,
  reducer: surveyReducer,
  selectors: surveySelector,
} = slice;

export const useSurveySlice = () => {
  store.injectReducer(slice.name, slice.reducer);
  return { actions: slice.actions };
};
export default slice;
