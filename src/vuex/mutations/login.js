import * as types from '../constants/types';

export const loginMutations = {
  [types.FETCH_USER_LOGIN](state, action) {
    state.isLogin = action.isLogin;
    state.username = action.username;
  }
};
