import axios from 'axios'
import store from "../vuex";
import V from '../main'
axios.defaults.baseURL = '/api';
axios.defaults.timeout = '30000';

axios.interceptors.response.use((res) => {
  const {data} = res;
  if (data.code === 401) {
    V.$store.commit('FETCH_USER_LOGIN', {isLogin: false, username:''});
    V.$router.push({path: '/login'});
  }
  return res.data //统一拦截把结果处理成res.data
});
const host = "";
const api = {
  // 登录   {"username":"","password":""}
  login: host + "/login",
  // 退出
  logout: host + "/logout",

  // 目前用于下载相关文件使用，如数据导入下载模板
  host: "http://172.17.1.24:8080",
  // host: window.location.origin,
  //前台 - 首页 - 获取全部分类、表信息
  category: host + "/category?req=tables",
  //前台 - 首页 - 搜索框输入时推荐 post {keyword:''}
  suggest: host + "/search/suggest",
  // 分类 各个类别 数量统计 post {keyword:'',indices:[]}
  agg: host + "/search/agg",
  // 搜索结果页 列表 post {keyword:'',indices:[],pageNo:1,pageSize:2}
  search: host + "/search",
  // 意向搜索 get {keyword:''}
  intention: host + "/search/intent",
  // 搜索结果导出数据 post {keyword:"",indices:[],pageNo:'',pageSize:''}
  searchExport: host + "/search?req=export",

  //前台 - 数据导入 - 列表
  allImportData: host + "/dataImport?req=all",
  //前台 - 数据导入 - 导入数据
  importData: host + "/dataImport?req=upload",
  //前台 - 数据导入 - 下载模板
  dlDataTemp: host + "/dataImport?req=download",


  // 后台标签管理 - 全部表标签 ?req=all
  allTableLabel: host + "/label/table?req=all",
  // 后台标签管理 - 添加表标签 post {labelName:''}
  // addTableLabel: host + "/label/table?req=add",    旧接口只能添加名称
  addTableLabel: host + "/label/table?req=addwithpic",
  // 后台标签管理 - 删除表标签 delete ?id=id
  delTableLabel: host + "/label/table?req=delete",
  // 后台标签管理 - 修改表标签 put {labelName:'',id:''}
  // editTableLabel: host + "label/table?req=update",  旧接口只能修改名称
  editTableLabel: host + "label/table?req=updatewithpic",


  // 后台标签管理 - 全部列标签 ?req=all
  allColumnLabel: host + "/label/column?req=all",
  // 后台标签管理 - 添加列标签 post {labelName:'',searchable:false}
  addColumnLabel: host + "/label/column?req=add",
  // 后台标签管理 - 删除列标签 delete ?id=id
  delColumnLabel: host + "/label/column?req=delete",
  // 后台标签管理 - 修改列标签 put {labelName:'',id:'',searchable:true/false}
  editColumnLabel: host + "/label/column?req=update",


  // 后台 - 元数据管理 - 索引列表 ?req=all
  allMetadata: host + "/mappings?req=all",
  // 后台 - 元数据管理 - 索引下的类型信息 {indexName:''}
  metadataType: host + "/mappings?req=index",
  // 后台 - 元数据管理 - 索引下的类型信息中 概要 {indexName:'',typeName:''}
  metadataGeneralColumn: host + "/mappings?req=generalColumn",
  // 后台 - 元数据管理 - 索引下的列 设置概要 put {indexName:'',typeName:'',fieldName:''}
  metadataSetGeneralColumn: host + "/index/type/field?req=addGeneral",
  // 后台 - 元数据管理 - 索引下的列 取消概要 put {indexName:'',typeName:'',fieldName:''}
  metadataDelGeneralColumn: host + "/index/type/field?req=cancelGeneral",
  // 后台 - 元数据管理 - 索引下的列 概要排序 put {indexName:'',typeName:'',fieldName:'',generalOrder:''}
  metadataGeneralColumnSort: host + "/index/type/field?req=sortGeneral",
  // 后台 - 元数据管理 - 索引下的类型信息中的列信息 {indexName:'',typeName:''}
  metadataColumn: host + "/mappings?req=type",
  // 后台 - 元数据管理 - 索引下的类型信息修改 put {indexName:'',typeName:'',typeLabel:'',typeChineseName:''}
  editMetadataType: host + "/index/type/info?req=update",
  // 后台 - 元数据管理 - 索引下的类型信息 批量修改  put [{indexName:'',typeName:'',typeLabel:'',typeChineseName:''},...]
  editMetadataTypeAll: host + "/index/type/info?req=multiUpdate",
  // 后台 - 元数据管理 - 索引下的列信息修改 put {indexName:'',typeName:'',fieldName:'',fieldLabel:'',fieldChineseName:'',display:bool}
  editMetadataColumn: host + "/index/type/field/info?req=update",
  // 后台 - 元数据管理 - 索引下的列信息 批量修改 put [{indexName:'',typeName:'',fieldName:'',fieldLabel:'',fieldChineseName:'',display:bool},...]
  editMetadataColumnAll: host + "/index/type/field/info?req=multiUpdate",
  // 后台 - 元数据管理 - 类型展示顺序 put {indexName:'',typeName:'',fieldName:'',fieldLabel:'',orderId:''}
  editMetadataColumnSort: host + "/index/type/field/info?req=updateid",
  // 后台 - 元数据管理 - 导出数据
  dlDataOperation: host + "/dataOperation?req=download",
  // 后台 - 元数据管理 - 导入数据
  importDataOperation: host + "/dataOperation?req=upload",


  // 用户行为统计
  userLog: host + '/log',


  // 用户管理
  // 获取全部角色 offset 每页条数，pageNO 页码
  allRoles: host + "/role?req=searchAllRole",
  // 添加角色 post {"name":"admin2123","authority":"","active":true,"level":-1,"appIDs":null,"ctime":"","user_id":"admin","username":"admin123"}
  addRole: host + "/role?req=add",
  // 删除角色 roleName:''
  delRole: host + "/role?req=delete",
  // 编辑角色 put {"name":"test_xy", "active":false}
  editRole: host + "/role?req=update",
  // 查看角色的权限表 roleName=admin2
  searchTableFromRole: host + "/role?req=searchTableFromRole",
  // 设置角色权限 indexNames=[] & roleName=admin8
  setRoleAuthority: host + "/role?req=addTable",
  // 查看角色下的用户 get roleName=""
  searchUserFromRole: host + "/user?req=searchUserFromRole",


  // 查询所有用户
  allUser: host + "/user?req=searchAllUsers",
  // 设置角色用户 put {"role":"","userNames":[]}
  setRoleUser: host + "/user?req=setUserToRole",
  // 删除角色下的用户 delete {userID:'',roleName:''}
  delRoleUser: host + "/user?req=deleteUserFromRole",
  // 查询所有部门
  allUnit: host + "/user?req=getUnits",
  // 添加用户 post {"name":"","email":"","password":"","cell":"","unit":""}
  addUser: host + "/user?req=addUser",
  // 删除用户 delete {"userID":""}
  delUser: host + "/user?req=delete",
  // 编辑用户 put {"name":"","email":"","password":"","cell":"","unit":""}
  editUser: host + "/user?req=updateUser",
  // 修改用户密码 {"userId":"","new_password":""}
  editUserPwd: host + "/user?req=update",
  // 查询当前用户下的 用户组 get {"userId":""}
  searchGroupFromUser: host + "/user?req=searchGroupFromUser",
  // 查询当前用户下的 角色 get {"userId":""}
  searchRoleFromUser: host + "/user?req=searchRoleFromUser",
  // 所有用户组
  allGroup: host + "/user?req=searchUserGroup",
  // 添加用户到用户组 put {"groupid":"","userIDs":[]}
  addUserToGroup: host + "/user?req=setUserToGroup",
  // 添加用户组到用户 put {"userId":"user0","GroupIds":[]}
  addGroupToUser: host + "/user?req=setGroupToUser",
  // 添加角色到用户 put {"userId":"user2","roleNames":[]}
  addRoleToUser: host + "/user?req=setRoleToUser",
  // 删除用户 从用户组
  delUserFromGroup: host + "/user?req=deleteUserFromGroup",
  // 添加角色 到用户
  addUserToRole: host + "/user?req=setUserToRole",
  // 删除用户 从角色
  delUserFromRole: host + "/user?req=deleteUserFromRole",
  // 创建用户组 post {"name":"","unit":"","user_gpid":""}
  addGroup: host + "/user?req=addUserGroup",
  // 删除用户组 delete {"userGroup":""}
  delGroup: host + "/user?req=deleteUserGroup",
  // 编辑用户组 put {"user_gid":"","name":"","unit":"","user_gpid":""}
  editGroup: host + "/user?req=updateUserGroup",
  // 查询当前用户组 包含的用户 {GroupID:""}
  searchUserFromGroup: host + "/user?req=searchUserFromGroup",

  // 普通用户 个人中心 获取基本信息
  getUserInfo: host + "/user?req=getUserInfo",
  // 个人中心修改密码 put {"userId":"1","old_password":"1","new_password":"3"}
  editNormalUserPwd: host + "/user?req=updatepassword",
  // 比对碰撞 上传 post form-data
  compareUpload: host + "/compare?req=upload",
  // 比对碰撞 比对记录 get
  compareHistory: host + "/compare?req=list",
  // 比对碰撞 比对记录 再次比对 get {id:"",size:""}
  compareAgain: host + "/compare?req=preview",
  // 比对碰撞 提交 put {"id":"","compareColumn":"","indices":[]}
  compareResult: host + "/compare?req=agg",
  // 比对碰撞 左侧单表查询
  compareSearch: host + "compare?req=search",
  //必读碰撞 数据导出
  compareExport: host + "/compare?req=export",


}
export default api;

