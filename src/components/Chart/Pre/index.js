/**
 * Author: wjw
 * Date:
 * Description:pre
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Divider } from 'antd';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coordinate,
  Guide,
  Interval,
  Interaction,
  Legend,
  Annotation,
} from 'bizcharts';
import { toMoney, getChartData } from '@/utils/utils';
import DataSet from '@antv/data-set';
import moment from 'moment';
import styles from './index.less';
const Pre = props => {
  const { DataView } = DataSet;
  const { Html } = Guide;
  const { colors = [], lists = [], title, num } = props;
  const cc = new DataView();
  cc.source(lists).transform({
    type: 'percent',
    field: 'count',
    dimension: 'title',
    as: 'percent',
  });
  const [dv, setDv] = useState(cc);

  useEffect(() => {
    const aa = cc.rows.map((item, i) => {
      return {
        ...item,
        color: colors[i],
        checked: true,
      };
    });
    setLegendlists(aa);
  }, [lists]);

  const [legendlists, setLegendlists] = useState([]);

  useEffect(() => {
    const cc = new DataView();
    let arr = legendlists.filter(_ => _.checked);
    cc.source(arr).transform({
      type: 'percent',
      field: 'count',
      dimension: 'title',
      as: 'percent',
    });
    setDv(cc);
  }, [legendlists]);

  const getpercent = val => {
    return `${(Number.isNaN(val) ? 0 : val * 100).toFixed(2)}%`;
  };
  const cols = {
    percent: {
      formatter: val => {
        val = getpercent(val);
        return val;
      },
    },
  };
  const handleLegendClick = (element, i) => {
    const { checked, item } = element;
    let arr = legendlists;
    arr[i].checked = !checked;
    setLegendlists([...arr]);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Chart height={200} data={dv} autoFit>
        <Coordinate type="theta" radius={0.8} innerRadius={0.75} />
        <Axis visible={false} />
        <Legend visible={false} />
        <Tooltip />
        <Annotation.Text
          position={['50%', '50%']}
          content={num}
          style={{
            lineHeight: '240px',
            fontSize: '25',
            fill: '#262626',
            textAlign: 'center',
          }}
        />
        <Interval
          adjust="stack"
          position="percent"
          color={[
            'title',
            legendlists.filter(_ => _.checked).length > 0
              ? legendlists.filter(_ => _.checked).map(_ => _.color)
              : colors,
          ]}
          tooltip={[
            'title*percent',
            (title, percent) => {
              percent = getpercent(percent);
              return {
                name: title,
                value: percent,
              };
            },
          ]}
          style={{
            lineWidth: 1,
            stroke: '#fff',
          }}
          shape="sliceShape"
        />
        <ul className={styles.legend}>
          {legendlists.map((item, i) => (
            <li
              key={i}
              onClick={() => {
                handleLegendClick(item, i);
              }}
            >
              <span
                className={styles.dot}
                style={{
                  backgroundColor: !item.checked ? '#ccc' : item.color,
                }}
              />
              <span className={styles.legendTitle}>{item.title}</span>
              <Divider type="vertical" />
              <span className={styles.percent}>{getpercent(item.percent)}</span>
              <span className={styles.value}>{Number.isNaN(item.count) ? 0 : item.count}</span>
            </li>
          ))}
        </ul>
      </Chart>
    </div>
  );
};
export default Pre;
