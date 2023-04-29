import {UploadFile} from 'antd/lib/upload/interface';
import React from 'react';

export type appStateType = {
  visible: boolean;
  editItemId: string;
  input: string;
  loading: appLoadingType;
  items: itemType[];
};

export interface Links {
  link: string
  name: string
}

export interface Branches {
  mainAddress: string
  name: string
  onMap: string
  phones: string[]
}

export interface ItemTypes {
  branches: Branches[];
  description_en: string; 
  description_ru: string;
  description_uz: string
  image: {_id: string, path: string}
  languages: itemType[]
  links: Links[]
  mainAddress: string
  name_en: string
  name_ru: string
  name_uz: string
  onMap: string
  onlineExists: boolean
  others: itemType[]
  phones:  string[]
  programs: itemType[]
  subjects: itemType[]
  _id: string
}

export interface StateTypes {
  visible: boolean,
  title: string,
  items: ItemTypes[],
  editItemId: null | string,
  loading: {table: boolean, modal: boolean},
  input: string
}

export type appActionType = {
  type: string;
  payload: any;
};

export type appLoadingType = {table: boolean; modal: boolean};

export type itemType = {
  name_uz: string;
  name_ru: string;
  name_en: string;
  image: imageType;
  _id: string;
  id?: string;
};

export type imageType = {
  _id: string,
  path: string
}

export type PostEditPropType = {
  title: string;
  page: string;
  state: appStateType;
  getItems: () => void;
  dispatch: React.Dispatch<appActionType>;
};

export type photoType = {fileList: UploadFile[]; file: UploadFile};
