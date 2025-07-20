import React, { useState } from "react";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  StyledInputLabel,
  LeftIcon,
  RightIcon,
  StyledTextInput,
  ButtonText,
  MsgBox,
  Line,
} from "../constant/style";
import { assets } from "./../../assets/assets";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, TouchableOpacity, Text} from "react-native";
import { Fontisto, Ionicons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constant/color"; 
import useLogin from "../auth/useLogin";
import Loading from "../components/Loading";

const {brand, darkLight, primary} = Colors;
const Login = () => {
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const { handleLogin, errorMessage } = useLogin();
  const [loading, setLoading] = useState(false);
  return (
    <StyledContainer style={{paddingTop: 70}}>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo resizeMode="cover" source={assets.chatbot} />
        <PageTitle>EduConnect</PageTitle>
        <SubTitle>Hello Teacher!</SubTitle>
        {loading && <Loading visible={loading} />}
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              await handleLogin(values.email, values.password);
            } finally {
              setLoading(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
                <MyTextInput
                    label="Tài Khoản"
                    icon="mail"
                    placeholder="johndoe@gmail.com"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                />
                <MyTextInput
                    label="Mật Khẩu"
                    icon="lock"
                    placeholder="* * * * * * * *"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                />
                {errorMessage ? <Text style={{color: "red"}}>Tài khoản hoặc mật khẩu không chính xác</Text> : <MsgBox>...</MsgBox>}
                <Line />
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Đăng Nhập</ButtonText>
                </StyledButton>
                {/* <StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto name="google" size={25} color={primary} />
                  <ButtonText google={true}>Đăng Nhập Với Google</ButtonText>
                </StyledButton> */}
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
  <View>
    <LeftIcon>
      <Octicons name={icon} size={25} color={brand} />
    </LeftIcon>
    <StyledInputLabel>{label}</StyledInputLabel>
    <StyledTextInput {...props} />
    {isPassword && (
      <RightIcon>
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? "eye-off" : "eye"} size={25} color={darkLight} />
        </TouchableOpacity>
      </RightIcon>
    )}
  </View>
  )
};
export default Login;
