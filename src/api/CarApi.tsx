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
        return null; // Handle errors gracefully
      }
}