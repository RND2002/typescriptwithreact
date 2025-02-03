import React, { useState } from "react"
import { ICarData } from "../utils/types"
import { postCarDataService } from "../api/CarApi"
import { Input } from "../component/Input"
import { Button } from "react-bootstrap"


const WelcomePage = () => {
    const [carData,setCarData]=useState<ICarData>({
        name:'',
        modelName:'',
        id:'',
        image:null
    })

    const loginData = JSON.parse(localStorage.getItem("loginDetails") || "{}");
//   console.log("Login Data Here",loginData.token)
  const token=loginData.token
  const userId=loginData.userDetails.id
  console.log(loginData)

    const handleFormData=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setCarData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }

    const handleImageFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file=e.target.files? e.target.files[0]:null
        setCarData((prevData)=>({
            ...prevData,
            image:file
        }))
    }

    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData=new FormData();
        formData.append("name",carData.name)
        formData.append("modelName",carData.modelName)
        formData.append("id",userId)
        if (carData.image) {
            formData.append('image', carData.image);
        }

       try{
        console.log(formData.values)
        const response=await postCarDataService(formData,token)
        if(response && response.success){
            console.log(response.car)
        }else{
            console.error("Car Addition Failed:", response?.message);
        }
       }catch(error){
        console.error("API Error:", error);
       }
    }
  return (
    <div>
       <form onSubmit={handleSubmit}>
       <Input name="name" placeholder="Enter Car Name" label="Car Name" value={carData.name} onChange={handleFormData}/>
        <Input name="modelName" placeholder="Enter Car's Model Name" label="Model Name" value={carData.modelName} onChange={handleFormData}/>
        <Input type="file" placeholder="Select Car's Image" name="image"  onChange={handleImageFileChange} />
        <Button type="submit" variant="primary" className="mt-3">
          Add Car
        </Button>
       </form>
        
    </div>
  )
}

export default WelcomePage