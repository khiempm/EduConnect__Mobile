import { useState } from "react";
import { fetcher, } from "../../api/fetcher";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const useProfile = () => {
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [classes, setClasses] = useState([]);
    const getProfile = async () => {
        const userId = await AsyncStorage.getItem("userId");
        try {
            const response =   await fetcher(`Teacher/${userId}`);
            if(response){
                setEmail(response.email);
                setName(response.fullName);
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    const getClasses = async () => {
        try {
            const teacherId = await AsyncStorage.getItem("teacherId");
            const response =   await fetcher(`Classroom/teacher/${teacherId}`);
            if(response){
                console.log(response);
                setClasses(response);
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    return {
        getProfile,
        email,
        name,
        getClasses,
        classes
    }
}

export default useProfile;