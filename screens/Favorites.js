import React,{useState,useEffect} from 'react';
import { StyleSheet,Text,View,FlatList,ActivityIndicator } from 'react-native';
import { fetchContacts } from '../utility/api';
import ContactThumbnail from '../components/ContactThumbnail';
const keyExtractor=({phone})=>phone;
const Favorites=()=>
{
    const[contacts,loading,error]= useSelector((state)=>state);
    useEffect(()=>{
        fetchContacts().then(contacts=>{
            setContacts(contacts);
            setLoading(loading);
            setError(false);
        })
        .catch(
            e=>{
                setLoading(false);
                setError(true);
            }
        )
    })
    const renderFavoriteThumbnail =({item})=>{
        const{avata}=item;
        return(
            <ContactThumbnail
            avatar={avata}
        onPress={()=>navigator.navigate('Profile',{contact:item})}
    />
        );
    };
    const favorites=contacts.filter(contact=>contact.favorite);
    return(
        <View style={styles.container}>
            {loading&&<ActivityIndicator size="large"/>}
            {error&&<Text>Error...</Text>}
            {!loading&&!error&&(
                <FlatList
                data={favorites}
                keyExtractor={keyExtractor}
                numColumns={3}
                contentContainerStyle={styles.list}
                renderItem={renderFavoriteThumbnail}/>
            )}
        </View>
    );
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        justifyContent:'center',
        flex:1,
    },
    list:{
        alignItems:'center',
    },
});
export default Favorites;