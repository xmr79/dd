/**
 * Author: wjw
 * Date:
 * Description:日期统计折线图(日期填充)
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Interaction, Point, Line } from 'bizcharts';
import { toMoney, getChartData, getDaysBetween } from '@/utils/utils';
import DataSet from '@antv/data-set';
import moment from 'moment';
// 日期填充
function getdata(starttime, endtime, data, x, y) {
  let dataCost = data && data.length ? JSON.parse(JSON.stringify(data)) : [];
  const days = getDaysBetween(starttime, endtime);
  dataCost = dataCost
    ? getChartData({
        data: dataCost,
        timeStart: starttime,
        timeEnd: endtime,
        timeType: 'day',
        isToTime: true,
        timeKey: x.key,
      })
    : [];
  dataCost.map(item => {
    item[x.key] = moment(item[x.key]).format('MM-DD');
    y.forEach(element => {
      const { key, text } = element;
      item[key] = item[key] ? item[key] : 0;
      item[text] = item[key];
    });
  });
  return dataCost;
}

const LineComponent = props => {
  const {
    dataCost = [],
    x = { key: 'statDate', text: '日期' },
    y = [{ key: 'a', text: '交易金额' }],
    startTime,
    endTime,
    color,
  } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    const d = getdata(startTime, endTime, dataCost, x, y);
    const datas = d.reverse();
    let dv = new DataSet().createView().source(datas);

    dv.transform({
      type: 'fold',
      // 展开字段集
      fields: y.map(_ => _.text),
      // key字段
      key: 'type',
      // value字段
      value: 'valueData',
      retains: [],
    });
    setData(dv);
  }, [dataCost]);

  const cols = {};
  cols[x.key] = { alias: x.text };
  return (
    <>
      <Chart autoFit data={data} height={400} padding={80} scale={cols}>
        <Axis name={`${x.key}`} title />
        <Legend />
        <Tooltip showCrosshairs shared></Tooltip>
        <Line
          shape="smooth"
          color={color ? ['type', color] : 'type'}
          position={`${x.key}*valueData`}
          style={{
            lineWidth: 3,
            // shadowColor: '#000',
            // shadowBlur: 0.1,
            // shadowOffsetY: 1,
            // lineCap:''
          }}
        />
        <Point
          color={color ? ['type', color] : 'type'}
          size={3}
          shape={'circle'}
          position={`${x.key}*valueData`}
        />
        <Interaction type="element-active" />
      </Chart>
    </>
  );
};
export default connect(({}) => {
  return {};
})(LineComponent);
