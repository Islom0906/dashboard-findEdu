import axios from './axios'

const apiService={
  // user log qilishi uchun url va user malumotlari jonatiladi
  async userLogin(url,user){
    const {data}=axios.post(url,user)
    return data
  },
  // malutmotlarni get qilish uchun url beriladi  
  // url / boshlansin yani /edu shunga oxshagan
  async getData(url){
    const {data} =await axios.get(url)
    return data
  },
   // faqat bitta malumot  get qilish uchun url va idsi beriladi 
  // url / boshlansin yani /edu shunga oxshagan
  async getDataByID(url,id){
    const {data} =await axios.get(`${url}/${id}`)
    return data
  },
   // malutmotni post qilish uchun url va yaratilgan malumot beriladi
  // url / boshlansin yani /edu shunga oxshagan
  async postData(url,formData){
    await axios.post(url,formData)
  },
   // malutmotni edit qilish uchun url,id va yaratilgan malumot beriladi
  // url / boshlansin yani /edu shunga oxshagan
  async EditData(url,id,formData){
    await axios.patch(`${url}/${id}`,formData)
    
  },
   // malutmotni delete qilish uchun url va id  beriladi
  // url / boshlansin yani /edu shunga oxshagan
  async deleteData(url,id){
   await axios.delete(`${url}/${id}`)
  }
}