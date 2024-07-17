import { createSlice } from "@reduxjs/toolkit";
import { USER_STATUS } from "../../utils/api";

const initialState = {
  problemsSolved: [],
  correctSubmissions: [],
  skippedSubmissions: [],
  isLoading: false,
  errorMsg: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getSubmissions: {
      prepare(problemsSolved, correctSubmissions, skippedSubmissions) {
        return {
          payload: {
            problemsSolved,
            correctSubmissions,
            skippedSubmissions,
          },
        };
      },
      reducer(state, action) {
        state.problemsSolved = action.payload.problemsSolved;
        state.correctSubmissions = action.payload.correctSubmissions;
        state.skippedSubmissions = action.payload.skippedSubmissions;
        state.isLoading = false;
      },
    },

    fetchingSubmissions(state) {
      state.isLoading = true;
      state.problemsSolved = [];
      state.correctSubmissions = [];
      state.skippedSubmissions = [];
      state.errorMsg = "";
    },

    setError(state, action) {
      state.errorMsg = action.payload;
      state.isLoading = false;
    },
    resetSubmissions(state) {
      state.problemsSolved = [];
      state.correctSubmissions = [];
      state.skippedSubmissions = [];
      state.isLoading = false;
    },
  },
});

// export const { setError } = userSlice.actions;
export default userSlice.reducer;

export function getSubmissions(username) {
  return async function (dispatch, getState) {
    dispatch({ type: "user/fetchingSubmissions" }); // set loading to true

    try {
      const res = await fetch(USER_STATUS(username));

      if (res.status === 400) {
        throw new Error("User not found");
      } else if (res.status === 403) {
        throw new Error("Too many requests");
      } else if (res.status !== 200) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      const newQuestionsSolved = [];
      const newCorrectSubmissions = [];
      const newSkippedSubmissions = [];

      data.result.forEach((it) => {
        const submission = {
          id: it.id,
          problem: it.problem.name,
          contestId: it.contestId,
          rating: it.problem.rating ? it.problem.rating : 0,
          index: it.problem.index,
          tags: it.problem.tags,
        };

        if (it.verdict === "SKIPPED") {
          newSkippedSubmissions.push(submission);
        } else if (it.verdict === "OK") {
          if (!newQuestionsSolved.some((x) => x.problem === it.problem.name)) {
            newQuestionsSolved.push(submission);
          }
          newCorrectSubmissions.push(submission);
        }
      });

      dispatch({
        type: "user/getSubmissions",
        payload: {
          problemsSolved: newQuestionsSolved,
          correctSubmissions: newCorrectSubmissions,
          skippedSubmissions: newSkippedSubmissions,
        },
      });
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        const str = "Network error or CodeForces API is down. Please try again later.";
        dispatch({ type: "user/setError", payload: str });
      } else {
        dispatch({ type: "user/setError", payload: error.message });
      }
    }
  };
}
