import {
  EyeOutlined,
  FileImageOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Image,
  Input,
  message,
  Row,
  Space,
  Spin,
} from "antd";
import MainTable from "../../../components/Table";
import { useEffect, useMemo, useReducer } from "react";
import { useLocation, useParams } from "react-router-dom";
import PostEdit from "./PostEdit";
import {
  setEditItemId,
  setInput,
  setItems,
  setLoading,
  setVisible,
} from "./ReducerActions";
import { appActionType, appStateType } from "./Types";
import jwtAxios from "auth/jwt-auth/jwtaxios";
import { JwtUserType } from "auth/jwt-auth/JWTAuthAuthProvider";

function reducer(state: appStateType, action: appActionType): appStateType {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    case "SET_VISIBLE":
      return { ...state, visible: action.payload };
    case "SET_EDIT_ITEM_ID":
      return { ...state, editItemId: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_INPUT":
      return { ...state, input: action.payload };
    default:
      return state;
  }
}

const UserPage = () => {
  const [state, dispatch] = useReducer(reducer, {
    visible: false,
    editItemId: "",
    input: "",
    loading: { table: false, modal: false },
    items: [],
  });
  const { state: linkState }: { state: { title: string } } = {
    state: { title: "Users" },
  };

  const filteredItems = useMemo(
    () =>
      state.items.filter(
        (item: JwtUserType) =>
          item?.email?.toLowerCase().includes(state.input) ||
          item?.name?.toLowerCase().includes(state.input) ||
          item?.role?.toLowerCase().includes(state.input)
      ),
    [state.input, state.items]
  );

  const getItems = () => {
    dispatch(setItems([]));
    dispatch(setLoading({ ...state.loading, table: true }));

    jwtAxios.get(`/users`).then((res) => {
      const users: JwtUserType[] = res.data.data.users;

      dispatch(setLoading({ ...state.loading, table: false }));
      dispatch(setItems(users));
    });
  };
  const deleteItem = ({ _id: id }: { _id: string }) => {
    dispatch(setLoading({ ...state.loading, table: true }));
    jwtAxios
      .delete(`/users/${id}`)
      .then(() => {
        getItems();
        message.success("Deleted succesfully");
      })
      .catch((err) => {
        dispatch(setLoading({ ...state.loading, table: false }));

        message.error(err.message, 3);
        dispatch(setLoading({ ...state.loading, modal: false }));
      });
  };

  const editBtn = (item: JwtUserType) => {
    dispatch(setEditItemId(item?._id || ""));
    dispatch(setVisible(true));
  };

  useEffect(getItems, []);

  const columns = [
    {
      key: 1,
      dataIndex: "email",
      title: "Email",
    },
    {
      key: 2,
      dataIndex: "name",
      title: "Name",
    },
    {
      key: 3,
      dataIndex: "role",
      title: "Role",
    },
    {
      key: 4,
      title: "Image",
      dataIndex: "photo",
      width: 80,
      render: (imgUrl: string) => {
        return imgUrl && imgUrl !== "undefined" ? (
          <Image
            src={`http://localhost:3000/api/v1/${imgUrl}`}
            style={{ height: 40, width: 40, objectFit: "cover" }}
            preview={{
              maskClassName: "customize-mask",
              mask: <EyeOutlined />,
            }}
          />
        ) : (
          <Avatar size={"large"} shape="square" icon={<FileImageOutlined />} />
        );
      },
    },
  ];

  return (
    <>
      <h2>{linkState.title} list</h2>

      <Row gutter={12} style={{ padding: "30px 0" }}>
        <Col span={16}>
          <Input
            size="large"
            placeholder="Search..."
            onChange={(e) => dispatch(setInput(e.target.value.toLowerCase()))}
          ></Input>
        </Col>
        <Col span={4}>
          <Button block onClick={getItems} disabled={state.loading.table}>
            <Space>
              {state.loading.table ? <SyncOutlined spin /> : ""}
              Refresh
            </Space>
          </Button>
        </Col>
        <Col span={4}>
          <Button
            block
            type="primary"
            onClick={() => {
              dispatch(setEditItemId(""));
              dispatch(setVisible(true));
            }}
          >
            Add
          </Button>
        </Col>
      </Row>
      <Spin spinning={state.loading.table}>
        <MainTable
          datas={filteredItems}
          cols={columns}
          onEdit={editBtn}
          onDelete={deleteItem}
        />
      </Spin>
      <PostEdit
        title={linkState.title}
        getItems={getItems}
        state={state}
        dispatch={dispatch}
      ></PostEdit>
    </>
  );
};

export default UserPage;
