import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { fetcher, postData, putData } from "../api/fetcher";
import { useState } from "react";
import messaging from '@react-native-firebase/messaging';
import { Platform } from "react-native";

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
      await AsyncStorage.setItem("role", response.role);
      await AsyncStorage.setItem("teacherName", response.fullName);
      
      if (response.role === "Teacher") {
        const response1 = await fetcher(`Teacher/${response.userId}`);
        if(response1){
          await AsyncStorage.setItem("teacherId", response1.teacherId);
            //Lấy FCM Token và platform
            const fcmToken = await messaging().getToken();
            const platform = Platform.OS;
            console.log(fcmToken, platform);
          try {
            const response2 = await putData(`Teacher/${response.userId}/fcm`, {
              fcmToken: fcmToken,
              platform: platform,
            });
            if(response2){
              console.log(response2);
            }
          } catch (error) {
            console.log(error);
          }
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
