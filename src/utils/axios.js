import axios from 'axios';
// import errMap from './errMap'
axios.defaults.baseURL='/qtyx/'
// axios.interceptors.request.use(
//   (config) => {
//     const newConfig = config
//     const { noAuth = false } = config
//     if (!noAuth) {
//       if (sessionStorage.getItem('token') !== null) {
//         newConfig.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`
//       }
//     }

//     return newConfig
//   },
//   error => Promise.reject(error),
// )

// axios.interceptors.response.use(
//   response => response,
//   (error) => {
//     const { response } = error
//     const config = {
//       placement: 'topRight',
//       top: 50,
//       duration: 2,
//       key: new Date() - 0 + '',
//     }
//     if (response && error.response.status === 401) {
//       // sessionStorage.removeItem('token')
//       config.message = <div style={{ wordBreak: 'break-all' }}>
//         <div>{'😥用户登录过期,请重新登录'}</div>
//       </div>
//       config.duration = null
//       notification.warn(config)
//     }
//     else if (response && error.response) {
//       config.message = <div style={{ wordBreak: 'break-all' }}>
//         <div>{errMap[`code${response.data.code}`] || '😥网络开小差了,请稍后再试'}</div>
//       </div>
//       notification.warn(config)
//     }
//     return Promise.reject(error)
//   },
// )
export default axios;
