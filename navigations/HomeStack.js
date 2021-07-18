import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import EditTestProcessScreen from '../screens/EditTestProcessScreen';
import EditDEVScreen from '../screens/EditDEVScreen';
import EditPOScreen from '../screens/EditPOScreen';
import ChartScreen from '../screens/ChartScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function HomeStack() {

    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ title: 'Home' }}
            />
            <Stack.Screen
                name="ChartScreen"
                component={ChartScreen}
                options={{ title: 'Chart' }}
            />
            <Stack.Screen
                name="EditTestProcessScreen"
                component={EditTestProcessScreen}
                options={{ title: 'Edit Test Process' }}
            />
            <Stack.Screen
                name="EditDEVScreen"
                component={EditDEVScreen}
                options={{ title: 'Edit DEV Process' }}
            />
            <Stack.Screen
                name="EditPOScreen"
                component={EditPOScreen}
                options={{ title: 'Edit PO Process' }}
            />


        </Stack.Navigator>
    );

}
