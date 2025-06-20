import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import DashBoard from "../screens/DashBoard/DashBoard";
import Profile from "../screens/Profile/Profile";
import TimeTable from "../screens/TimeTable/TimeTableFunction";
import { Colors } from "../constant/color";
import Report from "../screens/Report/Report";


const Tab = createBottomTabNavigator();
const {brand, darkLight} = Colors;
export default function FooterMenu() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: brand,
        tabBarInactiveTintColor: darkLight,
        tabBarStyle: {
          height: 75,
          paddingBottom: 25,
          paddingTop: 10
        }
      }}
    >
      <Tab.Screen
        name="Thông Báo"
        component={DashBoard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Lịch"
        component={TimeTable}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-month" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Báo Cáo"
        component={Report}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="analytics" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Cá Nhân"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
