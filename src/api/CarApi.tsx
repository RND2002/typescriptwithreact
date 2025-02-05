import {  ICarResponse } from "../utils/types";
import { apiClient } from "./apiclient";

export const postCarDataService=async (carData:FormData,token:string):Promise<ICarResponse |null>=>{
    try{
        const response=await apiClient.post(`/car`,carData,{
            headers:{
                Authorization:'Bearer '+token
            }
        })
        return response.data
    }catch (error) {
        console.error("Car data submission failed:", error);
        return null; 
      }
}

export const getCarDataService = async (userId: string, token: string) => {
    try {
        const response = await apiClient.get(`/car/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        return response.data; 
    } catch (error) {
        console.error("Cannot fetch user data:", error); 
        return null;
    }
};

export const getCarMetaData=async (userId:string,token:string)=>{
    try{
        const response=await apiClient.get(`/car/getAllCars/${userId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            
        })

        return response.data
    }catch(error){
        console.log("Can not fetch Car Data",error)
        return null
    }
}
