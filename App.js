import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AntDesign } from '@expo/vector-icons'; 

import { CountUp } from 'use-count-up'

import { useState } from 'react';

export function Spacer({height}){
  return(
    <View style={{height:height}}>
      <Text> </Text>
    </View>

  )
}

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()



//Home/Counter screen
export function HomeScreen({navigation}){

  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [days, setDays] = useState(0)

  const onComplete = () => {
    setMinutes(minutes+1)
    if(minutes==59){
      setMinutes(0);
      setHours(hours+1);
    }
    if(hours==23){
      setHours(0)
      setDays(days+1)
    }
    return { shouldRepeat: true }
  }

  return(
    <ImageBackground source={require("./images/background/bg1.jpeg")} style={styles.container}>
      <Text style={styles.invisible}>
        <CountUp isCounting end={60} duration={60} onComplete={onComplete} />
      </Text>
      <View style={styles.counter}>
        <View style={styles.counterItem}>
          <Text style={{fontSize:32,color:"white"}}>{days}</Text> 
          <Spacer height={10}/>        
          <Text style={{fontWeight:"bold",color:"white"}}>DAYS</Text>
        </View>
        <View style={styles.counterItem}>
          <Text style={{fontSize:32,color:"white"}}>{hours}</Text>    
          <Spacer height={10}/>     
          <Text style={{fontWeight:"bold",color:"white"}}>HOURS</Text>
        </View>
        <View style={styles.counterItem}>
          <Text style={{fontSize:32,color:"white"}}>{minutes}</Text>    
          <Spacer height={10}/>     
          <Text style={{fontWeight:"bold",color:"white"}}>MINUTES</Text>
        </View>
      </View>
      <Spacer height={100}/>
      <TouchableOpacity 
        title="Edit" 
        onPress={
          ()=>
          {
            navigation.navigate("Edit",{
              setDays:setDays,
              setMinutes:setMinutes,
              setHours:setHours
            })

        }
      }>
        <Image style={{height:40, width:40}}source={require("./images/icons/edit.png")}/>
      </TouchableOpacity>
    </ImageBackground>
  )
}

export function EditDate({navigation,route}){

  const [date,setDate] = useState({
    day:0,
    month:0,
    year:0,
    hours:0,
    minutes:0
  })

  return(
    <ImageBackground source={require("./images/background/bg1.jpeg")} style={styles.container}>
      <Text style={{fontSize:32,fontWeight:"bold",color:"#c092e8"}}>Edit the date</Text>
      <Spacer height={20}/>
      <TextInput 
            style={styles.textInputEvents}
            placeholder="Event day"
            placeholderTextColor={'#e4cdfa'}
            onChangeText={(newText)=>setDate(
              {
                day:Number(newText),
                month:date.month,
                year:date.year,
                hours:date.hours,
                minutes:date.minutes
              }
            )}
          />
      <Spacer height={10}/>
      <TextInput 
            style={styles.textInputEvents}
            placeholder="Event month"
            placeholderTextColor={'#e4cdfa'}
            onChangeText={(newText)=>setDate(
              {
                day:date.day,
                month:Number(newText),
                year:date.year,
                hours:date.hours,
                minutes:date.minutes
              }
            )}
          />
      <Spacer height={10}/>
      <TextInput 
            style={styles.textInputEvents}
            placeholder="Event year"
            placeholderTextColor={'#e4cdfa'}
            onChangeText={(newText)=>setDate(
              {
                day:date.day,
                month:date.month,
                year:Number(newText),
                hours:date.hours,
                minutes:date.minutes
              }
            )}
          />
      <Spacer height={10}/>
      <TextInput 
            style={styles.textInputEvents}
            placeholder="Event hour"
            placeholderTextColor={'#e4cdfa'}
            onChangeText={(newText)=>setDate(
              {
                day:date.day,
                month:date.month,
                year:date.year,
                hours:Number(newText),
                minutes:date.minutes
              }
            )}
      />
      <Spacer height={10}/>
      <TextInput 
            style={styles.textInputEvents}
            placeholder="Event minute"
            placeholderTextColor={'#e4cdfa'}
            onChangeText={(newText)=>setDate(
              {
                day:date.day,
                month:date.month,
                year:date.year,
                hours:date.hours,
                minutes:Number(newText)
              }
            )}
      />
      <Spacer height={30}/>
      <TouchableOpacity title="Done" onPress={
            ()=>{

              if(date.day!=0 && date.month!=0 && date.year!=0){
                let eventDate = new Date( date.month+"/"+date.day+"/"+date.year)
                let currDate = new Date()
  
                let difference = currDate.getTime() - eventDate.getTime();
                let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

                let currHours = new Date().getHours();
                let currMinutes = new Date().getMinutes();
                
                if(currHours>date.hours){
                  let startDate = new Date(0,0,0,date.hours,date.minutes)
                  let endDate = new Date(0,0,0,currHours,currMinutes)
                
                  let millis = endDate - startDate
                  let minutes = millis/1000/60

                  currHours = parseInt(minutes/60)
                  currMinutes = minutes - currHours*60
                }else{
                  TotalDays--
                }

                route.params.setDays(TotalDays)
                route.params.setHours(currHours)
                route.params.setMinutes(currMinutes)
  
                navigation.navigate("Home")
              }else{alert("Complete the date!")}
            }}>
              <Image style={{height:70,width:70}} source={require("./images/icons/checklist.png")}/>
          </TouchableOpacity>
    </ImageBackground>
  )
}

export function HomeNavigation(){

  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown: false}}/>
      <Stack.Screen name="Edit" component={EditDate}  options={{headerShown: false}}/>
    </Stack.Navigator>

  )
}

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
    <ImageBackground source={require("./images/background/bg1.jpeg")} style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
      <Spacer height={20}/>
        <TouchableOpacity style={styles.addEventBtn} title="Add event" onPress={
          ()=>{
          navigation.push("Add event",{
            events:events,
            setEvents:setEvents
          })
        }}>
          <Image style={{height:40,width:40}} source={require("./images/icons/add-event.png")}/>
        </TouchableOpacity>     
        <Spacer height={20}/>

        <Event name={"Aniversary"} day={18} month={11} year={2017}/>
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
    <ImageBackground source={require("./images/background/bg1.jpeg")} style={styles.container}>
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
              if((newEvent.day != 0 )&&(newEvent.month != 0 )&&(newEvent.year != 0 )&&(newEvent.name != "")){
                route.params.setEvents([...route.params.events,newEvent])
                navigation.navigate("Events")
              }else{alert("Add an event please!")}
            }}>
            <Image style={{height:70,width:70}} source={require("./images/icons/checklist.png")}/>
      </TouchableOpacity>
    </ImageBackground>
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
        <Tab.Screen name={"Home"} component={HomeNavigation} 
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
