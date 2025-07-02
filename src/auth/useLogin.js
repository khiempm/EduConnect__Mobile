import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { postData } from "../api/fetcher";
import { useState } from "react";
// Ví dụ gửi token lên server
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
      if (response.role === "teacher") {
        navigation.navigate("FooterMenu");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return { handleLogin, errorMessage };
};

export default useLogin;
