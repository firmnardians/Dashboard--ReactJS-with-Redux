import Types from "../Actions/Types";

// State
const initialState = {
  totalOrder: 5
};

// Reducer
const CounterReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.TAMBAH:
      return {
        ...state,
        totalOrder: state.totalOrder + 1
      };
    case Types.KURANG:
      return {
        ...state,
        totalOrder: state.totalOrder - 1
      };
    default:
      return state;
  }
};

export default CounterReducer;
