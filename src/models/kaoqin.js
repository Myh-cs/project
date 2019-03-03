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
    typeDetail2: [],
    typeDetail3: [],
    typeDetail4: [],
    typeDetail5: [],
    projectList: [],
    detail: {},
    getJurEmp: [],
    discussList: [],
    defendDiscuss: [],
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
          data: {
            data: { data },
          },
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
        } = yield call(Service.addDetail, { ...values });
        if (values.status === 1) {
          router.go(-2);
        } else {
          router.goBack();
        }
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
        switch (type) {
          case 1:
            yield put({ type: 'save', payload: { typeDetail: codes } });
            break;
          case 2:
            yield put({ type: 'save', payload: { typeDetail2: codes } });
            break;
          case 3:
            yield put({ type: 'save', payload: { typeDetail3: codes } });
            break;
          case 4:
            yield put({ type: 'save', payload: { typeDetail4: codes } });
            break;
          case 5:
            yield put({ type: 'save', payload: { typeDetail5: codes } });
            break;
          default:
            break;
        }
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
        Toast.success('评论成功');
        router.goBack();
        console.log(data, 'fetchaddDisscuss');
      } catch (err) {
        console.log(err);
      }
    },
    *addDefendDisscuss(
      {
        payload: { values },
      },
      { call, put }
    ) {
      try {
        const { discuss, overType, defendId } = values;
        const {
          data: { data },
        } = yield call(Service.addDefendDisscuss, { discuss, overType, defendId });
        Toast.success('评价成功');
        router.goBack();
        console.log(data, 'addDefendDisscuss');
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
    *getDefendDiscuss(
      {
        payload: { defendId },
      },
      { call, put }
    ) {
      try {
        console.log(defendId, 'defendDiscussdefendId');
        const {
          data: { data },
        } = yield call(Service.getDefendDiscuss, { defendId });

        yield put({ type: 'save', payload: { defendDiscuss: data } });
        console.log(data, 'defendDiscuss');
      } catch (err) {
        console.log(err);
      }
    },
    *getJurEmp({ payload }, { call, put }) {
      try {
        const {
          data: { data },
        } = yield call(Service.getJurEmp);

        yield put({ type: 'save', payload: { getJurEmp: data } });
        console.log(data, 'getJurEmp');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
