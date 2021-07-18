import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AuthContext, AuthContextProvider } from "../hooks/AuthContext";
import { fb } from '../db_config';

export default function HomeScreen({ navigation }) {
    const [user, setUser] = useContext(AuthContext);
    const onLogout = () => {
        fb.auth().signOut().then(function () {
            console.log("Logout successfully");
            // Sign-out successful.
            // setUser(null);
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    };


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image
                    source={{ uri: "https://sv1.picz.in.th/images/2021/02/06/oNIS0k.md.png" }}
                    style={{ width: '100%', height: 300 }}
                />

            </View>
            <View style={{
                flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'

            }}>

                <Ionicons name="md-home" size={50} color="#600000" />
                <Text style={{ fontSize: 20 }}>Home DEV</Text>

            </View>
            <View style={{
                flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'

            }}>
                <Ionicons name="md-log-out" size={50} color="#600000" />
                <TouchableOpacity onPress={onLogout} >
                    <Text style={{ padding: 20 }}>Log out</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}
