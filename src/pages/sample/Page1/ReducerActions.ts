import { ItemTypes } from "../Types";

export const setEditItemId = (payload: string) => {
  return {type: 'SET_EDIT_ITEM_ID', payload};
};

export const setLoading = (payload: {table: boolean; modal: boolean}) => {
  return {type: 'SET_LOADING', payload};
};

export const setItems = (payload: ItemTypes[]) => {
  return {type: 'SET_ITEMS', payload};
};

export const setVisible = (payload: boolean) => {
  return {type: 'SET_VISIBLE', payload};
};

export const setTitle = (payload: string) => {
  return {type: 'SET_TITLE', payload};
};

export const setInput = (payload: string) => {
  return {type: 'SET_INPUT', payload};
};