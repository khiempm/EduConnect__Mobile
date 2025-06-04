import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import DashBoard from "../screens/Dashboard";
import Class from "../screens/Class";
import Profile from "../screens/Profile";
import TimeTable from "../screens/TimeTable";
import { Colors } from "../constant/style";

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
        name="Dashboard"
        component={DashBoard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="TimeTable"
        component={TimeTable}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-month" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Class"
        component={Class}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="school" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
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
