/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, { PureComponent } from 'react';
import { InputItem, DatePicker, TextareaItem, List, Toast, Button } from 'antd-mobile';
import { Checkbox } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import { createForm } from 'rc-form';
import styles from './index.less';
import LeftList from '../../components/LeftList';
import RightList from '../../components/RightList';

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

  onSubmit = () => {
    console.log('do');
    const {
      form: { validateFields },
      dispatch,
      match: {
        params: { id },
      },
      modelState: { status, uid },
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'kaoqin/addDisscuss',
          payload: { uid, planId: id, detail: values.detail },
        });
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

  render() {
    const {
      form: { getFieldProps },
      match: {
        params: { id },
      },
    } = this.props;
    const { modelState, dispatch, history } = this.props;
    const { detail } = modelState;

    return (
      <div>
        <div className={styles.header}>
          发表评论
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
          <List>
            <TextareaItem
              style={{ background: '#fff' }}
              {...getFieldProps('detail', {})}
              rows={4}
            />
          </List>
        </List>
        <Button type="primary" onClick={this.onSubmit}>
          保存
        </Button>
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
