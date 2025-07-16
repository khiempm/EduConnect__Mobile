import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { fetcher, fetcherWithParams, postData, putData } from "../api/fetcher";
import { useState } from "react";
import messaging from '@react-native-firebase/messaging';
import { Platform } from "react-native";

const pushToken = async (userId) => {
  const fcmToken = await messaging().getToken();
  const platform = Platform.OS;
  try {
    const response = await putData(`Teacher/${userId}/fcm`, {
      fcmToken: fcmToken,
      platform: platform,
    });
    if(response){
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
};

const getClassInfo = async (teacherId) => {
  try {
    const response = await fetcherWithParams("Classroom", {teacherId: teacherId});
    if(response){
      const classInfo = response[0].classId;
      await AsyncStorage.setItem("classInfo", classInfo);
    }
  } catch (error) {
    console.log(error);
  }
};

const useLogin = () => {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async (email, password) => {
    try {
      const response = await postData("Auth/Login", {
        email: email,
        password: password,
      });
      if (!response?.token) {
        throw new Error("Failed to login");
      }
      await AsyncStorage.setItem("token", response.token);
      await AsyncStorage.setItem("userId", response.userId);
      await AsyncStorage.setItem("teacherName", response.fullName);
      
      if (response.role === "Teacher") {
        const response1 = await fetcher(`Teacher/${response.userId}`);
        if(response1){
          await AsyncStorage.setItem("teacherId", response1.teacherId);
          await getClassInfo(response1.teacherId);
          await pushToken(response.userId);
          navigation.navigate("FooterMenu");
        }
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return { handleLogin, errorMessage };
};

export default useLogin;
