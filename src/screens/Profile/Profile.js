import React, { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../components/Loading";
const { darkLight, primary } = Colors;

const Profile = () => {
  const { getProfile, email, name, getClasses, classes } = useProfile();
  const navigation = useNavigation();
  useEffect(() => {
    getProfile();
    getClasses();
  }, []);

  // Hàm logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <ContainerProfile>
      <Header>
        <HeaderTitle>Hồ Sơ</HeaderTitle>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={40} color={primary} />
        </TouchableOpacity>
      </Header>
      {classes.length === 0 ? <Loading visible={true} /> : (
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
          {classes.map((item, index) => (
            <ClassItem key={index} onPress={() => navigation.navigate("ClassDetail", { classId: item.classId, className: item.className, year: item.startDate.split('-')[0]+"-"+item.endDate.split('-')[0] })}>
              <ClassColorBar color="#A259D9" />
              <ClassItemContainer>
                <ClassName>{item.className} - Lớp {item.className}</ClassName>
                <ClassTerm>Năm học: {item.startDate.split('-')[0]} - {item.endDate.split('-')[0]}</ClassTerm>
              </ClassItemContainer>
            </ClassItem>
          ))}
        </ProfileContent>
      </ProfileContainer>
      )}
    </ContainerProfile>
  );
};


export default Profile;
