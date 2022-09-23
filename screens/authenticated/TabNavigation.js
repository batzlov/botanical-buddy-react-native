import React from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

import Home from './Home';
import Plants from './Plants';
import Settings from './Settings';
import Test from './Test';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    
                    size = focused ? 28 : 25;
      
                    if(route.name === 'Übersicht') 
                    {
                        iconName = 'home';
                    } 
                    else if(route.name === 'Amigos') 
                    {
                        iconName = 'leaf';
                    }
                    else if(route.name === 'Einstellungen') 
                    {
                        iconName = 'tools';
                    }
                    else if(route.name === 'Test') 
                    {
                        iconName = 'rocket';
                    }
        
                    return <FontAwesome5 name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#D4D4D4',
                tabBarStyle: {
                    ...styles.tabBarStyles,
                    ...styles.tabBarShadow
                }
            })}
        >
            <Tab.Screen 
                name="Übersicht" 
                component={Home} 
            />
            <Tab.Screen 
                name="Amigos" 
                component={Plants} 
            />
            <Tab.Screen 
                name="Einstellungen" 
                component={Settings} 
            />
            <Tab.Screen 
                name="Test" 
                component={Test} 
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;

const styles = StyleSheet.create({
    tabBarShadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    tabBarStyles: {
        position: 'absolute',
        height: 80,
        bottom: 25,
        paddingBottom: 15,
        left: 20,
        right: 20,
        borderRadius: 25,
        backgroundColor: COLORS.primaryButtonColor,
    }
});
