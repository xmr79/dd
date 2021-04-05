/**
 * 省市区formItem组件
 * @param {*省市区的标签的文本} label
 * @param {*省市区的标签的字段名} name
 * @param {*详细地址的标签的文本} alabel
 * @param {*详细地址的字段名} aname
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Row, Col, Input, Popover, Form, Cascader, Select } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
import InputCom from '@/components/FormItems/InputFormItem/InputCom';
import { EnvironmentOutlined } from '@ant-design/icons';
import styles from './index.less';
import ModalMap from '@/pages/Modals/ModalMap';
import { getmapLocation, getssqname } from '@/utils/utils';
const mapKey = '1234567809843asadasd'; //需要自己去高德官网上去申请
const { TextArea } = Input;
const { Option } = Select;
const CitySelects = forwardRef((props, ref) => {
  const { value = {}, onChange, options = [], disabled } = props;
  const { province, city, district } = value;
  const [provinceData, setprovinceData] = useState([]);
  const [cityData, setcityData] = useState([]);
  const [districtData, setdistrictData] = useState([]);
  useEffect(() => {
    if (options.length > 0 && provinceData.length > 0) {
      if (province) {
        const plists = provinceData.filter(_ => _.value === province);
        setcityData(plists[0].children);
      }
    }
  }, [province, provinceData]);
  useEffect(() => {
    if (city && cityData.length > 0) {
      const cityLists = cityData.filter(_ => _.value === city);
      setdistrictData(cityLists[0].children);
    }
  }, [city]);
  useEffect(() => {
    if (cityData.length > 0) {
      const cityLists = cityData.filter(_ => _.value === city);

      setdistrictData(cityLists.length > 0 ? cityLists[0].children : []);
    }
  }, [cityData]);

  useEffect(() => {
    if (options.length > 0) {
      setprovinceData(options);
    }
  }, [options]);
  const handleProvinceChange = province => {
    const provinceLists = provinceData.filter(_ => _.value === province);
    setcityData(provinceLists[0].children);
    onChange({
      ...value,
      province,
      city: '',
    });
  };
  const onSecondCityChange = city => {
    const cityLists = cityData.filter(_ => _.value === city);
    setdistrictData(cityLists[0].children);
    onChange({
      ...value,
      city,
      district: '',
    });
  };
  const onDistrictChange = district => {
    onChange({
      ...value,
      district,
    });
  };
  return (
    <>
      <Select
        className="mr-10"
        value={province}
        style={{ width: 150 }}
        onChange={handleProvinceChange}
        placeholder="请选择省份"
        disabled={true}
      >
        {provinceData.map(province => (
          <Option key={province.value} value={province.value}>
            {province.label}
          </Option>
        ))}
      </Select>
      <Select
        className="mr-10"
        value={city}
        style={{ width: 150 }}
        onChange={onSecondCityChange}
        placeholder="请选择城市"
        disabled={true}
      >
        {cityData.map(city => (
          <Option key={city.value} value={city.value}>
            {city.label}
          </Option>
        ))}
      </Select>
      <Select
        value={district}
        style={{ width: 150 }}
        onChange={onDistrictChange}
        placeholder="请选择区县"
        disabled={disabled}
      >
        {districtData.map(district => (
          <Option key={district.value} value={district.value}>
            {district.label}
          </Option>
        ))}
      </Select>
    </>
  );
});

const FormItem = props => {
  const {
    name,
    label,
    alabel,
    aname,
    wrapperCol = { span: 10 },
    BaseProvinceList,
    dispatch,
    form,
    disabled,
    aplaceholder,
    dataModal,
  } = props;
  const validator = (rule, value = {}) => {
    const { province, city, district } = value;
    if (!province && !city && !district) {
      return Promise.reject('请选择省市区!');
    } else if (!province) {
      return Promise.reject('请选择省份!');
    } else if (!city) {
      return Promise.reject('请选择城市!');
    } else if (!district) {
      return Promise.reject('请选择区县!');
    } else {
      return Promise.resolve();
    }
  };
  const handleAdd = (modalType, r) => {
    const payload = {
      dataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  const handlYuLan = async () => {
    const { address, ssq } = form.getFieldsValue([name, aname]);
    const obj = getssqname(BaseProvinceList, ssq);
    const text = `${obj.province}${obj.city}${obj.district ? obj.district : ''}${
      address ? address : ''
    }`;
    const position = await getmapLocation({
      address: text,
      city: ssq.city,
    });
    const p = position.split(',');
    handleAdd('MODAL_MAP', { position: { longitude: +p[0], latitude: +p[1] }, address: text });
  };
  return (
    <>
      <ModalMap dataModal={dataModal} />
      <Form.Item
        label={label}
        name={name}
        required
        initialValue={{
          province: 330000,
          city: 330100,
        }}
        rules={[
          {
            validator,
          },
        ]}
      >
        <CitySelects disabled={disabled} options={BaseProvinceList} />
      </Form.Item>
      <InputFormItem
        disabled={disabled}
        label={alabel}
        name={aname}
        max={25}
        wrapperCol={wrapperCol}
        placeholder={aplaceholder}
        prefix={<EnvironmentOutlined />}
        extraBtn={
          <Button type="link" onClick={handlYuLan}>
            预览
          </Button>
        }
      />
    </>
  );
};
const mapStateToProps = ({ common, global }) => {
  return {
    BaseProvinceList: common.BaseProvinceList,
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(FormItem);
