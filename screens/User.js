import React,{ useEffect, useState } from "react"
import { fetchUserContacts } from "../utility/api";
import { ActivityIndicator, View, StyleSheet,Text } from "react-native-web";
import ContactThumbnail from "../components/ContactThumbnail";
import colors from "../utility/colors";


const User=()=>
{
    const[user, setUser]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(false);
    useEffect(()=>{
        fetchUserContacts().then(
            users=>{
                setUser(users);
                setLoading(false);
                setError(false);
            }
        )
        .catch(
            e=>{
                setLoading(false);
                setError(true);
            }
        )
    });
    const{avata, name, phone}=user;
    return(
        <View style={styles.container}>
            {loading&&<ActivityIndicator size="large"/>}
            {error&&<Text>Error...</Text>}
            {!loading&&!error(
                <ContactThumbnail avatar={avata} name={name} phone={phone}/>
            )}
        </View>
    );
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.blue,

    },
});
export default User;