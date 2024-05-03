import React, {useState, useEffect} from 'react'
import{StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native'
import {fetchContacts}  from '../../../ultility/api'
import ContactThumbnail from '../../../components/ContactThumbnail'

const keyExtractor = ({phone}) => phone
const Favourites = ({navigation}) =>{
     const[contacts, setContacts] = useState([])
     const[loading, setLoading] = useState(false)
     const[error, setError] = useState(false)

     useEffect(()=>{
          fetchContacts()
          .then(
               contacts =>{
                    setContacts(contacts)
                    setLoading(false)
                    setError(false)
               }).catch(
               e =>{
                    setLoading(false)
                    setError(true)
               }
          )
     })
     const renderFavoriteThumbnail = ({item}) =>{
          const{avatar} = item
          return(
               <ContactThumbnail
                    avatar={avatar}
                    onPress={() => navigation.navigate('Profile', {contact : item})} />
          )
     }
     const Favourites = contacts.filter(contact => contact.favorite)

     return(
          <View style={styles.container}>
               {loading && <ActivityIndicator size="large"/>}
               {error && <Text>Error...</Text>}
               {!loading && !error && (
                    <FlatList 
                    data={Favourites}
                    keyExtractor={keyExtractor}
                    numColumns={3}
                    contentContainerStyle={styles.list}
                    renderItem={renderFavoriteThumbnail}/>
               )}
          </View>
     )
}
const styles = StyleSheet.create({
     container:{
          flex:1,
          backgroundColor: 'white',
          justifyContent: 'center'
     },
     list:{
          alignItems: 'center'
     }
})
export default Favourites