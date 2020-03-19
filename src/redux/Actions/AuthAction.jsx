import Types from "./Types";

export const loginUser = payload => {
  const {
    user_id,
    token,
    name,
    role_id,
    phone_number,
    email,
    lang,
    permission
  } = payload;

  return {
    type: Types.LOGIN,
    isAuthenticated: true,
    user_id,
    name,
    role_id,
    phone_number,
    email,
    lang,
    permission,
    token
  };
};

export const registerUser = payload => {
  const {
    user_id,
    token,
    name,
    role_id,
    phone_number,
    email,
    permission
  } = payload;

  return {
    type: Types.REGISTER,
    isAuthenticated: true,
    user_id,
    name,
    role_id,
    phone_number,
    email,
    permission,
    token
  };
};

export const logoutUser = () => {
  return {
    type: Types.LOGOUT,
    isAuthenticated: false,
    user_id: null,
    name: null,
    role_id: null,
    phone_number: null,
    email: null,
    lang: null,
    permission: null,
    token: null
  };
};
