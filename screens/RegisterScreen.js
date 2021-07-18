import React, { useState, useEffect } from 'react';
import { View, Text, Button , TextInput, TouchableOpacity} from 'react-native';
import { fb } from '../db_config';

export default function RegisterScreen( {navigation} ) {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); 

    const onRegister = () => {
        fb.auth()
            .createUserWithEmailAndPassword(email,password)
            .then(() => { console.log("Register Successfully"); })
            .catch(error => { console.log("Register Error"); })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Sign Up</Text>             
            <Text style={{ color: 'red' }}>
                {message}
            </Text> 
            <TextInput
                style={{ width : '90%', padding : 10  }}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={text => setEmail(text)}
                value={email}
                />
            <TextInput
                style={{ width : '90%', padding : 10  }}
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                onChangeText={text => setPassword(text)}
                value={password}
                />
            <Button title="Register" style={{ padding : 10 }} onPress={onRegister} />

            <TouchableOpacity  onPress={() => navigation.navigate('LoginScreen') } >                    
                <Text style={{ padding : 10 }}>Already have an account? Login</Text>
            </TouchableOpacity>
            
        </View>
    );
}

