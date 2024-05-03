import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Profile from "./screens/Profile";
import Contacts from "./screens/Contacts";
import colors from '../../ultility/colors';
import Favourites from '../3/screens/Favourites';
import User from '../3/screens/User';
import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Options from '../3/screens/Options';

const getTabBarIcon = icon => ({ color }) => (
  <MaterialIcons name={icon} size={26} style={{ color }} />
);

const Stack = createStackNavigator();

const ContactsScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
        headerTitleAlign: 'center'
      }}>
      <Stack.Screen name='Contacts' component={Contacts} options={{ title: "Contacts" }} />
      <Stack.Screen name='Profile' component={Profile} options={({ route }) => {
        const { contact } = route.params;
        const { name } = contact;
        return {
          title: name.split(' ')[0],
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.blue
          }
        }
      }} />
    </Stack.Navigator>
  );
}

const FavouritesScreens = () => {
  return (
    <Stack.Navigator initialRouteName='Favorite'>
      <Stack.Screen name='Favorite' component={Favourites} options={{ title: 'Favorite' }} />
      <Stack.Screen name='Profile' component={Profile} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
}

const UserScreens = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='Profile'>
      <Stack.Screen name='Profile' component={User} options={{headerTitle:"Profile", headerTintColor:'white',headerStyle:{backgroundColor: colors.blue}, 
    headerRight:() => (
      <MaterialIcons name='settings' size={24} style={{color:'white', marginRight: 10}} onPress={() => navigation.navigate('Options')}/>
    )}}/>
      <Stack.Screen name='Options' component={Options} options={{title:"Options"}}/>
    </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer style={{flex:1}}>
      <Tab.Navigator
        initialRouteName='Contacts'
        barStyle={{ backgroundColor: colors.blue }}
        labeled={true}
        activeTintColor='black'
        inactiveColor='white'>
        <Tab.Screen name='ContactsScreen' component={ContactsScreens} options={{ tabBarIcon: getTabBarIcon('list') }} />
        <Tab.Screen name='FavoriteScreen'  component={FavouritesScreens} options={{ tabBarIcon: getTabBarIcon('star') }} />
        <Tab.Screen name='UserSCreen' component={UserScreens} options={{ tabBarIcon: getTabBarIcon('person') }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabNavigator;
