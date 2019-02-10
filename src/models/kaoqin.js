import { Toast } from 'antd-mobile';
import router from 'umi/router';
import * as Service from '../services/kaoqin';
import { is } from 'css-select';

export default {
  namespace: 'kaoqin',
  state: {
    detailList: [],
    detailList2: [],
    status: 1,
    customerList: [],
    employee: [],
    contact: [],
    typeDetail: [],
    projectList: [],
    detail: {},
    discussList: [],
    page: 0,
    uid: '',
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *detailList({ payload }, { call, put }) {
      try {
        // const { pageNumber,
        //   pageSize,
        //   // Employee.id,
        //   uid,
        //   cusId,
        // } = payload;
        const {
          data: {
            data: { data },
          },
        } = yield call(Service.detailList, payload);
        if (payload.status === 1) {
          yield put({ type: 'save', payload: { detailList: data } });
          console.log(data, 1);
        } else if (payload.status === 2) {
          yield put({ type: 'save', payload: { detailList2: data } });
          console.log(data, 2);
        }
      } catch (err) {
        console.log(err);
      }
    },
    *getCustomer({ payload }, { call, put }) {
      try {
        const {
          data: { data },
        } = yield call(Service.getCustomer, payload);

        yield put({ type: 'save', payload: { customerList: data } });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    *getEmployee({ payload }, { call, put, select }) {
      try {
        const { uid } = yield select(state => state.kaoqin);
        const {
          data: { data },
        } = yield call(Service.getEmployee, { uid });

        yield put({ type: 'save', payload: { employee: data } });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    *addDetail(
      {
        payload: { values },
      },
      { call, put }
    ) {
      try {
        const {
          data: { data },
        } = yield call(Service.addDetail, { values });

        console.log(data, 'fetchDateList,personList');
      } catch (err) {
        console.log(err);
      }
    },
    *getContact(
      {
        payload: { clientId },
      },
      { call, put }
    ) {
      try {
        console.log(clientId, 'clientId');
        const {
          data: { data },
        } = yield call(Service.getContact, { clientId });

        yield put({ type: 'save', payload: { contact: data } });
      } catch (err) {
        console.log(err);
      }
    },
    *getdefendType(
      {
        payload: { type },
      },
      { call, put }
    ) {
      try {
        const {
          data: {
            data: { codes },
          },
        } = yield call(Service.getdefendType, { type });
        console.log(codes);
        yield put({ type: 'save', payload: { typeDetail: codes } });
      } catch (err) {
        console.log(err);
      }
    },
    *projectList(
      {
        payload: { clientId, projectName },
      },
      { call, put }
    ) {
      try {
        const {
          data: { data },
        } = yield call(Service.projectList, { clientId, projectName });

        yield put({ type: 'save', payload: { projectList: data } });
        console.log(data, 'projectListfetch');
      } catch (err) {
        console.log(err);
      }
    },
    *detail(
      {
        payload: { detailId },
      },
      { call, put }
    ) {
      try {
        const {
          data: { data },
        } = yield call(Service.detail, { detailId });

        yield put({ type: 'save', payload: { detail: data[0] } });
        console.log(data, 'fetchdetail');
      } catch (err) {
        console.log(err);
      }
    },
    *addDisscuss(
      {
        payload: { uid, planId, detail },
      },
      { call, put }
    ) {
      try {
        const {
          data: { data },
        } = yield call(Service.addDisscuss, { uid, planId, detail });

        console.log(data, 'fetchaddDisscuss');
      } catch (err) {
        console.log(err);
      }
    },
    *getDiscuss(
      {
        payload: { planId },
      },
      { call, put }
    ) {
      try {
        const {
          data: { data },
        } = yield call(Service.getDiscuss, { planId });

        yield put({ type: 'save', payload: { discussList: data } });
        console.log(data, 'getDiscuss');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
