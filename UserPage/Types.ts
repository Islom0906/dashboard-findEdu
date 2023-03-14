import { UploadFile } from "antd/lib/upload/interface";
import { JwtUserType } from "auth/jwt-auth/JWTAuthAuthProvider";
import React from "react";

export type appStateType = {
  visible: boolean;
  editItemId: string;
  input: string;
  loading: appLoadingType;
  items: JwtUserType[];
};

export type appActionType = {
  type: string;
  payload: any;
};

export type appLoadingType = { table: boolean; modal: boolean };

export type PostEditPropType = {
  title: string;
  state: appStateType;
  getItems: () => void;
  dispatch: React.Dispatch<appActionType>;
};

export type photoType = { fileList: UploadFile[]; file: UploadFile };
