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
    contact: {},
    typeDetail: {},
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
        Toast.loading('Loading...', 100);
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
        Toast.hide();
      } catch (err) {
        Toast.hide();
        console.log(err);
      }
    },
    *getCustomer({ payload }, { call, put }) {
      try {
        Toast.loading('Loading...', 100);
        const {
          data: { data },
        } = yield call(Service.getCustomer, payload);
        Toast.hide();
        yield put({ type: 'save', payload: { customerList: data } });
        console.log(data);
      } catch (err) {
        Toast.hide();
        console.log(err);
      }
    },
    *getEmployee({ payload }, { call, put, select }) {
      try {
        Toast.loading('Loading...', 100);
        const { uid } = yield select(state => state.kaoqin);
        const {
          data: { data },
        } = yield call(Service.getEmployee, { uid });
        Toast.hide();
        yield put({ type: 'save', payload: { employee: data } });
        console.log(data);
      } catch (err) {
        Toast.hide();
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
        Toast.loading('Loading...', 100);
        const {
          data: { data },
        } = yield call(Service.addDetail, { values });
        Toast.hide();
        console.log(data, 'fetchDateList,personList');
      } catch (err) {
        Toast.hide();
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
        Toast.loading('Loading...', 100);
        const {
          data: {
            data: { data },
          },
        } = yield call(Service.getContact, { clientId });
        Toast.hide();
        yield put({ type: 'save', payload: { contact: data } });
        console.log(data, 'monthList');
        router.push('/PersonList');
      } catch (err) {
        Toast.hide();
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
        Toast.loading('Loading...', 100);
        const { data } = yield call(Service.getdefendType, { type });
        Toast.hide();
        yield put({ type: 'save', payload: { typeDetail: data } });
        console.log(data, 'fetchMonthPersonList');
      } catch (err) {
        Toast.hide();
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
        Toast.loading('Loading...', 100);
        const {
          data: { data },
        } = yield call(Service.projectList, { clientId, projectName });
        Toast.hide();
        yield put({ type: 'save', payload: { projectList: data } });
        console.log(data, 'projectListfetch');
      } catch (err) {
        Toast.hide();
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
        Toast.loading('Loading...', 100);
        const {
          data: { data },
        } = yield call(Service.detail, { detailId });
        Toast.hide();
        yield put({ type: 'save', payload: { detail: data[0] } });
        console.log(data, 'fetchdetail');
      } catch (err) {
        Toast.hide();
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
        Toast.loading('Loading...', 100);
        const {
          data: { data },
        } = yield call(Service.addDisscuss, { uid, planId, detail });
        Toast.hide();
        console.log(data, 'fetchaddDisscuss');
      } catch (err) {
        Toast.hide();
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
        Toast.loading('Loading...', 100);
        const {
          data: { data },
        } = yield call(Service.getDiscuss, { planId });
        Toast.hide();
        yield put({ type: 'save', payload: { discussList: data } });
        console.log(data, 'getDiscuss');
      } catch (err) {
        Toast.hide();
        console.log(err);
      }
    },
  },
};
