import * as types from '../constants/types';
import api from '../../api'
import axios from 'axios'

export const loginActions = {
  fetchLoginAction({commit, state, dispatch}, params) {
    return axios.post(api.login, params)
    /*.then(data => {
          if (data.code === 200) {
            commit(types.FETCH_USER_LOGIN, {data, isLogin: true})
            console.log(2)
          } else {
            commit(types.FETCH_USER_LOGIN, {data, isLogin: false})
          }
        }).catch(error => {
          commit(types.FETCH_USER_LOGIN, {data, isLogin: false})
        })*/
  }
};
