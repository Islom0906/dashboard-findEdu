import {UploadFile} from 'antd/lib/upload/interface';
import React from 'react';

export type appStateType = {
  visible: boolean;
  editItemId: string;
  input: string;
  loading: appLoadingType;
  items: itemType[];
};

export type appActionType = {
  type: string;
  payload: any;
};

export type appLoadingType = {table: boolean; modal: boolean};

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
  state: appStateType;
  getItems: () => void;
  dispatch: React.Dispatch<appActionType>;
};

export type photoType = {fileList: UploadFile[]; file: UploadFile};
