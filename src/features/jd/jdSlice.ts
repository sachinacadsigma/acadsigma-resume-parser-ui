import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface JDState {
  jdId: string | null;
  jdFile: File | null;
  jdText: string;
  mustHaveSkills: string[];
  niceToHaveSkills: string[];
  isJDProcessed: boolean;
}

const initialState: JDState = {
  jdId: null,
  jdFile: null,
  jdText: '',
  mustHaveSkills: [],
  niceToHaveSkills: [],
  isJDProcessed: false,
};

const jdSlice = createSlice({
  name: 'jd',
  initialState,
  reducers: {
    setJDFile(state, action: PayloadAction<File | null>) {
      state.jdFile = action.payload;
    },
    setJDText(state, action: PayloadAction<string>) {
      state.jdText = action.payload;
    },
    setJDId(state, action: PayloadAction<string>) {
      state.jdId = action.payload;
    },
    setSkills(
      state,
      action: PayloadAction<{ mustHave: string[]; niceToHave: string[] }>
    ) {
      state.mustHaveSkills = action.payload.mustHave;
      state.niceToHaveSkills = action.payload.niceToHave;
    },
    markJD(state, action: PayloadAction<boolean>) {
      state.isJDProcessed = action.payload;
    },
    clearJD(state) {
      state.jdId = null;
      state.jdFile = null;
      state.jdText = '';
      state.mustHaveSkills = [];
      state.niceToHaveSkills = [];
      state.isJDProcessed = false;
    },
  },
});

export const { setJDFile, setJDText, setJDId, setSkills, clearJD, markJD } =
  jdSlice.actions;

export default jdSlice.reducer;
