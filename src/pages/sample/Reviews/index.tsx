import { SyncOutlined } from "@ant-design/icons";
import IntlMessages from "@crema/utility/IntlMessages";
import { Button, Col, Input, Row, Space, Spin, message } from "antd";
import MainTable from "components/Table";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiService from "service/api";

function Reviews() {
  const {state: linkState}: {state: {title: string}} = useLocation();
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    setIsloading(true)
    apiService.getData('review')
    .then((res) => console.log(res))
    .catch(() => message.error("Error occured"))
    .finally(() => setIsloading(false))
  }

  const columns = [
    {
      key: 1,
      dataIndex: 'user',
      title: <IntlMessages id='common.userName' />,
      width: 200
    },
    {
      key: 2,
      dataIndex: 'rating',
      title: <IntlMessages id='common.ratings' />,
      width: 200
    },
    {
      key: 3,
      dataIndex: 'reviewText',
      title: <IntlMessages id='common.reviewText' />
    }
  ];

  return (
    <>
      <h2>{linkState.title} list</h2>

      <Row gutter={15}>
        <Col span={19}>
          <Input size="large" placeholder='Search...' />
        </Col>
        <Col span={5}>
          <Button block disabled={isLoading} onClick={() => getData()}>
            <Space>
              {isLoading && <SyncOutlined spin />}
              <IntlMessages id='common.refresh' />
            </Space>
          </Button>
        </Col>
      </Row>

      <Spin spinning={isLoading}>
        <MainTable cols={columns} datas={[]} default />
      </Spin>
    </>
  )
}

export default Reviews