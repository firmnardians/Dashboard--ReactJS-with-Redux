import Types from "../Actions/Types";

// const initalState = {
//   isAuthenticated: false
// };

const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user_id: action.user_id,
        name: action.name,
        role_id: action.role_id,
        phone_number: action.phone_number,
        email: action.email,
        lang: action.lang,
        permission: JSON.stringify(action.permission),
        token: action.token
      };

    case Types.REGISTER:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user_id: action.user_id,
        name: action.name,
        role_id: action.role_id,
        phone_number: action.phone_number,
        email: action.email,
        permission: JSON.stringify(action.permission),
        token: action.token
      };
    case Types.LOGOUT:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user_id: action.user_id,
        name: action.name,
        role_id: action.role_id,
        phone_number: action.phone_number,
        email: action.email,
        lang: action.lang,
        permission: action.permission,
        token: action.token
      };
    default:
      return state;
  }
};

export default AuthReducer;
