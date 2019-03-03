/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, { PureComponent } from 'react';
import { InputItem, DatePicker, TextareaItem, List, Toast, Button } from 'antd-mobile';
import moment from 'moment';
import { Checkbox } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import { createForm } from 'rc-form';
import styles from './index.less';
import LeftList from '../../components/LeftList';
import RightList from '../../components/RightList';

class Index extends PureComponent {
  state = {
    address: '',
    longitude: '',
    latitude: '',
  };

  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch({ type: 'kaoqin/detail', payload: { detailId: id } });
    dispatch({ type: 'kaoqin/getdefendType', payload: { type: 2 } });
    dispatch({ type: 'kaoqin/getdefendType', payload: { type: 3 } });
    dispatch({ type: 'kaoqin/getdefendType', payload: { type: 4 } });
    // this.getPosition();
  }

  // getPosition = () => {
  //   const that = this;
  //   const map = new BMap.Map('Bmap');
  //   const geolocation = new BMap.Geolocation();
  //   geolocation.getCurrentPosition(
  //     function(r) {
  //       if (this.getStatus() == BMAP_STATUS_SUCCESS) {
  //         var mk = new BMap.Marker(r.point);
  //         var myGeo = new BMap.Geocoder();
  //         map.addOverlay(mk);
  //         map.panTo(r.point);
  //         myGeo.getLocation(r.point, rs => {
  //           try {
  //             console.log(r.point);
  //             let { district, province, city, street, streetNumber } = rs.addressComponents;
  //             that.setState({
  //               address: `${province}${city}${district}${street}${streetNumber}`,
  //               longitude: r.point.lng,
  //               latitude: r.point.lat,
  //             });
  //           } catch (e) {
  //             Toast.fail('获取城市信息失败', e);
  //           }
  //         });
  //       } else {
  //         Toast.fail('failed' + this.getStatus());
  //       }
  //     },
  //     { enableHighAccuracy: true }
  //   );
  // };

  getPosition = () => {
    const that = this;
    navigator.geolocation.getCurrentPosition(
      function(position) {
        //获取地理位置成功时所做的处理
        var gpsPoint = new BMap.Point(position.coords.longitude, position.coords.latitude);
        var convertor = new BMap.Convertor();
        convertor.translate([gpsPoint], 0, 0, function(p) {
          var geoc = new BMap.Geocoder();
          geoc.getLocation(gpsPoint, function(rs) {
            var { province, city, district, street, streetNumber } = rs.addressComponents;
            that.setState({
              address: `${province}${city}${district}${street}${streetNumber}`,
              longitude: gpsPoint.lng,
              latitude: gpsPoint.lat,
            });
          });
        });
      },
      function(error) {
        //获取地理位置信息失败时所做的处理
        console.log(error);
        that.setState({ address: '获取地理位置信息失败' });
      }, //以下是可选属性
      {
        enableHighAccuracy: true, //是否要求高精度的地理位置信息
        timeout: 1000, //对地理位置信息的获取操作做超时限制，如果再该事件内未获取到地理位置信息，将返回错误
        maximumAge: 0, //设置缓存有效时间，在该时间段内，获取的地理位置信息还是设置此时间段之前的那次获得的信息，超过这段时间缓存的位置信息会被废弃
      }
    );
  };

  onSubmit = () => {
    console.log('do');
    const {
      form: { validateFields },
      match: {
        params: { id },
      },
      dispatch,
      modelState: { status, detail },
    } = this.props;
    validateFields((err, values) => {
      // String actionAddr; //维护地址
      // String longitude;//经度
      // String latitude;//纬度
      // String status;//状态（在列表获取）
      if (!err) {
        const value = {
          ...values,
          status: 1,
          longitude: this.state.longitude,
          latitude: this.state.latitude,
          defendOverTime: moment(values.defendOverTime).format('YYYY-MM-DD HH:mm:ss'),
          leaveTime: moment(values.leaveTime).format('YYYY-MM-DD HH:mm:ss'),
          backTime: moment(values.backTime).format('YYYY-MM-DD HH:mm:ss'),
          rutCheckType: values.rutCheckType[0] - 0,
          id,
          defendOverTime: moment(values.defendOverTime).format('YYYY-MM-DD HH:mm:ss'),
        };
        console.log(value);
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

  render() {
    const {
      form: { getFieldProps, getFieldDecorator },
      match: {
        params: { id },
      },
    } = this.props;
    const { modelState, dispatch, history } = this.props;
    const { detail } = modelState;

    return (
      <div>
        <div className={styles.header}>
          维护计划录入
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
          <InputItem disabled clear placeholder="客户名称" value={detail.customerName}>
            <span className={styles.small}>客户名称</span>
          </InputItem>
          <InputItem disabled clear placeholder="联系人" value={detail.contantName}>
            <span className={styles.small}>联系人</span>
          </InputItem>
          <InputItem disabled clear placeholder="关联项目" value={detail.projectName}>
            <span className={styles.small}>关联项目</span>
          </InputItem>
          <InputItem disabled clear placeholder="维护类型" value={detail.defendTypeNm}>
            <span className={styles.small}>维护类型</span>
          </InputItem>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            {...getFieldProps('defendOverTime', {
              rules: [{ required: true, message: '请选择维护完成时间' }],
            })}
          >
            <List.Item arrow="horizontal">维护完成时间</List.Item>
          </DatePicker>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            {...getFieldProps('leaveTime', {
              rules: [{ required: true, message: '请选择离开用户时间' }],
            })}
          >
            <List.Item arrow="horizontal">离开用户时间</List.Item>
          </DatePicker>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            {...getFieldProps('backTime', {
              rules: [{ required: true, message: '请选择回到公司时间' }],
            })}
          >
            <List.Item arrow="horizontal">回到公司时间</List.Item>
          </DatePicker>
          <List.Item wrap thumb={<span>常规维护检查</span>}>
            {getFieldDecorator('rutCheckType')(
              <Checkbox.Group style={{ width: '100%' }}>
                {modelState.typeDetail.map(v => (
                  <Checkbox value={v.codeId}>{v.codeName}</Checkbox>
                ))}
              </Checkbox.Group>
            )}
          </List.Item>
          <List renderHeader={() => '地址'}>
            <TextareaItem
              disabled
              style={{ background: '#fff' }}
              {...getFieldProps('actionAddr', {
                initialValue: this.state.address,
              })}
              rows={2}
            />
          </List>
        </List>
        <List renderHeader={() => '实际维护内容'}>
          <TextareaItem
            style={{ background: '#fff' }}
            {...getFieldProps('feedbackOpinion', {})}
            rows={4}
          />
        </List>
        <Button type="primary" onClick={this.onSubmit}>
          录入
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
