/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, { PureComponent } from 'react';
import { Tabs, ListView, SearchBar, SegmentedControl, Toast, Button } from 'antd-mobile';
import { connect } from 'dva';
import styles from './index.less';
import LeftList from '../components/LeftList';
import RightList from '../components/RightList';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { filter: '' };
  }

  componentDidMount() {
    const {
      dispatch,
      location: {
        query: { uid },
      },
      modelState,
    } = this.props;
    dispatch({ type: 'kaoqin/save', payload: { uid } });
    dispatch({ type: 'kaoqin/detailList', payload: { uid, status: 1 } });
    Toast.hide();
    const Bmap = document.createElement('script');
    Bmap.src = 'http://api.map.baidu.com/api?v=2.0&ak=您的密钥';
    Bmap.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(Bmap);
  }

  createPlan = () => {
    const {
      history,
      location: {
        query: { uid },
      },
    } = this.props;
    history.push('/New');
  };

  onValueChange = value => {
    console.log(value);
  };

  onSearchChange = value => {
    this.setState({ filter: value });
    console.log(value);
  };

  onSubmit = value => {
    console.log(value, 'sub');
  };

  onClear = value => {
    console.log(value, 'clear');
  };

  onChange = (tab, index) => {
    const { dispatch } = this.props;
    switch (index) {
      case 0:
        dispatch({
          type: 'kaoqin/detailList',
          payload: { uid: this.props.modelState.uid, status: 1 },
        });
        break;
      case 1:
        dispatch({
          type: 'kaoqin/detailList',
          payload: { uid: this.props.modelState.uid, status: 2 },
        });
        break;
      default:
        break;
    }
  };

  render() {
    const tabs = [
      {
        title: '维护计划',
      },
      {
        title: '维护记录',
      },
    ];
    const {
      modelState: { page, detailList, detailList2, listLoading },
      dispatch,
      history,
    } = this.props;
    return (
      <div>
        <div className={styles.header}>
          项目维护列表{' '}
          <Button
            onClick={this.createPlan}
            className={styles.addButton}
            type="primary"
            inline
            size="small"
          >
            新增
          </Button>
        </div>
        <div>
          <SegmentedControl values={['客户名称', '人员名称']} onValueChange={this.onValueChange} />
          <SearchBar
            placeholder="客户名称/人员名称"
            onChange={this.onSearchChange}
            onSubmit={this.onSubmit}
            onClear={this.onClear}
            maxLength={8}
          />
        </div>
        <Tabs
          tabs={tabs}
          page={page}
          onChange={this.onChange}
          onTabClick={(tab, i) => {
            dispatch({ type: 'kaoqin/save', payload: { page: i } });
          }}
        >
          <div>
            <LeftList
              data={detailList.filter(
                v =>
                  v.status === '1' &&
                  (v.customerName.match(this.state.filter) ||
                    v.defendUserName.match(this.state.filter))
              )}
            />
          </div>
          <div>
            <RightList
              data={detailList2.filter(
                v =>
                  v.status !== '1' &&
                  (v.customerName.match(this.state.filter) ||
                    v.defendUserName.match(this.state.filter))
              )}
            />
          </div>
        </Tabs>
      </div>
    );
  }
}
function mapstate2props(state) {
  return {
    modelState: state.kaoqin,
  };
}
export default connect(mapstate2props)(Index);
