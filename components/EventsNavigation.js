import {StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useState } from 'react';

import  Spacer  from './Spacer'


const Stack = createNativeStackNavigator()



//Events screen

export function Event({name,day,month,year}){

    let currDay = new Date().getDate();
    let currMonth = new Date().getMonth()+1;
    let currYear = new Date().getFullYear();
  
    if(year < currYear){year=currYear;}
  
    if(month < currMonth){year=currYear+1;}
    else if((month==currMonth)&&(day<currDay)){year=currYear+1;}
  
    let currDate = new Date()
    let eventDate = new Date( month+"/"+day+"/"+year)
  
    let difference = eventDate.getTime() - currDate.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  
  
    return (
      <View style={styles.event}>
        
        <View style={styles.eventDate}>
          <Text style={styles.eventText}>{day} / {month} / {year}</Text>
          <Text>{TotalDays} days left</Text>
        </View>
  
        <Text style={[styles.eventText,{fontSize:24}]}>{name}</Text>
      </View>
    )
  }
  
export function EventsScreen({navigation}){
  
    const [events, setEvents] = useState([])


    return (
      <ImageBackground source={require("../images/background/bg1.jpeg")} style={styles.container}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
        <Spacer height={20}/>
          <TouchableOpacity style={styles.addEventBtn} title="Add event" onPress={
            ()=>{
            navigation.push("Add event",{
              events:events,
              setEvents:setEvents
            })
            
          }}>
            <Image style={{height:40,width:40}} source={require("../images/icons/add-event.png")}/>
          </TouchableOpacity>     
          <Spacer height={20}/>
  
  
          {events.map((e)=>{
            return (
            <View>
              <Event name={e.name} day={e.day} month={e.month} year={e.year}/>
              <Spacer height={10}/>
            </View>
            )
          })}
  
        </ScrollView>
      </ImageBackground>
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
      <ImageBackground source={require("../images/background/bg1.jpeg")} style={styles.container}>
        <Spacer height={30}/>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
        <Text style={{fontSize:32,fontWeight:"bold",color:"#c092e8"}}>Add event</Text>
        <Spacer height={20}/>
        <TextInput 
              style={styles.textInputEvents}
              placeholder="Event name"
              placeholderTextColor={'#e4cdfa'}
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
              placeholderTextColor={'#e4cdfa'}
              keyboardType="number-pad"
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
              placeholderTextColor={'#e4cdfa'}
              keyboardType="number-pad"
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
              placeholderTextColor={'#e4cdfa'}
              keyboardType="number-pad"
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
        <TouchableOpacity title="Done" onPress={
              ()=>{
                if(newEvent.day<1||newEvent.day>31){alert("Something off with the day:"+newEvent.day)}
                else if(newEvent.month<1||newEvent.month>12){alert("Something off with the month:"+newEvent.month)}
                else if(newEvent.year > new Date().getFullYear() || newEvent.year<1){alert("Something off with the year:"+newEvent.year)}
                else if(newEvent.month == 4 && newEvent.day == 31){alert("April has 30 days and you entered 31")}
                else if (newEvent.month == 2){
                  let bisect = false
                  if(((newEvent.year%4==0)&&(newEvent.year%100!=0)) || (newEvent.year%400==0)){bisect=true}
                  if(bisect && newEvent.day>29){alert("The year is a leap year so February can't have more than 29 days")}
                  else{bisect==false && newEvent.day>28}{alert("The year is NOT a leap year so February can't have more than 28 days")}
                }
                else if(newEvent.month == 6 && newEvent.day == 31){alert("June has 30 days and you entered 31")}
                else if(newEvent.month == 9 && newEvent.day == 31){alert("September has 30 days and you entered 31")}
                else if(newEvent.month == 11 && newEvent.day == 31){alert("November has 30 days and you entered 31")}
                else if((newEvent.day != 0 )&&(newEvent.month != 0 )&&(newEvent.year != 0 )&&(newEvent.name != "")){
                  route.params.setEvents([...route.params.events,newEvent])
                  navigation.navigate("Events")
                }else{alert("Add an event please!")}
              }}>
              <Image style={{height:70,width:70}} source={require("../images/icons/checklist.png")}/>
        </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    )
  
}

export default function EventsNavigation(){
    return (
      <Stack.Navigator>
        <Stack.Screen name="Events" component={EventsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Add event" component={AddEventScreen} options={{headerShown: false}}/> 
      </Stack.Navigator>
    )
}


//Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
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
      backgroundColor:"#c092e8",
      borderRadius:"10%",
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
      borderColor:'#e4cdfa',
      color:"#e4cdfa"
    },
  
    invisible:{
      display:"none"
    },
  
    counter:{
      width:"100%",
      flexDirection:"row",
      justifyContent:"space-evenly"
    },
  
    counterItem:{
      flexDirection:"column",
      alignItems:"center",
      borderWidth:2,
      borderRadius:10,
      padding:10,
      borderColor:"white"
    },
  });

