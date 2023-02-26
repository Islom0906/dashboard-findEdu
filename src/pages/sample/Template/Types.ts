import {UploadFile} from 'antd/lib/upload/interface';

export type states = {
  visible: boolean;
  editItemId: string;
  input: string;
  loading: {table: boolean; modal: boolean};
  items: itemType[];
};

export type itemType = {
  name_Uz: string;
  name_Ru: string;
  name_En: string;
  photo: string;
  _id: string;
  id?: string;
};

export type PostEditPropType = {
  title: string;
  page: string;
  state: states;
  getItems: () => void;
  dispatch: any;
};

export type photoType = {fileList: UploadFile[]; file: UploadFile};
