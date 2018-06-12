import axios from 'axios';

export const $http = (url, params = {}, success, fail, type, headers = {}) => {
  type = type || 'get';
  if ((type === 'get') || (type === 'delete')) params = {params}
  axios[type](url, params).then(response => {
    success && success(response)
  }).catch(error => {
    fail && fail(error)
  })
};
export const setStorage = (name, value) => {
  if (!window.sessionStorage) {
    console.log('当前浏览器不支持window.sessionStorage');
    return false;
  }
  typeof value !== 'string' && (value = JSON.stringify(value))
  sessionStorage.setItem(name, value)
};
export const getStorage = (name) => {
  if (!window.sessionStorage) {
    console.log('当前浏览器不支持window.sessionStorage');
    return false;
  }
  return sessionStorage.getItem(name);
};
export const removeStorage = (name) => {
  if (!window.sessionStorage) {
    console.log('当前浏览器不支持window.sessionStorage');
    return false;
  }
  return sessionStorage.removeItem(name);
};
/*export default {
  request: (url, params, callback, type, headerView = {}) => {
    type = type || 'get';
    if ((type === 'get') || (type === 'delete')) params = {params};
    axios[type](url, params, headerView).then(res => {
      if (!res) {
        console.log(res)
        return;
      }
      let {code, data, messageCode} = res.data;
      if (code === 200) {
        callback && callback(data, messageCode);
      } else {
        console.log("code :" + code);
      }
    }).catch(err => {
      console.error(err)
    })
  },
  pureRequest: (url, params = {}, success, fail, type, headerView = {}) => {
    type = type || 'get';
    axios[type](url, params).then(response => {
      success && success(response)
    }).catch(error => {
      fail && fail(error)
    })
  },

  loadingCallback: (callback, delay = 200) => {
    let timer = setTimeout(() => {
      callback();
      clearTimeout(timer)
      timer = null;
    }, delay)
  },
  setStorage: (name, value) => {
    if (!window.sessionStorage) {
      console.log('当前浏览器不支持window.sessionStorage');
      return false;
    }
    typeof value !== 'string' && (value = JSON.stringify(value))
    sessionStorage.setItem(name, value)
  },
  getStorage: (name) => {
    if (!window.sessionStorage) {
      console.log('当前浏览器不支持window.sessionStorage');
      return false;
    }
    return sessionStorage.getItem(name);
  },
  removeStorage: (name) => {
    if (!window.sessionStorage) {
      console.log('当前浏览器不支持window.sessionStorage');
      return false;
    }
    return sessionStorage.removeItem(name);
  },

  // 格式化数字
  currency: (value, currency, decimals) => {
    const digitsRE = /(\d{3})(?=\d)/g
    value = parseFloat(value)
    if (!isFinite(value) || (!value && value !== 0)) return ''
    currency = currency != null ? currency : '$'
    decimals = decimals != null ? decimals : 2
    var stringified = Math.abs(value).toFixed(decimals)
    var _int = decimals
      ? stringified.slice(0, -1 - decimals)
      : stringified
    var i = _int.length % 3
    var head = i > 0
      ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
      : ''
    var _float = decimals
      ? stringified.slice(-1 - decimals)
      : ''
    var sign = value < 0 ? '-' : ''
    return sign + currency + head +
      _int.slice(i).replace(digitsRE, '$1,') + _float

  },
  //清除字符串中的html标签 获得纯文本
  clearHTMLabel: (str) => {
    if (!str) return;
    //清除html标签
    const reg = /<\/?.+?>/g;
    //先清除html 再去除空白
    return str.replace(reg, '').replace(/\s/g, '');
  },
  //清除<br />
  clearBRLabel: (str) => {
    if (!str) return;
    const reg = /<\s*(br)\s*\/?\s*>/gi;
    return str.replace(reg, '')
  },


}*/
