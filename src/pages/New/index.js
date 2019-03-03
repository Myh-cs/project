/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, { PureComponent } from 'react';
import {
  InputItem,
  TextareaItem,
  List,
  SearchBar,
  Toast,
  Button,
  Picker,
  DatePicker,
} from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import styles from './index.less';
import LeftList from '../components/LeftList';
import RightList from '../components/RightList';
import moment from 'moment';

const debounce = (fn, delay = 500) => {
  let handle;
  return e => {
    // 取消之前的延时调用
    clearTimeout(handle);
    handle = setTimeout(() => {
      fn(e);
    }, delay);
  };
};

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cname: '',
    };
  }

  componentDidMount() {
    const {
      dispatch,
      modelState: { status, uid },
      loading,
    } = this.props;
    dispatch({ type: 'kaoqin/getCustomer', payload: { uid } });
    dispatch({ type: 'kaoqin/getEmployee', payload: { uid } });
    dispatch({ type: 'kaoqin/getdefendType', payload: { type: 1 } });
    console.log(uid, status, loading, this.props.modelState);
  }

  onSearchChange = value => {
    const fun = () => {
      console.log(value);
      const {
        dispatch,
        modelState: { uid },
      } = this.props;
      dispatch({ type: 'kaoqin/getCustomer', payload: { uid, name:value, noloading: true } });
    };
    this.setState({ cname: value });
    debounce(fun(), 500);
  };

  onSearchSubmit = value => {
    console.log(value, 'sub');
  };

  onClear = value => {
    console.log(value, 'clear');
  };

  onSubmit = () => {
    const {
      form: { validateFields },
      dispatch,
      modelState: { status, uid },
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        console.log(values, 'values');
        const value = {
          ...values,
          ContantNumber: values.ContantNumber ? values.ContantNumber[0] : '',
          customerNumber: values.customerNumber ? values.customerNumber[0] : '',
          defendType: values.defendType ? values.defendType[0] : '',
          defendUserId: values.defendUserId ? values.defendUserId[0] : '',
          otherUsersId: values.otherUsersId ? values.otherUsersId[0] : '',
          proDbid: values.proDbid ? values.proDbid[0] : '',
          createUser: uid,
          uid,
          startTime: moment(values.startTime).format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment(values.endTime).format('YYYY-MM-DD HH:mm:ss'),
        };
        dispatch({ type: 'kaoqin/addDetail', payload: { values: value } });
      } else {
        const arry = [];
        Object.keys(err).forEach(key => {
          err[key].errors.forEach(error => {
            arry.push(error.message);
          });
        });
        Toast.fail(
          <div>
            {arry.map((v, i) => (
              <div>
                {i}:{v}
              </div>
            ))}
          </div>
        );
      }
      console.log(values);
      console.log(err);
      console.log(status);
    });
  };

  onSelectClient = v => {
    console.log(v);
    const {
      dispatch,
      modelState: { status, uid },
    } = this.props;
    dispatch({ type: 'kaoqin/getContact', payload: { clientId: v[0] } });
    dispatch({ type: 'kaoqin/projectList', payload: { clientId: v[0] } });
  };

  render() {
    const {
      form: { getFieldProps },
    } = this.props;
    const { modelState, dispatch, history } = this.props;
    console.log(modelState.customerList, 'customerList');
    console.log(modelState.contact, 'contact');
    console.log(modelState.projectList, 'projectList');
    const { cname } = this.state;
    return (
      <div>
        <div className={styles.header}>
          维护计划新增
          <Button
            className={styles.addButton}
            type="primary"
            inline
            size="small"
            onClick={() => {
              history.goBack();
            }}
          >
            返回
          </Button>
        </div>
        <List style={{ background: '#fff' }}>
          <Picker
            cols={1}
            extra="客户名称"
            data={modelState.customerList.map(v => ({ value: v.id, label: v.customerName }))}
            title={
              <div className={styles.search}>
                <SearchBar
                  className={styles.search}
                  value={cname}
                  placeholder="客户名称"
                  onChange={this.onSearchChange}
                  onSubmit={this.onSearchSubmit}
                  onClear={this.onClear}
                />
              </div>
            }
            {...getFieldProps('customerNumber', {
              rules: [{ required: true, message: '请选择客户名称' }],
            })}
            onOk={this.onSelectClient}
          >
            <List.Item arrow="horizontal">客户名称</List.Item>
          </Picker>
          <Picker
            cols={1}
            extra="联系人"
            data={modelState.contact.map(v => ({ value: v.id, label: v.customerContactName }))}
            title="联系人"
            {...getFieldProps('ContantNumber', {})}
          >
            <List.Item arrow="horizontal">联系人</List.Item>
          </Picker>
          <Picker
            cols={1}
            extra="关联项目"
            data={modelState.projectList.map(v => ({ value: v.projectId, label: v.projectName }))}
            title="关联项目"
            {...getFieldProps('proDbid', {})}
          >
            <List.Item arrow="horizontal">关联项目</List.Item>
          </Picker>
          <Picker
            cols={1}
            extra="维护类型"
            data={modelState.typeDetail.map(v => ({ value: v.codeId, label: v.codeName }))}
            title="维护类型"
            {...getFieldProps('defendType', {
              rules: [{ required: true, message: '请选择维护类型' }],
            })}
          >
            <List.Item arrow="horizontal">维护类型</List.Item>
          </Picker>
          <Picker
            cols={1}
            extra="维护人"
            data={modelState.employee.map(v => ({ value: v.id, label: v.name }))}
            title="维护人"
            {...getFieldProps('defendUserId', {})}
          >
            <List.Item arrow="horizontal">维护人</List.Item>
          </Picker>
          <Picker
            cols={1}
            extra="其他人员"
            data={modelState.employee.map(v => ({ value: v.id, label: v.name }))}
            title="其他人员"
            {...getFieldProps('otherUsersId', {})}
          >
            <List.Item arrow="horizontal">其他人员</List.Item>
          </Picker>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            {...getFieldProps('startTime', {
              rules: [{ required: true, message: '请选择开始时间' }],
            })}
          >
            <List.Item arrow="horizontal">计划开始时间</List.Item>
          </DatePicker>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            {...getFieldProps('endTime', {
              rules: [{ required: true, message: '请选择完成时间' }],
            })}
          >
            <List.Item arrow="horizontal">计划完成时间</List.Item>
          </DatePicker>
        </List>
        <List renderHeader={() => '计划维护内容'}>
          <TextareaItem
            style={{ background: '#fff' }}
            {...getFieldProps('defendContent', {
              rules: [{ required: true, message: '请选择开始时间' }],
            })}
            rows={4}
          />
        </List>
        <Button type="primary" onClick={this.onSubmit}>
          保存
        </Button>
      </div>
    );
  }
}
function mapstate2props(state) {
  if (state.loading.global) {
    Toast.loading('Loading...');
    console.log(' Toast.loading();', state.loading);
  } else {
    console.log(' Toast.hide();', state.loading);
    Toast.hide();
  }
  return {
    modelState: state.kaoqin,
    loading: state.loading,
  };
}
export default createForm()(connect(mapstate2props)(Index));
