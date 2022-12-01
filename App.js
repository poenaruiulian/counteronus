// For counter u have to import 'npm install react-native-stopwatch-timer'

import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import {useState, useEffect} from "react";

import { Stopwatch } from 'react-native-stopwatch-timer';

import React from 'react';

export function Spacer({height}){
  return(
    <View style={{height:height}}>
      <Text> </Text>
    </View>

  )
}

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export function HomeScreen(){
    // This is the clock
    //
    // const [date, setDate] = useState(dayjs())
    //
    // useEffect( () => {
    //     const intervat = setInterval(() => {
    //         setDate(dayjs())
    //     }, 1000)
    //
    //     return () => clearInterval(intervat);
    //     }, [])

    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);

    return(
        <View style={styles.container}>
            <View style={styles.counterContainer}>
                <Stopwatch
                    laps
                    msecs
                    start={isStopwatchStart}
                    reset={resetStopwatch}
                    options={options}
                    getTime={(time) => {
                        console.log(time);
                    }}
                />
                <Spacer/>
                <View style={styles.stopwatchButton}>
                    <TouchableHighlight
                        onPress={() => {
                            setIsStopwatchStart(!isStopwatchStart);
                            setResetStopwatch(false);
                        }}
                    >
                        <Text style={styles.stopwatchButtonStyle}>
                            {!isStopwatchStart ? 'START' : 'STOP'}
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => {
                            setIsStopwatchStart(false);
                            setResetStopwatch(true);
                        }}
                    >
                        <Text style={styles.stopwatchButtonStyle}>RESET</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

export function Event({name,day,month,year}){
  return (
    <View style={styles.event}>
      
      <View style={styles.eventDate}>
        <Text style={styles.eventText}>{day} / {month} / {year}</Text>
        <Text>23 days left</Text>
      </View>

      <Text style={[styles.eventText,{fontSize:24}]}>{name}</Text>
    </View>
  )
}

export function EventsScreen({navigation}){

  const [events, setEvents] = useState([])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>

        <Button style={styles.addEventBtn} title="Add event" onPress={
          ()=>{
          navigation.push("Add event",{
            events:events,
            setEvents:setEvents
          })
        }}/>   
        
        {/* Next two lines are for test */}
        <Event name={"First kiss"} day={12} month={12} year={2018}/>
        <Spacer height={10}/>
        {events.map((e)=>{
          return (
          <View>
            <Event name={e.name} day={e.day} month={e.month} year={e.year}/>
            <Spacer height={10}/>
          </View>
          )
        })}

      </ScrollView>
    </View>
  )
}

export function AddEventScreen({navigation,route}){

  
  const [newEvent,setNewEvents] = useState({
    name:"",
    day:0,
    month:0,
    year:0
  })

  return (
    <View style={styles.container}>
      <Text style={{fontSize:32,fontWeight:"bold"}}>Add event</Text>
      <Spacer height={20}/>
      <TextInput 
            style={styles.textInputEvents}
            placeholder="Event name"
            onChangeText={(newText)=>setNewEvents(
              {
                name:newText,
                day:newEvent.day,
                month:newEvent.month,
                year:newEvent.year
              }
            )}
          />
      <Spacer height={10}/>
      <TextInput 
            style={styles.textInputEvents}
            placeholder="Event day"
            onChangeText={(newText)=>setNewEvents(
              {
                name:newEvent.name,
                day:Number(newText),
                month:newEvent.month,
                year:newEvent.year
              }
            )}
          />
      <Spacer height={10}/>
      <TextInput 
            style={styles.textInputEvents}
            placeholder="Event month"
            onChangeText={(newText)=>setNewEvents(
              {
                name:newEvent.name,
                day:newEvent.day,
                month:Number(newText),
                year:newEvent.year
              }
            )}
          />
      <Spacer height={10}/>
      <TextInput 
            style={styles.textInputEvents}
            placeholder="Event year"
            onChangeText={(newText)=>setNewEvents(
              {
                name:newEvent.name,
                day:newEvent.day,
                month:newEvent.month,
                year:Number(newText)
              }
            )}
          />
      <Spacer height={10}/>
      <Button title="Done" onPress={
            ()=>{
              if((newEvent.day != 0 )&&(newEvent.month != 0 )&&(newEvent.year != 0 )&&(newEvent.name != "")){
                route.params.setEvents([...route.params.events,newEvent])
                navigation.navigate("Events")
              }else{alert("Add an event please!")}
            }}/>
    </View>
  )

}


export function EventsNavigation(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Events" component={EventsScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Add event" component={AddEventScreen} options={{headerShown: false}}/> 
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={"Home"} component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name={"Events"} component={EventsNavigation} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
//Option for Stopwatch
const options = {
    container: {
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 10,
        width: '70%',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: 'pink',
    },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },

    counterContainer: {
        height: '30%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderRadius: 25,
    },

    counterStyle: {
      fontSize: 30,
    },

    stopwatchButtonStyle: {
      fontSize: 16,
    },

    stopwatchButton: {
        height: "30%",
        width: "70%",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

  contentContainer:{
    alignItems:"center",
    marginTop:20
  }, 
  scroll:{
    width:"100%",
  },

  event: {
    width:"95%",
    justifyContent:"space-evenly",
    alignItems:"center",
    flexDirection:"row",
    height:100,
    backgroundColor:"white",
    borderRadius: 10,
    shadowColor: "gray",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },

  eventText:{
    fontWeight:"bold",
    fontSize:18
  },

  eventDate:{
    flexDirection:'column',
    alignItems:'center'
  },

  textInputEvents:{
    height:40,
    width:"50%",
    borderWidth:2,
    borderLeftWidth:0,
    borderColor:'black',

  },
});
