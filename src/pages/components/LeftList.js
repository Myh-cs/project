import React from 'react';
import { connect } from 'dva';
import { List, Button } from 'antd-mobile';
import { withRouter } from 'dva/router';

const { Item } = List;
const { Brief } = Item;
class MonthList extends React.PureComponent {
  onCheck = id => {
    this.props.history.push(`/PageA/${id}`);
  };

  render() {
    const { modelState, data, history } = this.props;
    console.log(history, '0129039102390129');
    return (
      <>
        <List>
          {data.length > 0 ? (
            data.map(item => (
              <Item
                key={item.id}
                arrow="horizontal"
                multipleLine
                wrap
                extra={item.tiem}
                onClick={() => {
                  this.onCheck(item.id);
                }}
              >
                {item.customerName}
                <Brief>
                  {item.defendUserName}/{item.defendTypeNm}
                </Brief>
              </Item>
            ))
          ) : (
            <Item multipleLine wrap>
              暂无数据
            </Item>
          )}
        </List>
      </>
    );
  }
}
function mapstate2props(state) {
  return {
    modelState: state.kaoqin,
  };
}
export default connect(mapstate2props)(withRouter(MonthList));
