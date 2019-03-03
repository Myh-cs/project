/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, { PureComponent } from 'react';
import { InputItem, Card, TextareaItem, DatePicker, List, Toast, Button } from 'antd-mobile';
import Link from 'umi/link';
import { Checkbox } from 'antd';
import { connect } from 'dva';
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
    dispatch({ type: 'kaoqin/getDefendDiscuss', payload: { defendId: id } });
    dispatch({ type: 'kaoqin/getDiscuss', payload: { planId: id } });
    dispatch({ type: 'kaoqin/getdefendType', payload: { type: 2 } });
    dispatch({ type: 'kaoqin/getdefendType', payload: { type: 3 } });
    dispatch({ type: 'kaoqin/getdefendType', payload: { type: 4 } });
    dispatch({ type: 'kaoqin/getdefendType', payload: { type: 5 } });
  }

  linkTo = url => {
    console.log(url, 123);
    this.props.history.push(url);
  };

  render() {
    const {
      form: { getFieldProps, getFieldDecorator },
      match: {
        params: { id },
      },
    } = this.props;
    const { modelState, dispatch, history } = this.props;
    const { detail, discussList, defendDiscuss } = modelState;
    console.log(discussList);
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
            labelNumber={6}
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="客户名称"
            value={detail.customerName}
          >
            <span className={styles.small}>客户名称</span>
          </InputItem>
          <InputItem
            labelNumber={6}
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="联系人"
            value={detail.contantName}
          >
            <span className={styles.small}>联系人</span>
          </InputItem>
          <InputItem
            labelNumber={6}
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="关联项目"
            value={detail.projectName}
          >
            <span className={styles.small}>关联项目</span>
          </InputItem>
          <InputItem
            labelNumber={6}
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="维护类型"
            value={detail.defendTypeNm}
          >
            <span className={styles.small}>维护类型</span>
          </InputItem>
          <InputItem
            labelNumber={6}
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="维护人"
            value={detail.defendUser}
          >
            <span className={styles.small}> 维护人</span>
          </InputItem>
          <InputItem
            labelNumber={6}
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="其他人员"
            value={detail.otherDefend}
          >
            <span className={styles.small}> 其他人员</span>
          </InputItem>
          <InputItem
            labelNumber={6}
            disabled
            {...getFieldProps('autofocus')}
            clear
            placeholder="计划开始时间"
            value={detail.startTime}
          >
            <span className={styles.small}> 计划开始时间</span>
          </InputItem>
          <InputItem
            labelNumber={6}
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
        <InputItem
          labelNumber={6}
          disabled
          {...getFieldProps('autofocus')}
          clear
          placeholder="计划开始时间"
          value={detail.defendOverTime}
        >
          <span className={styles.small}> 维护完成时间</span>
        </InputItem>
        <InputItem
          labelNumber={6}
          disabled
          {...getFieldProps('autofocus')}
          clear
          placeholder="计划开始时间"
          value={detail.leaveTime}
        >
          <span className={styles.small}> 离开用户时间</span>
        </InputItem>
        <InputItem
          labelNumber={6}
          disabled
          {...getFieldProps('autofocus')}
          clear
          placeholder="计划开始时间"
          value={detail.backTime}
        >
          <span className={styles.small}> 回到公司时间</span>
        </InputItem>
        <List.Item wrap thumb={<span>常规维护检查</span>}>
          {getFieldDecorator('rutCheckType', { initialValue: [detail.rutCheckType] })(
            <Checkbox.Group disabled style={{ width: '100%' }}>
              {modelState.typeDetail.map(v => (
                <Checkbox value={v.codeId}>{v.codeName}</Checkbox>
              ))}
            </Checkbox.Group>
          )}
        </List.Item>
        <List renderHeader={() => '实际维护内容'}>
          <TextareaItem
            disabled
            style={{ background: '#fff' }}
            {...getFieldProps('count', {
              initialValue: detail.feedbackOpinion,
            })}
            rows={4}
          />
        </List>
        <List renderHeader={() => '地址'}>
          <TextareaItem
            disabled
            style={{ background: '#fff' }}
            {...getFieldProps('actionAddr', {
              initialValue: detail.actionAddr,
            })}
            rows={2}
          />
        </List>
        <Card full style={{ margin: '1rem 0' }}>
          <Card.Header
            title="用户评价"
            extra={
              <Button
                size="small"
                onClick={() => {
                  this.linkTo(`/PageB/${id}/pingjia`);
                }}
                disabled={defendDiscuss.length}
                type="primary"
                inline
              >
                评论
              </Button>
            }
          />
          <Card.Body>
            <List renderHeader={() => '用户意见'}>
              <TextareaItem
                disabled
                style={{ background: '#fff' }}
                {...getFieldProps('count', {})}
                value={defendDiscuss.length ? defendDiscuss[0].discuss : ''}
                rows={4}
              />
            </List>
            <List.Item wrap thumb={<span>完成情况</span>}>
              {getFieldDecorator('overType', {
                initialValue: defendDiscuss.length ? defendDiscuss[0].overType : '',
              })(
                <Checkbox.Group disabled style={{ width: '100%' }}>
                  {modelState.typeDetail5.map(v => (
                    <Checkbox key={v.codeId} value={v.codeId}>
                      {v.codeName}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              )}
            </List.Item>
          </Card.Body>
        </Card>
        <Card full style={{ margin: '1rem 0' }}>
          <Card.Header
            title="部门考核"
            extra={
              <Button
                size="small"
                onClick={() => {
                  this.linkTo(`/PageB/${id}/kaohe`);
                }}
                type="primary"
                inline
              >
                考核
              </Button>
            }
          />
          <Card.Body>
            <List renderHeader={() => '负责人意见'}>
              <TextareaItem
                disabled
                style={{ background: '#fff' }}
                {...getFieldProps('remarks', {
                  initialValue: detail.remarks,
                })}
                rows={4}
              />
            </List>
            <List.Item wrap thumb={<span>完成情况</span>}>
              {getFieldDecorator('resultsType', { initialValue: [detail.resultsType] })(
                <Checkbox.Group disabled style={{ width: '100%' }}>
                  {modelState.typeDetail3.map(v => (
                    <Checkbox value={v.codeId}>{v.codeName}</Checkbox>
                  ))}
                </Checkbox.Group>
              )}
            </List.Item>
            <List.Item wrap thumb={<span>工作质量</span>}>
              {getFieldDecorator('qualityType', { initialValue: [detail.qualityType] })(
                <Checkbox.Group disabled style={{ width: '100%' }}>
                  {modelState.typeDetail4.map(v => (
                    <Checkbox value={v.codeId}>{v.codeName}</Checkbox>
                  ))}
                </Checkbox.Group>
              )}
            </List.Item>
          </Card.Body>
        </Card>
        <Card full style={{ margin: '1rem 0' }}>
          <Card.Header
            title="评论"
            extra={
              <Button
                size="small"
                onClick={() => {
                  this.linkTo(`/PageB/${id}/pinglun`);
                }}
                type="primary"
                inline
              >
                评论
              </Button>
            }
          />
          <Card.Body>
            {discussList !== null && discussList.constructor.name === 'Array'
              ? discussList.map(v => (
                  <List.Item
                    style={{ margin: '1rem 0' }}
                    thumb={v.picture}
                    // extra="2018-09-11"
                    wrap
                  >
                    {v.userName}: {v.createTime}
                    <br />
                    {v.detail}
                  </List.Item>
                ))
              : '暂无数据'}
          </Card.Body>
        </Card>
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
