import * as actionTypes from "./actions";


const initialState = {
  userData: JSON.parse(localStorage.getItem("userData"))
};

const reducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        userData: action.updatedUser,
      };
    default:
      return state;
  }
};

export default reducer;
