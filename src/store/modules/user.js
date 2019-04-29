import Vue from 'vue'
import { login, getInfo, logout } from "@/api/login"
import { ACCESS_TOKEN } from "@/store/mutation-types"
import { welcome } from "@/utils/util"

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    userinfo:'',
    userID:''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_USERINFO: (state, userinfo) => {
      state.userinfo = userinfo
    },
    SET_USERID:(state,userID)=>{
      state.userID=userID
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      console.log('登录页输入的内容：');
       console.log(userInfo);
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          console.log('服务器打印的')
       
          if(res.code===1)
          {
            console.log(res.userinfo.AdminID)
           
            Vue.ls.set(ACCESS_TOKEN, res.token, 7 * 24 * 60 * 60 * 1000)     
            
            commit('SET_USERID',res.userinfo.AdminID)  
            commit('SET_USERINFO',res.userinfo)              
            commit('SET_TOKEN',res.token)     
           
            resolve(res)
          }
          else
          {
            console.log(res)
            resolve(res)
          }
        
        
        }).catch(error => {
          reject(error)
        })
      })
    }, 
    // 获取用户信息
    GetInfo({ commit }) {
    
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.result
          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                let action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId });
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
            commit('SET_USERINFO',  result.username)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_USERID', '')

        
        Vue.ls.remove(ACCESS_TOKEN)

        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    },

  }
}

export default user