import React,{ useEffect, useState } from 'react';
import ContactListItem from "../components/ContactListItem";
import { FlatList, View,Text, StyleSheet, ActivityIndicator } from "react-native";
import { fetchContacts } from '../utility/api';
import { fetchContactsError,fetchContactsLoading,fetchContactsSuccess } from '../components/store';
import { State } from 'react-native-gesture-handler';
const keyExtractor=({phone})=>phone;
const Contacts =({navigation})=>
{
    
    const{contacts,loading,error}=useSelector((state)=>state);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchContactsLoading());
        fetchContacts()
        .then(
            contacts=>{
                dispatch(fetchContactsSuccess(contacts));
            }
        )
        .catch(
            e=>{
                dispatch(fetchContactsError());
            }
        )
    },[])
    const contactsSorted= contacts.slice().sort((a,b)=>a.name.localeCompare(b.name));
    const renderContact=({item})=>{
        const{name, avatar, phone}=item;
        return <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={()=>navigation.navigate("Profile",{contact:item})}/>;
    };
    return(
        <View style={StyleSheet.container}>
            {loading && <ActivityIndicator color="blue" size="large"/>}
            {error && <Text>Error...</Text>}
            {!loading && !error &&(
                <FlatList
                data={contactsSorted}
                keyExtractor={keyExtractor}
                renderItem={renderContact}
                />
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        justifycontent:'center',
        flex: 1,
    },
});
export default Contacts;