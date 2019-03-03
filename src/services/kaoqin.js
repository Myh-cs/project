import axios from '@/utils/axios';
import Qs from 'querystring';

export function detailList(params) {
  // 维护列表
  return axios({
    url: '/app/defend/detailList.do',
    method: 'post',
    params: { ...params, pageSize: 1000 },
  });
}

export function getCustomer(params) {
  // 查询客户
  return axios({
    url: '/app/defend/getCustomer.do',
    method: 'get',
    params: { ...params, pageSize: 1000 },
  });
}

// 维护列表页面检索客户经理
export function getEmployee({ uid }) {
  return axios({
    url: `/app/defend/getEmployee.do`,
    method: 'get',
    params: { id: uid },
  });
}
// 添加维护信息
export function addDetail(data) {
  console.log(data);
  return axios({
    url: `/app/defend/addDetail.do`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [
      function(data) {
        data = Qs.stringify(data);
        return data;
      },
    ],
    data,
    params: { uid: data.uid },
  });
}

// 添加维护时查询联系人
export function getContact({ clientId }) {
  return axios({
    url: '/app/defend/getContact.do',
    method: 'get',
    params: { clientId, pageSize: 200 },
  });
}

export function getdefendType({ type }) {
  // 维护类型接口
  return axios({
    url: '/app/defend/getdefendType.do',
    method: 'get',
    params: { type, pageSize: 200 },
  });
}

// 添加维护时获取项目

export function projectList({ clientId, projectName }) {
  // type	标识	string	Y	1计划维护类型2常规维护类型3完成结果4完成质量
  return axios({
    url: '/app/defend/projectList.do',
    method: 'get',
    params: { clientId, projectName, pageSize: 200 },
  });
}

// 获取维护详情
export function detail({ detailId }) {
  // type	标识	string	Y	1计划维护类型2常规维护类型3完成结果4完成质量
  // 维护类型接口
  return axios({
    url: '/app/defend/detail.do',
    method: 'get',
    params: { detailId, pageSize: 200 },
  });
}

// 添加评论
export function addDisscuss({ uid, planId, detail }) {
  // type	标识	string	Y	1计划维护类型2常规维护类型3完成结果4完成质量
  // 维护类型接口
  console.log(detail, 'service');
  return axios({
    url: '/app/defend/addDisscuss.do',
    method: 'post',
    params: { uid, planId, detail },
  });
}

// 查看评论
export function getDiscuss({ planId }) {
  // type	标识	string	Y	1计划维护类型2常规维护类型3完成结果4完成质量
  // 维护类型接口
  return axios({
    url: '/app/defend/getDiscuss.do',
    method: 'get',
    params: { planId },
  });
}
