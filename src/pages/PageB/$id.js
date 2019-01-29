/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, { PureComponent } from 'react';
import { InputItem, TextareaItem, List, Toast, Button } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import styles from './index.less';
import LeftList from '../components/LeftList';
import RightList from '../components/RightList';

class Index extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch({ type: 'kaoqin/detail', payload: { detailId: id } });
  }

  onChange = (tab, index) => {
    const { dispatch } = this.props;
    switch (index) {
      case 0:
        dispatch({ type: 'kaoqin/save', payload: { pageType: 0 } });
        break;
      case 1:
        dispatch({ type: 'kaoqin/save', payload: { pageType: 1 } });
        break;
      default:
        break;
    }
  };

  render() {
    const {
      form: { getFieldProps },
    } = this.props;
    const { modelState, dispatch, history } = this.props;
    const { detail } = modelState;

    return (
      <div>
        <div className={styles.header}>
          维护计划查询
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
          <InputItem
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="客户名称"
            value={detail.customerName}
          >
            <span className={styles.small}>客户名称</span>
          </InputItem>
          <InputItem
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="联系人"
            value={detail.contantName}
          >
            <span className={styles.small}>联系人</span>
          </InputItem>
          <InputItem
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="关联项目"
            value={detail.projectName}
          >
            <span className={styles.small}>关联项目</span>
          </InputItem>
          <InputItem
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="维护类型"
            value={detail.defendTypeNm}
          >
            <span className={styles.small}>维护类型</span>
          </InputItem>
          <InputItem
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="维护人"
            value={detail.defendUser}
          >
            <span className={styles.small}> 维护人</span>
          </InputItem>
          <InputItem
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="其他人员"
            value={detail.otherDefend}
          >
            <span className={styles.small}> 其他人员</span>
          </InputItem>
          <InputItem
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="计划开始时间"
            value={detail.startTime}
          >
            <span className={styles.small}> 计划开始时间</span>
          </InputItem>
          <InputItem
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="计划完成时间"
            value={detail.endTime}
          >
            <span className={styles.small}> 计划完成时间</span>
          </InputItem>
        </List>
        <List renderHeader={() => '计划维护内容'}>
          <TextareaItem
            disabled
            {...getFieldProps('count', {
              initialValue: detail.defendContent,
            })}
            rows={4}
          />
        </List>
      </div>
    );
  }
}
function mapstate2props(state) {
  return {
    modelState: state.kaoqin,
  };
}
export default createForm()(connect(mapstate2props)(Index));
