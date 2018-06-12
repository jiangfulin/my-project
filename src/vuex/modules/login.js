import {loginActions} from '../actions/login'
import {loginMutations} from "../mutations/login";

const login = {
  state: {
    isLogin:false,
    username:'',
    data:{}
  },
  mutations:loginMutations,
  actions:loginActions
};
export default login
