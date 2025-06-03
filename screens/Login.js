import React, { useState } from "react";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  Colors,
  StyledButton,
  StyledInputLabel,
  LeftIcon,
  RightIcon,
  StyledTextInput,
  ButtonText,
  MsgBox,
  Line, 
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../constant/style";
import { assets } from "../constant/assets";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View } from "react-native";
import { Fontisto, Ionicons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const {brand, darkLight, primary} = Colors;
const Login = () => {
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo resizeMode="cover" source={assets.chatbot} />
        <PageTitle>EduConnect</PageTitle>
        <SubTitle>Hello Teacher!</SubTitle>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
                <MyTextInput
                    label="Email Address"
                    icon="mail"
                    placeholder="johndoe@gmail.com"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                />
                <MyTextInput
                    label="Password"
                    icon="lock"
                    placeholder="* * * * * * * *"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={true}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                />
                <MsgBox>...</MsgBox>
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>
                <Line />
                <StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto name="google" size={25} color={primary} />
                  <ButtonText google={true}>Sign in with Google</ButtonText>
                </StyledButton>
                <ExtraView>
                    <ExtraText>Don't have an account?</ExtraText>
                    <TextLink>
                      <TextLinkContent onPress={() => navigation.navigate("SignUp")}>Sign up</TextLinkContent>
                    </TextLink>
                  </ExtraView>
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
      <RightIcon onPress={() => setHidePassword(!hidePassword)}>
        <Ionicons name={hidePassword ? "eye-off" : "eye"} size={25} color={darkLight} />
      </RightIcon>
    )}
  </View>
  )
};
export default Login;
