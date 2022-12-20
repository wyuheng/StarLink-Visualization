import React, { Component } from "react";
import { List, Avatar, Button, Checkbox, Spin } from "antd";
import satellite from "../assets/images/satellite.svg";

class SatelliteList extends Component {
  constructor() {
    super();
    this.state = {
      selected: [],
    };
  }

  onChange = (e) => {
    //console.log(e); 我怎麼知道Target是我需要的東西？？（這個要經驗了。）
    const { dataInfo, checked } = e.target; //這個要debug出來才知道的。
    //有兩個東西才能維護
    const { selected } = this.state; //把衛星的Data Info 扔進去就可以了。
    //分兩行寫，寫得清晰一點。
    const list = this.addOrRemove(dataInfo, checked, selected);
    this.setState({ selected: list });
  };

  addOrRemove = (item, status, list) => {
    const found = list.some((entry) => entry.satid === item.satid); //this is boolean
    if (status && !found) {
      list = [...list, item];
    }

    if (!status && found) {
      list = list.filter((entry) => {
        //刪除
        return entry.satid !== item.satid;
      });
    }
    return list;
  };

  onShowSatMap = () => {
    this.props.onShowMap(this.state.selected);
  };

  render() {
    const satList = this.props.satInfo ? this.props.satInfo.above : [];
    const { isLoad } = this.props;
    const { selected } = this.state;

    return (
      <div className="sat-list-box">
        <Button
          className="sat-list-btn"
          type="primary"
          disabled={selected.length === 0} //為什麼？？ 這代碼做什麼事。 就是用戶沒有按Button，就不給他按Track
          onClick={this.onShowSatMap}
        >
          Track
        </Button>
        <hr />

        {isLoad ? (
          <div className="spin-box">
            <Spin tip="Loading..." size="large" />
          </div>
        ) : (
          <List
            className="sat-list"
            itemLayout="horizontal"
            size="small"
            dataSource={satList}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Checkbox dataInfo={item} onChange={this.onChange} />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar size={50} src={satellite} />}
                  title={<p>{item.satname}</p>}
                  description={`Launch Date: ${item.launchDate}`}
                />
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }
}

export default SatelliteList;
