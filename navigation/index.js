import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import all screens that need to be accesible with the navtion object
import Welcome from '../screens/Welcome';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import TabNavigation from '../screens/authenticated/TabNavigation';
import Details from '../screens/authenticated/Details';
import CreatePlant from '../screens/authenticated/CreatePlant';
import CameraHandler from '../screens/authenticated/CameraHandler';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ 
                    headerTransparent: true,
                    headerShown: false 
                }}    
            >
                <Stack.Screen 
                    name="Welcome" 
                    component={Welcome} 
                    options={{
                        title: ''
                    }}
                />
                <Stack.Screen 
                    name="SignUp" 
                    component={SignUp} 
                    options={{
                        title: ''
                    }}
                />
                <Stack.Screen 
                    name="SignIn" 
                    component={SignIn} 
                    options={{
                        title: ''
                    }}
                />
                <Stack.Screen 
                    name="Home" 
                    component={TabNavigation} 
                    options={() => {
                        return {
                            headerShown: false,
                            headerTransparent: true,
                            headerStyle: {
                                backgroundColor: '#50665a',
                                color: 'white',
                                height: 20
                            },
                            headerTitleStyle: {
                                color: 'white'
                            },
                            headerTitle: 'Willkommen',
                        }
                    }}
                />
                <Stack.Screen 
                    name="Details" 
                    component={Details} 
                    options={{
                        title: 'Details',
                        headerTintColor: '#000'
                    }} 
                />
                <Stack.Screen 
                    name="CameraHandler" 
                    component={CameraHandler} 
                    options={{
                        title: 'Kamera',
                        headerTintColor: '#000'
                    }} 
                />
                <Stack.Screen 
                    name="CreatePlant" 
                    component={CreatePlant} 
                    options={{
                        title: 'Planze hinzufügen',
                        headerTintColor: '#000'
                    }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;