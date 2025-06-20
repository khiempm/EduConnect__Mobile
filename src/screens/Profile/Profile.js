import React from "react";
import { Switch, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ContainerProfile,
  Header,
  HeaderTitle,
  ProfileContainer,
  ProfileHeader,
  ProfileTitle,
  ProfileEdit,
  ProfileEditContainer,
  SectionTitle,
  Row,
  IconContainer,
  Separator,
  ClassItem,
  ClassColorBar,
  ProfileContent,
  ClassName,
  ClassItemContainer,
  ClassTerm,
} from "../../constant/styleProfile";
import { Colors } from "../../constant/color";
import { View } from "react-native";

const { black, brand, darkLight } = Colors;

const Profile = () => {
  return (
    <ContainerProfile>
      <Header>
        <HeaderTitle>Hồ Sơ</HeaderTitle>
      </Header>

      <ProfileContainer>

        <ProfileHeader>
          <ProfileTitle>Cài đặt hồ sơ</ProfileTitle>
          <ProfileEditContainer>
            <ProfileEdit>Chỉnh sửa</ProfileEdit>
            <View style={{ alignItems: "center", justifyContent: "center", justifyContent: "center" }}>
              <MaterialIcons name="arrow-forward-ios" size={16} color={black} />
            </View>
          </ProfileEditContainer>
        </ProfileHeader>

        <ProfileContent>
          <Row>
            <IconContainer>
              <MaterialIcons name="person" size={24} color={darkLight} />
            </IconContainer>
            <Text>Florencia Yannuzzi</Text>
          </Row>
          <Separator />
          <Row>
            <IconContainer>
              <MaterialIcons name="email" size={24} color={darkLight} />
            </IconContainer>
            <Text>florenciayannuzzi@gmail.com</Text>
          </Row>

          {/* Classes settings */}
          <Separator />
          <Row style={{ justifyContent: "space-between" }}>
            <SectionTitle>Danh sách lớp</SectionTitle>
          </Row>
          <ClassItem>
            <ClassColorBar color="#A259D9" />
            <ClassItemContainer>
              <ClassName>10A1 - Lớp 10A1</ClassName>
              <ClassTerm>Học kỳ: 1  Năm học: 2024-2025</ClassTerm>
            </ClassItemContainer>
          </ClassItem>
          <ClassItem>
            <ClassColorBar color="#2EC4B6" />
            <ClassItemContainer>
              <ClassName>10A2 - Lớp 10A2</ClassName>
              <ClassTerm>Học kỳ: 2  Năm học: 2024-2025</ClassTerm>
            </ClassItemContainer>
          </ClassItem>
          <ClassItem>
            <ClassColorBar color="#3A86FF" />
            <ClassItemContainer>
            <ClassName>10A3 - Lớp 10A3</ClassName>
            <ClassTerm>Học kỳ: 1  Năm học: 2025-2026</ClassTerm>
            </ClassItemContainer>
          </ClassItem>
          <ClassItem>
            <ClassColorBar color="#FFBE0B" />
            <ClassItemContainer>
              <ClassName>10A4 - Lớp 10A4</ClassName>
              <ClassTerm>Học kỳ: 2  Năm học: 2022-2023</ClassTerm>
            </ClassItemContainer>
          </ClassItem>
        </ProfileContent>
      </ProfileContainer>
    </ContainerProfile>
  );
};
export default Profile