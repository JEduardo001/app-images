import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./screens/home"
import RootStackParamList from './types/navigation';
import AlbumImages from './screens/albumImages';
import { createStackNavigator } from '@react-navigation/stack';
import DetailImage from './screens/detailImage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadImage from './screens/UploadImage';
import Profile from './screens/profile'
import Login from './screens/login';
import Register from './screens/register';
/* 
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>() */

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
        <Tab.Screen name="home" component={Home}   options={{title: "Home", headerShown: false }}/>
        <Tab.Screen name="uploadImage" component={UploadImage}   options={{ title: "Compartir", headerShown: false }}/>
        <Tab.Screen name="profile" component={Profile}   options={{ title: "Perfil", headerShown: false }}/>
    </Tab.Navigator>
  )
}

export default function App() {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName='login'>
      <Stack.Screen name="home" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="albumImages" component={AlbumImages}  options={{ headerShown: false }} />
      <Stack.Screen name="detailImage" component={DetailImage}  options={{ headerShown: false }} />
      <Stack.Screen name="login" component={Login}  options={{ headerShown: false }} />
      <Stack.Screen name="register" component={Register}  options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}