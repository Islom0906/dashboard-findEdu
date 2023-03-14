import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Spin,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { setLoading, setVisible } from "./ReducerActions";
import { photoType, PostEditPropType } from "./Types";
import { UploadFile } from "antd/lib/upload/interface";
import jwtAxios from "auth/jwt-auth/jwtaxios";
import Dragger from "antd/es/upload/Dragger";
import { JwtUserType } from "auth/jwt-auth/JWTAuthAuthProvider";

function loadImage(photo: any): any {
  return new Promise((resolve) => {
    const reader = new FileReader();
    photo && reader.readAsDataURL(photo);
    reader.onload = () => {
      resolve(reader.result);
    };
  });
}

function PostEdit({ title, state, getItems, dispatch }: PostEditPropType) {
  // STATES

  const [editItem, setEditItem] = useState<JwtUserType>(null);
  const [form] = Form.useForm();
  //USEEFFECTS

  useEffect(() => {
    form.setFieldsValue(editItem);
  }, [editItem]);

  //FETCH requests
  useEffect(() => {
    form.resetFields();
    if (!state.editItemId) {
      setEditItem(null);
      return;
    }
    dispatch(setLoading({ ...state.loading, modal: true }));

    jwtAxios.get(`/users/${state.editItemId}`).then((res) => {
      dispatch(setLoading({ ...state.loading, modal: false }));

      setEditItem(res.data.data.user);
    });
  }, [state.editItemId]);

  const postItem = (data: JwtUserType & { photo: any }) => {
    const formData: FormData = new FormData();
    data?.email && formData.append("email", data?.email);
    data?.name && formData.append("name", data?.name);
    data?.role && formData.append("role", data?.role);
    data?.password && formData.append("password", data?.password);
    data?.photo?.file?.originFileObj &&
      data?.photo &&
      formData.append("photo", data.photo.file.originFileObj);

    console.log(Object.fromEntries(formData.entries()));
    dispatch(setLoading({ ...state.loading, modal: true }));

    jwtAxios[editItem?._id ? "patch" : "post"](
      `/users/${editItem?._id || ""}`,
      formData
    )
      .finally(() => {
        dispatch(setLoading({ ...state.loading, modal: false }));
      })
      .then(() => {
        message.success("Succesfuly posted", 2);
        if (!editItem?._id) {
          form.resetFields();
        }
        dispatch(setVisible(false));
        getItems();
      })
      .catch((err: any) => {
        console.log(err);

        message.error(err.response?.data?.error || err.message, 3);
      });
  };

  // Handlers
  const handleSubmit = () => {
    postItem(form.getFieldsValue());
  };

  //UPLOAD DRAGGER FUNCTIONS

  return (
    <Modal
      onCancel={() => {
        dispatch(setVisible(false));
      }}
      onOk={form.submit}
      okText={"OK"}
      visible={state.visible}
      style={{ top: 50 }}
      title={title}
      width={600}
    >
      <Spin spinning={state.loading.modal}>
        <Form
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 5 }}
          // wrapperCol={{span: 16}}
          initialValues={{
            role: "user",
          }}
        >
          <Form.Item
            name="email"
            label={"Email"}
            rules={[
              {
                required: true,
                message: "you need to provide email",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label={"Name"}
            rules={[
              {
                required: true,
                message: "You need to provide name",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={"Password"}
            rules={[
              {
                required: true,
                message: "You need to provide paassword",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label={"Role"} hasFeedback>
            <Select
              options={[
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
              ]}
            />
          </Form.Item>
          <Form.Item name="photo">
            <Dragger beforeUpload={() => true}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

export default PostEdit;
