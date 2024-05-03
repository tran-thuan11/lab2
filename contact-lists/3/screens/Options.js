import React from "react"
import{StyleSheet, View} from 'react-native'
import DetailListItem from "../../../components/DetailListItem"

const Options = () =>{
     return(
          <View style={styles.container}>
               <DetailListItem title={"Edit"}/>
               <DetailListItem title={"Language"}/>
               <DetailListItem title={"SignOut"}/>
          </View>
     )
}
const styles = StyleSheet.create({
     container:{
          flex:1,
          backgroundColor: 'white'
     }
})
export default Options