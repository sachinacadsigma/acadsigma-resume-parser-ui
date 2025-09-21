import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MatchResult {
  resume_name: string;
  match_score: number;
  semantic_score: number;
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
}

interface MatchState {
  results: MatchResult[];
  jd_text: string | null;
  session_id: string | null;
}

const initialState: MatchState = {
  results: [],
  jd_text: null,
  session_id: null,
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
  },
});

export const { setResults, clearResults, updateResults } = matchSlice.actions;
export default matchSlice.reducer;
