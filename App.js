import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

// screens
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import FooterMenu from './src/components/FooterMenu';
import Attendance from './src/screens/TimeTable/Attendance/Attendance';
import AttendanceDetail from './src/screens/TimeTable/Attendance/AttendanceDetail/AttendanceDetail';
import ReportHistory from './src/screens/Report/History/ReportHistory';
import ReportDetail from './src/screens/Report/History/ReportDetail/ReportDetail';


const Stack = createStackNavigator();

export default function App() {
  // Chỉ xin quyền nhận thông báo và lắng nghe notification ở App.js
  
  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
  //                   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // };
  // useEffect(() => {
  //   // if (requestUserPermission()) {
  //   //   messaging().getToken().then(token => {
  //   //     console.log('Token:', token); 
  //   //   });
  //   // } else {
  //   //   console.log('Permission not granted');
  //   // }
    
  //   messaging().getInitialNotification().then(async remoteMessage => {
  //     if (remoteMessage) {
  //       console.log("notification caused app to open from quit state", remoteMessage.notification);
  //     }
  //   });
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log("notification caused app to open from background state", remoteMessage);
  //   });
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log("Message handled in the background!", remoteMessage);
  //   });
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });
  //   return unsubscribe;
  // }, []);
  
  // Điều hướng và các màn hình
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
        <Stack.Screen name="ReportHistory" component={ReportHistory} />
        <Stack.Screen name="ReportDetail" component={ReportDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
