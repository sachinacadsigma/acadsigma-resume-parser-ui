import { useAppSelector, useAppDispatch } from './hooks';
import {
  setJDFile,
  clearJD,
  setJDId,
  setSkills,
  setJDText,
  markJD,
} from '../../features/jd/jdSlice';

type Skills = {
  mustHave: string[];
  niceToHave: string[];
};

export const useJD = () => {
  const dispatch = useAppDispatch();
  const jdFile = useAppSelector((state) => state.jd.jdFile);
  const jdText = useAppSelector((state) => state.jd.jdText);
  const jdId = useAppSelector((state) => state.jd.jdId);
  const mustHaveSkills = useAppSelector((state) => state.jd.mustHaveSkills);
  const niceToHaveSkills = useAppSelector((state) => state.jd.niceToHaveSkills);
  const isJDProcessed = useAppSelector((state) => state.jd.isJDProcessed);
  const skills = { mustHaveSkills, niceToHaveSkills };

  const saveJDFile = (file: File | null) => {
    dispatch(setJDFile(file));
  };

  const saveJDId = (id: string) => {
    dispatch(setJDId(id));
  };

  const saveJDText = (text: string) => {
    dispatch(setJDText(text));
  };

  const saveSkills = (skillsArray: Skills) => {
    dispatch(setSkills(skillsArray));
  };

  const resetJD = () => {
    dispatch(clearJD());
  };

  const markJDProcessed = (value: boolean) => {
    dispatch(markJD(value));
  };

  return {
    jdFile,
    jdId,
    jdText,
    skills,
    isJDProcessed,
    saveJDFile,
    saveJDId,
    saveJDText,
    saveSkills,
    resetJD,
    markJDProcessed,
  };
};
