// types.ts
export interface ILoginData {
    email: string;
    password: string;
  }
  
  export interface IUserDetails {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  }
  
  export interface ILoginResponse {
    message: string;
    success: boolean;
    data: {
      userDetails: IUserDetails;
      token: string;
    };
  }

  export interface ICarData {
    name: string;
    modelName: string;
    id: string;
    image: File | null; 
  }

  export interface ICarResponse {
    message: string;
    success: boolean;
    car: ICar;
  }
  
  export interface ICar {
    name: string;
    modelName: string;
    imagePath: string;
    owner: string; // User ID
    _id: string; // Car ID
    createdAt: string; // ISO 8601 timestamp
    updatedAt: string; // ISO 8601 timestamp
    __v: number; // Version key (MongoDB)
  }
  
  
  