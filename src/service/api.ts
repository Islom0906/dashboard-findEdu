import axios from './axios';

export type formDataType = {
  name_uz: string;
  name_ru: string;
  name_en: string;
  image: string;
}

export type ApiServiceType = {
  userLogin: (url: string, user: any) => Promise<any>;
  getData: (url: string) => Promise<any>;
  getDataByID: (url: string, id: string) => Promise<any>;
  postData: (url: string, formData: formDataType | FormData) => Promise<void>;
  editData: (url: string, formData: formDataType, id: string) => Promise<void>;
  deleteData: (url: string, id: string) => Promise<void>;
};

const apiService: ApiServiceType = {
  // user log qilishi uchun url va user malumotlari jonatiladi
  async userLogin(url: string, user: any) {
    const {data}: any = await axios.post(url, user);
    return data;
  },
  // malutmotlarni get qilish uchun url beriladi
  // url / boshlansin yani /edu shunga oxshagan
  async getData(url: string) {
    const {data}: {data: any} = await axios.get(url);
    return data;
  },
  // faqat bitta malumot  get qilish uchun url va idsi beriladi
  // url / boshlansin yani /edu shunga oxshagan
  async getDataByID(url: string, id: string) {
    const {data}: {data: any} = await axios.get(`${url}/${id}`);
    return data;
  },
  // malutmotni post qilish uchun url va yaratilgan malumot beriladi
  // url / boshlansin yani /edu shunga oxshagan
  async postData(url: string, formData: formDataType | FormData) {
    await axios.post(url, formData);
  },
  // malutmotni edit qilish uchun url,id va yaratilgan malumot beriladi
  // url / boshlansin yani /edu shunga oxshagan
  async editData(url: string, formData: formDataType, id: string) {
    await axios.patch(`${url}/${id}`, formData);
  },
  // malutmotni delete qilish uchun url va id  beriladi
  // url / boshlansin yani /edu shunga oxshagan
  async deleteData(url: string, id: string) {
    await axios.delete(`${url}/${id}`);
  },
};
export default apiService;
