import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { fb } from '../db_config';
import { Ionicons } from '@expo/vector-icons';
export default function LoginScreen({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const onLogin = () => {
        fb.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => { console.log("Login Successfully"); })
            .catch(error => { console.log("Login Error"); })
    }

    return (

        <View style={{
            flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white"
        }}>
            <Image
                source={{ uri: "https://sv1.picz.in.th/images/2021/02/06/oNIS0k.md.png" }}
                style={{ width: '100%', height: 100 }}
            />

            <Text>Please Login</Text>
            <Text style={{ color: 'red' }}>
                {message}
            </Text>

            <TextInput
                style={{ width: '90%', padding: 10 }}
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                style={{ width: '90%', padding: 10 }}
                secureTextEntry
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}

            />
            <Ionicons name="md-log-in" size={30} color="#600000" />
            <Button title="Login" style={{ padding: 10 }} onPress={onLogin} color="#600000" />

            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')} >
                <Text style={{ padding: 10 }}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>

    );
}

