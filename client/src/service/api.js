import axios from 'axios'

const URL='http://localhost:8000'

export const getAllSensors=async()=>{
     const res=await axios.get(`${URL}/sensor`)
     return res.data;
}
export const addNewSensor=async(sensor)=>{
     const res=await axios.post(`${URL}/sensor`,sensor)
    console.log(res.data)
}
export const deleteSensor = async (id)=>{
     const res= await axios.delete(`${URL}/sensor/${id}`)
     console.log(res.data)
}

export const updateSensor = async (sensor)=>{
     const res= await axios.put(`${URL}/sensor/${sensor._id}`,sensor)
     console.log(res.data)
}