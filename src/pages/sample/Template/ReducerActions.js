//   {
//      visible: true,
//      editItemId: '',
//      input: '',
//      loading: {table: false, modal: false},
//      items: [],
//    }

export const setVisible = (payload) => {
  return {type: 'SET_VISIBLE', payload};
};

export const setItems = (payload) => {
  return {type: 'SET_ITEMS', payload};
};

export const setEditItemId = (payload) => {
  return {type: 'SET_EDIT_ITEM_ID', payload};
};

export const setLoading = (payload) => {
  return {type: 'SET_LOADING', payload};
};

export const setInput = (payload) => {
  return {type: 'SET_INPUT', payload};
};
