import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import TestProcessScreen from '../screens/TestProcessScreen';
import DEVScreen from '../screens/DEVScreen';
import POScreen from '../screens/POScreen';
import ChartScreen from '../screens/ChartScreen';
import HomeStack from '../navigations/HomeStack';
import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function BottomTab() {

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case "HomeStack":
                            iconName = 'md-home';
                            break;

                        case "DEVScreen":
                            iconName = 'md-list';
                            break;
                        case "POScreen":
                            iconName = 'md-card';
                            break;
                        case "TestProcessScreen":
                            iconName = 'md-document';
                            break;
                        case "ChartScreen":
                            iconName = 'md-apps';
                            break;



                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}

        >

            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{ title: 'Home' }}
            />



            <Tab.Screen
                name="DEVScreen"
                component={DEVScreen}
                options={{ title: 'DEV STATUS' }}
            />
            <Tab.Screen
                name="POScreen"
                component={POScreen}
                options={{ title: 'PO' }}
            />
            <Tab.Screen
                name="TestProcessScreen"
                component={TestProcessScreen}
                options={{ title: 'Test Process' }}
            />

            <Tab.Screen
                name="ChartScreen"
                component={ChartScreen}
                options={{ title: 'Chart' }}
            />

        </Tab.Navigator>
    );
}
