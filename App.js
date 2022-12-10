import { Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AntDesign } from '@expo/vector-icons'; 

import  HomeNavigation  from './components/HomeNavigation'
import  EventsNavigation  from './components/EventsNavigation'


const Tab = createBottomTabNavigator()

//App
export default function App() {


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle:{backgroundColor:"pink"},
          tabBarBackground:()=>(
            <Image source={require("./images/background/love1.jpg")}/>
          ),
          tabBarActiveTintColor:'#c848d4'
        }}
      >
        <Tab.Screen name={"Home"} children={HomeNavigation} 
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) =>
          <AntDesign name={focused ? 'heart' : 'hearto'} size={size} color={color}/>  ,
          }}/>
        <Tab.Screen name={"Events"} component={EventsNavigation} 
          options={{
            headerShown: false,
            tabBarIcon: ({focused, color, size}) =>
            <AntDesign name={focused ? 'heart' : 'hearto'} size={size} color={color}/>  
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}



