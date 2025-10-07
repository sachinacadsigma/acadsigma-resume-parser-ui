import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MatchResult {
  candidate_name: string;
  match_score: number;
  semantic_score: number;
  fit_label: number;
  matched_skills: string[];
  missing_skills: string[];
  missing_preferred: string[];
  missing_required_skills: string[];
  must_have_skills: string[];
  matched_must_have_skills: string[];
  preferred_skills: string[];
  matched_preferred_skills: string[];
  qualifications: string[][];
  experience_years: string;
  qualification_matched: boolean;
  risk_factors: string[];
  short_summary: string;
  summary: string;
  resume_file_name: string;
  github_summary?: any;
  file_name?: string;
  url?: string;
  email: string;
  contact_no: string;
  one_liner: string[];
  experience_fit: string;
  education_fit: string;
  certifications_fit: string;
  missing_must_have_skills: string[];
  missing_preferred_skills: string[];
  questions: Object[];
  risks: string[];
}

interface MatchState {
  results: MatchResult[];
  jd_text: string | null;
  session_id: string | null;
  activeCandidate: MatchResult | null;
  activeResume: string | null;
}

const initialState: MatchState = {
  results: [],
  jd_text: null,
  session_id: null,
  activeCandidate: null,
  activeResume: null,
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setResults(
      state,
      action: PayloadAction<{
        jd_text: string;
        results: MatchResult[];
        session_id: string;
      }>
    ) {
      state.jd_text = action.payload.jd_text;
      state.results = action.payload.results;
      state.session_id = action.payload.session_id;
    },
    clearResults(state) {
      state.results = [];
      state.jd_text = null;
      state.session_id = null;
    },
    updateResults(state, action: PayloadAction<{ results: MatchResult[] }>) {
      state.results = action.payload.results;
    },
    selectCandiadate(state, action: PayloadAction<{ candidate: MatchResult }>) {
      state.activeCandidate = action.payload.candidate;
      state.activeResume = null;
    },
    selectResume(state, action: PayloadAction<{ resume: string }>) {
      state.activeResume = action.payload.resume;
      state.activeCandidate = null;
    },
    closePreview(state) {
      state.activeCandidate = null;
      state.activeResume = null;
    },
  },
});

export const {
  setResults,
  clearResults,
  updateResults,
  selectCandiadate,
  selectResume,
  closePreview,
} = matchSlice.actions;
export default matchSlice.reducer;
