import { View,Text,StyleSheet } from 'react-native';
import DetailListItem from "../components/DetailListItem"
import React,{useState,useEffect} from 'react';

const Options=()=>
{
    return(
        <View style={styles.container}>
            <DetailListItem title="Update Profile"/>
            <DetailListItem title="Change Language"/>
            <DetailListItem title="Sign Out"/>
        </View>
    );
}
const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColer:'white',
        },
    }
);
export default Options;