/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, { PureComponent } from 'react';
import { InputItem, TextareaItem, List, Toast, Button, Picker, DatePicker } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import styles from './index.less';
import LeftList from '../components/LeftList';
import RightList from '../components/RightList';

class Index extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      modelState: { status, uid },
      loading,
    } = this.props;
    dispatch({ type: 'kaoqin/getEmployee', payload: { uid } });
    dispatch({ type: 'kaoqin/getdefendType', payload: { type: 1 } });

    console.log(uid, status, loading, this.props.modelState);
  }

  onSubmit = () => {
    const {
      form: { validateFields },
      dispatch,
      modelState: { status },
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'kaoqin/addDetail', payload: { values } });
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
            data={modelState.employee.map(v => ({ value: v.id, label: v.name }))}
            title="客户名称"
            {...getFieldProps('customerName', {})}
            onOk={this.onSelectClient}
          >
            <List.Item arrow="horizontal">客户名称</List.Item>
          </Picker>
          <Picker
            cols={1}
            extra="联系人"
            data={modelState.contact.map(v => ({ value: v.id, label: v.name }))}
            title="联系人"
            {...getFieldProps('contantName', {})}
          >
            <List.Item arrow="horizontal">联系人</List.Item>
          </Picker>
          <Picker
            cols={1}
            extra="关联项目"
            data={modelState.projectList.map(v => ({ value: v.id, label: v.name }))}
            title="关联项目"
            {...getFieldProps('projectName', {})}
          >
            <List.Item arrow="horizontal">关联项目</List.Item>
          </Picker>
          <Picker
            cols={1}
            extra="维护类型"
            data={modelState.typeDetail.map(v => ({ value: v.codeId, label: v.codeName }))}
            title="维护类型"
            {...getFieldProps('defendTypeNm', {})}
          >
            <List.Item arrow="horizontal">维护类型</List.Item>
          </Picker>
          <InputItem
            style={{ background: '#fff' }}
            {...getFieldProps('defendUser')}
            clear
            placeholder="维护人"
          >
            <span className={styles.small}> 维护人</span>
          </InputItem>
          <InputItem
            style={{ background: '#fff' }}
            {...getFieldProps('otherDefend')}
            clear
            placeholder="其他人员"
          >
            <span className={styles.small}> 其他人员</span>
          </InputItem>
          <DatePicker
            {...getFieldProps('startTime', {
              rules: [{ required: true, message: '请选择开始时间' }],
            })}
          >
            <List.Item arrow="horizontal">计划开始时间</List.Item>
          </DatePicker>
          <DatePicker
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
            {...getFieldProps('defendContent')}
            rows={4}
          />
        </List>
        <Button onClick={this.onSubmit}>保存</Button>
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
