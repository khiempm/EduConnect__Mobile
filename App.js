import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import FooterMenu from './src/components/FooterMenu';
import Attendance from './src/screens/TimeTable/Attendance/Attendance';
import AttendanceDetail from './src/screens/TimeTable/Attendance/AttendanceDetail/AttendanceDetail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="FooterMenu" component={FooterMenu} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="AttendanceDetail" component={AttendanceDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
