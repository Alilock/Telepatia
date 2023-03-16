import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../../screens/Home/HomeScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import SearchScreen from '../../screens/Search/SearchScreen';
import ShareScreen from '../../screens/Create/ShareScreen';
import NotificationScreen from '../../screens/Notification/NotificationScreen';
// import { Feed, Plus, Profile, Search } from '../../components/Icons';
import SvgAlert from '../../components/Icons/Alert';
import SvgFeed from '../../components/Icons/Feed';
import SvgSearch from '../../components/Icons/Search';
import SvgPlus from '../../components/Icons/Plus';
import SvgProfile from '../../components/Icons/Profile';

const Tab = createBottomTabNavigator();

const AppStack = () => {

    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: "#000",
                paddingTop: 16
            }
        }}>
            <Tab.Screen name='Home' component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <SvgFeed stroke={focused ? '#E0783E' : '#414141'} />
                    ),
                }}
            />
            <Tab.Screen name='Search' component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <SvgSearch stroke={focused ? '#E0783E' : '#414141'} />
                    ),
                }} />
            <Tab.Screen name='Share' component={ShareScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <SvgPlus stroke={focused ? '#E0783E' : '#414141'} />
                    ),
                }} />
            <Tab.Screen name='Notification' component={NotificationScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <SvgAlert stroke={focused ? '#E0783E' : '#414141'} />
                    ),
                }} />
            <Tab.Screen name='Profile' component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <SvgProfile stroke={focused ? '#E0783E' : '#414141'} />
                    ),
                }} />
        </Tab.Navigator>
    )
}

export default AppStack

const styles = StyleSheet.create({})