import {StyleSheet,Text, View, TextInput, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CountUp } from 'use-count-up'

import { useState } from 'react';

import  Spacer  from './Spacer'

const Stack = createNativeStackNavigator()

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result =  await SecureStore.getItemAsync(key)
  return result
}


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
      <ImageBackground source={require("../images/background/bg1.jpeg")} style={styles.container}>
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
                setHours:setHours,
                
              })

          }
        }>
          <Image style={{height:40, width:40}}source={require("../images/icons/edit.png")}/>
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
      <ImageBackground source={require("../images/background/bg1.jpeg")} style={styles.container}>
        <Spacer height={30}/>
        <ScrollView  style={styles.scroll} contentContainerStyle={styles.contentContainer}>
          <Text style={{fontSize:32,fontWeight:"bold",color:"#c092e8"}}>Edit the date</Text>
          <Spacer height={20}/>
          <TextInput 
                style={styles.textInputEvents}
                placeholder="Event day"
                placeholderTextColor={'#e4cdfa'}
                keyboardType="number-pad"
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
                keyboardType="number-pad"
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
                keyboardType="number-pad"
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
                keyboardType="number-pad"
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
                keyboardType="number-pad"
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
  
                  if(date.day<1||date.day>31){alert("Something off with the day:"+date.day)}
                  else if(date.month<1||date.month>12){alert("Something off with the month:"+date.month)}
                  else if(date.year > new Date().getFullYear() || date.year<1){alert("Something off with the year:"+date.year)}
                  else if(date.month == 4 && date.day == 31){alert("April has 30 days and you entered 31")}
                  else if (date.month == 2){
                    let bisect = false
                    if(((date.year%4==0)&&(date.year%100!=0)) || (date.year%400==0)){bisect=true}
                    if(bisect && date.year>29){alert("The year is a leap year so February can't have more than 29 days")}
                    else{!bisect && date.year>28}{alert("The year is NOT a leap year so February can't have more than 28 days")}
                  }
                  else if(date.month == 6 && date.day == 31){alert("June has 30 days and you entered 31")}
                  else if(date.month == 9 && date.day == 31){alert("September has 30 days and you entered 31")}
                  else if(date.month == 11 && date.day == 31){alert("November has 30 days and you entered 31")}
                  else if(date.hours<0 || date.hours>23){
                    if(date.hours==24){alert("Did you mean 00?")}
                    alert("Something off with the hour:"+date.hours)
                  }
                  else if(date.minutes<0||date.minutes>59){alert("Something off with the minute:"+date.minutes)}
                  else if(date.day!=0 && date.month!=0 && date.year!=0){
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
                  <Image style={{height:70,width:70}} source={require("../images/icons/checklist.png")}/>
              </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    )
  }
  
export default function HomeNavigation(){
    return(
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="Edit" component={EditDate}  options={{headerShown: false}}/>
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
  