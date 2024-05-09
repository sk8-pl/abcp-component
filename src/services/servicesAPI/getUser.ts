import { baseUrlAPI } from "../../config";
import { User } from "../../types/types";

const getUserAPI = async (id: number) => {
    const response = await fetch(`${baseUrlAPI}/${id}`);
      
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json() as User;
}

export default getUserAPI;
