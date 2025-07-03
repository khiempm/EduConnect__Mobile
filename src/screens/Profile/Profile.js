import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ContainerProfile,
  Header,
  HeaderTitle,
  ProfileContainer,
  ProfileHeader,
  ProfileTitle,
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
import useProfile from "./useProfile";
const { darkLight, black, primary } = Colors;

const Profile = () => {
  const { getProfile, email, name } = useProfile();
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <ContainerProfile>
      <Header>
        <HeaderTitle>Hồ Sơ</HeaderTitle>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons name="logout" size={40} color={primary} />
        </TouchableOpacity>
      </Header>

      <ProfileContainer>
        <ProfileHeader>
          <ProfileTitle>Thông tin cá nhân</ProfileTitle>
        </ProfileHeader>

        <ProfileContent>
          <Row>
            <IconContainer>
              <MaterialIcons name="person" size={24} color={darkLight} />
            </IconContainer>
            <Text>{name}</Text>
          </Row>
          <Separator />
          <Row>
            <IconContainer>
              <MaterialIcons name="email" size={24} color={darkLight} />
            </IconContainer>
            <Text>{email}</Text>
          </Row>

          {/* Classes settings */}
          <Separator />
          <Row style={{ justifyContent: "space-between" }}>
            <ProfileTitle>Danh sách lớp</ProfileTitle>
          </Row>
          <ClassItem>
            <ClassColorBar color="#A259D9" />
            <ClassItemContainer>
              <ClassName>10A1 - Lớp 10A1</ClassName>
              <ClassTerm>Học kỳ: 1 Năm học: 2024-2025</ClassTerm>
            </ClassItemContainer>
          </ClassItem>
          <ClassItem>
            <ClassColorBar color="#2EC4B6" />
            <ClassItemContainer>
              <ClassName>10A2 - Lớp 10A2</ClassName>
              <ClassTerm>Học kỳ: 2 Năm học: 2024-2025</ClassTerm>
            </ClassItemContainer>
          </ClassItem>
          <ClassItem>
            <ClassColorBar color="#3A86FF" />
            <ClassItemContainer>
              <ClassName>10A3 - Lớp 10A3</ClassName>
              <ClassTerm>Học kỳ: 1 Năm học: 2025-2026</ClassTerm>
            </ClassItemContainer>
          </ClassItem>
          <ClassItem>
            <ClassColorBar color="#FFBE0B" />
            <ClassItemContainer>
              <ClassName>10A4 - Lớp 10A4</ClassName>
              <ClassTerm>Học kỳ: 2 Năm học: 2022-2023</ClassTerm>
            </ClassItemContainer>
          </ClassItem>
        </ProfileContent>
      </ProfileContainer>
    </ContainerProfile>
  );
};
export default Profile;
