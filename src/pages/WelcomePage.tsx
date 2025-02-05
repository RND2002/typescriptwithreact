// import React, { useEffect, useState } from "react"
// import { ICarData } from "../utils/types"
// import { getCarDataService, getCarMetaData, postCarDataService } from "../api/CarApi"
// import { Input } from "../component/Input"
// import { Button } from "react-bootstrap"


// const WelcomePage = () => {
//     const [carData,setCarData]=useState<ICarData>({
//         name:'',
//         modelName:'',
//         id:'',
//         image:null
//     })

//     const [carsMetaData,setCarsMetaData]=useState([])

//     const loginData = JSON.parse(localStorage.getItem("loginDetails") || "{}");
// //   console.log("Login Data Here",loginData.token)
//   const token=loginData.token
//   const userId=loginData.userDetails.id
//   console.log(loginData)

//     const handleFormData=(e:React.ChangeEvent<HTMLInputElement>)=>{
//         const {name,value}=e.target
//         setCarData((prevData)=>({
//             ...prevData,
//             [name]:value
//         }))
//     }

//     const handleImageFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
//         const file=e.target.files? e.target.files[0]:null
//         setCarData((prevData)=>({
//             ...prevData,
//             image:file
//         }))
//     }

//     const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
//         e.preventDefault()
//         const formData=new FormData();
//         formData.append("name",carData.name)
//         formData.append("modelName",carData.modelName)
//         formData.append("id",userId)
//         if (carData.image) {
//             formData.append('image', carData.image);
//         }

//        try{
//         console.log(formData.values)
//         const response=await postCarDataService(formData,token)
//         if(response && response.success){
//             console.log(response.car)
//         }else{
//             console.error("Car Addition Failed:", response?.message);
//         }
//        }catch(error){
//         console.error("API Error:", error);
//        }
//     }

//     useEffect(() => {
//         const fetchCarData = async () => {
//             try {
//                 const response = await getCarDataService(userId, token);
//                 setCarIds(response.cars)
//                 console.log("Car Data:", response);
//             } catch (error) {
//                 console.error("Error fetching car data:", error);
//             }
//         };
    
//         fetchCarData();
//     }, []);

//       // Second useEffect: Fetch car metadata when carIds are updated
//   useEffect(() => {
//     const fetchCarMetaData = async () => {
      

//       console.log("Fetching car metadata for:",);
//       try {
//         const response = await getCarMetaData(userId, token);
//         console.log("Car Metadata:", response);
//         setCarsMetaData(response.cars)
//       } catch (error) {
//         console.error("Error fetching car metadata:", error);
//       }
//     };

//     fetchCarMetaData();
//   }, [userId]);
//   return (
//     <div>
//        <form onSubmit={handleSubmit}>
//        <Input name="name" placeholder="Enter Car Name" label="Car Name" value={carData.name} onChange={handleFormData}/>
//         <Input name="modelName" placeholder="Enter Car's Model Name" label="Model Name" value={carData.modelName} onChange={handleFormData}/>
//         <Input type="file" placeholder="Select Car's Image" name="image"  onChange={handleImageFileChange} />
//         <Button type="submit" variant="primary" className="mt-3">
//           Add Car
//         </Button>
//        </form>
        
//     </div>
//   )
// }

// export default WelcomePage
import React, { useEffect, useState } from "react";
import { ICarData } from "../utils/types";
import {  getCarMetaData, postCarDataService } from "../api/CarApi";
import { Input } from "../component/Input";
import { Button, Card, Row, Col } from "react-bootstrap";
import {  useSnackbar } from "notistack";
const WelcomePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [carData, setCarData] = useState<ICarData>({
    name: "",
    modelName: "",
    id: "",
    image: null,
  });

  const [carsMetaData, setCarsMetaData] = useState([]);

  const loginData = JSON.parse(localStorage.getItem("loginDetails") || "{}");
  const token = loginData.token;
  const userId = loginData.userDetails.id;

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCarData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

 
  // useEffect(() => {
  //   const fetchCarData = async () => {
  //     try {
  //       const response = await getCarDataService(userId, token);
  //      // setCarIds(response.cars);
  //       //console.log("Car Data:", response);
  //     } catch (error) {
  //       console.error("Error fetching car data:", error);
  //     }
  //   };

  //   fetchCarData();
  // }, []);

  // Fetch car metadata when carIds are updated
  const fetchCarMetaData = async () => {
    try {
      const response = await getCarMetaData(userId, token);
      console.log("Car Metadata:", response);
      setCarsMetaData(response.cars);
    } catch (error) {
      console.error("Error fetching car metadata:", error);
    }
  };
  useEffect(() => {
   

    fetchCarMetaData();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", carData.name);
    formData.append("modelName", carData.modelName);
    formData.append("id", userId);
    if (carData.image) {
      formData.append("image", carData.image);
    }
  
    try {
      const response = await postCarDataService(formData, token);
      if (response && response.success) {
        enqueueSnackbar("Car added successfully!", { variant: "success" });
        fetchCarMetaData()
      } else {
        enqueueSnackbar(`Car addition failed: ${response?.message}`, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("API Error. Please try again.", { variant: "error" });
      console.error("API Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Form to Add Car */}
      <h2 style={{ fontWeight: 700,textAlign:"center" }}>Add your car</h2>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Car Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={carData.name}
            onChange={handleFormData}
            placeholder="Enter Car Name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="modelName" className="form-label">Model Name</label>
          <input
            type="text"
            className="form-control"
            id="modelName"
            name="modelName"
            value={carData.modelName}
            onChange={handleFormData}
            placeholder="Enter Car's Model Name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Car Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageFileChange}
          />
        </div>

        <Button type="submit" variant="primary">Add Car</Button>
      </form>

      {/* Display Cars Metadata */}
      <h3 className="mb-4">Cars Information</h3>
       <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {carsMetaData && carsMetaData.length > 0 ? (
          carsMetaData.map((car: any) => {
            //const base64String = `data:image/jpeg;base64,${car.imageBase64}`;
            //console.log(base64String)
            return (
              <Col key={car._id}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={`data:image/jpeg;base64,${car.imageBase64}`}
                    alt={car.name}
                    className="card-img-top"
                  />
                  <Card.Body>
                    <Card.Title>{car.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{car.model}</Card.Subtitle>
                    {/* <Card.Text>
                      <strong>Model:</strong> {car.model}
                    </Card.Text> */}
                    <Button variant="info" className="w-100">View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <p>No cars found.</p>
        )}
      </Row> 
    </div>
  );
};

export default WelcomePage;

