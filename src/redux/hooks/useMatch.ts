import { useAppDispatch, useAppSelector } from './hooks';
import {
  setResults,
  clearResults,
  updateResults,
  selectCandiadate,
  selectResume,
  closePreview,
} from '../../features/match/matchSlice';
import type { MatchResult } from '../../features/match/matchSlice';

export const useMatch = () => {
  const dispatch = useAppDispatch();
  const { results, jd_text, session_id, activeCandidate, activeResume } =
    useAppSelector((state) => state.match);

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

  const handleCandidateSelect = (candidate: MatchResult) => {
    dispatch(selectCandiadate({ candidate }));
  };

  const handleClosePreview = () => {
    dispatch(closePreview());
  };

  const handleResumeSelect = (resume: string) => {
    dispatch(selectResume({ resume }));
  };

  return {
    results,
    jd_text,
    session_id,
    activeCandidate,
    activeResume,
    saveResults,
    resetResults,
    updateBlobs,
    handleCandidateSelect,
    handleResumeSelect,
    handleClosePreview,
  };
};
