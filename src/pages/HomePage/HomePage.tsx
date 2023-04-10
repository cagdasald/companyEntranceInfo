import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/services/hooks';
import { cardEntrance } from '../../core/services/cardEntrance/cardEntrance.slice';
import Constants from '../../core/utilities/constants';
import moment from 'moment';
import { Col, Row, Statistic, Table } from 'antd';

function HomePage() {
  const [totalCardEntrance, setTotalCardEntrance] = useState<number>(0);
  const [totalCardlessEntrance, setTotalCardlessEntrance] = useState<number>(0);
  const getCardEntrance = useAppSelector(
    (state) => state.cardEntrance.cardEntrance
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cardEntrance());
  }, [dispatch]);

  useEffect(() => {
     setTotalCardEntrance(getCardEntrance.data ? getCardEntrance.data.filter(entry => entry.kart_tipi === "kartlı").length : 0)
     setTotalCardlessEntrance(getCardEntrance.data ? getCardEntrance.data.filter(entry => entry.kart_tipi === "kartsiz").length : 0)

  }, [getCardEntrance.data]);


  const columns = [
    {
      title: 'Giriş Tarihi',
      dataIndex: 'gecis_tarihi',
      width: 140,
      key: 'gecis_tarihi',
      render: (gecis_tarihi: string) => {
        moment.locale('tr');
        return (
          <span>{moment(gecis_tarihi).format(Constants.dateFormatUI)}</span>
        );
      },
    },
    {
      title: 'Geçiş Saati',
      dataIndex: 'gecis_saati',
      width: 140,
      key: 'gecis_saati',
    },
    {
      title: 'Kart Tipi',
      dataIndex: 'kart_tipi',
      width: 140,
      key: 'kart_tipi',
    },
  ];

  return (
    <div>
      <Table
        className="app-table"
        rowKey="created"
        columns={columns}
        dataSource={getCardEntrance.data}
        scroll={{ x: 1000 }}
        bordered
      />
      <Row gutter={20}>
        <Col span={12}>
          <Statistic title="Kartlı Geçiş Total" value={totalCardEntrance} />
        </Col>
        <Col span={12}>
          <Statistic title="Kartsız Geçiş Total" value={totalCardlessEntrance} />
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
