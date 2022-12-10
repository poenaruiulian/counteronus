import { Text, View} from 'react-native';


export default function Spacer({height}){
    return(
      <View style={{height:height}}>
        <Text> </Text>
      </View>
  
    )
  }