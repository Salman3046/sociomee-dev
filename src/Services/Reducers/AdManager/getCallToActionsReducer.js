import * as types from "../../Constants/AdManager/index";

const initialState = {
  callToActions: [],
  loading: true,
};

const getCallToActionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CALL_TO_ACTIONS:
      return {
        ...state,
        callToActions: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default getCallToActionsReducer;
