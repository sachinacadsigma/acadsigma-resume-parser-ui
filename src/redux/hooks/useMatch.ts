import { useAppDispatch, useAppSelector } from './hooks';
import {
  setResults,
  clearResults,
  updateResults,
} from '../../features/match/matchSlice';
import type { MatchResult } from '../../features/match/matchSlice';

export const useMatch = () => {
  const dispatch = useAppDispatch();
  const { results, jd_text, session_id } = useAppSelector(
    (state) => state.match
  );

  const saveResults = (
    jd_text: string,
    results: MatchResult[],
    session_id: string
  ) => {
    dispatch(setResults({ jd_text, results, session_id }));
  };

  const updateBlobs = (updatedResults: MatchResult[]) => {
    dispatch(updateResults({ results: updatedResults }));
  };

  const resetResults = () => {
    dispatch(clearResults());
  };

  return {
    results,
    jd_text,
    session_id,
    saveResults,
    resetResults,
    updateBlobs,
  };
};
