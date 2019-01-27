/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, { PureComponent } from 'react';
import { Tabs, ListView, Toast, Button } from 'antd-mobile';
import { connect } from 'dva';
import styles from './index.less';
import LeftList from '../components/LeftList';
import RightList from '../components/RightList';

class Index extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      location: {
        query: { uid },
      },
      modelState,
    } = this.props;
    dispatch({ type: 'kaoqin/save', payload: { uid } });
    dispatch({ type: 'kaoqin/detailList', payload: { uid } });
    Toast.hide();
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
    const tabs = [
      {
        title: '维护计划',
      },
      {
        title: '维护记录',
      },
    ];
    const {
      modelState: {
        page,
        dataSource = [
          {
            img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
            title: 'Meet hotel',
            des: '不是所有的兼职汪都需要风吹日晒',
          },
          {
            img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
            title: "McDonald's invites you",
            des: '不是所有的兼职汪都需要风吹日晒',
          },
          {
            img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
            title: 'Eat the week',
            des: '不是所有的兼职汪都需要风吹日晒',
          },
        ],
      },
      listLoading,
      dispatch,
      history,
    } = this.props;
    return (
      <div>
        <div className={styles.header}>
          项目维护列表{' '}
          <Button className={styles.addButton} type="primary" inline size="small">
            新增
          </Button>
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
              data={[
                {
                  defendTypeNm: '类型',
                  id: '12313',
                  proName: '项目名',
                  defendUserName: '维护人',
                  tiem: '时间',
                },
              ]}
            />
          </div>
          <div>
            <RightList
              data={[
                {
                  defendTypeNm: '类型',
                  id: '12313',
                  proName: '项目名',
                  defendUserName: '维护人',
                  tiem: '时间',
                },
              ]}
            />
          </div>
        </Tabs>
        <Button
          className="back"
          type="ghost"
          size="small"
          onClick={() => {
            history.goBack();
          }}
        >
          {'<'}
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
export default connect(mapstate2props)(Index);
