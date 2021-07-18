import React, { useState, useEffect, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { fb } from '../db_config';
import { AuthContext, AuthContextProvider } from "../hooks/AuthContext";
import AsyncStorage from '@react-native-community/async-storage';
import { Text, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, YellowBox } from 'react-native';

export default function EditPOScreen({ route, navigation }) {
    const [POProcess, setPOProcess] = useState([]);
    const [user, setUser] = useContext(AuthContext);
    const [_id, set_id] = useState("");
    const [DEV_Number, setDEV_Number] = useState("");
    const [Product_name, setProduct_name] = useState("");
    const [Part_Number, setPart_Number] = useState("");
    const [PONumber, setPONumber] = useState("");
    const [Comment, setComment] = useState("");


    useEffect(() => {
        readPOProcess();
        YellowBox.ignoreWarnings(['Setting a timer']);
        if (route.params) {
            const { _id, DEV_Number, Product_name, Part_Number, PONumber, Comment } = route.params;
            set_id(_id);
            setDEV_Number(DEV_Number);
            setProduct_name(Product_name);
            setPart_Number(Part_Number);
            setPONumber(PONumber);
            setComment(Comment);

        }
    }, []);

    const writePOProcess = async (object_value) => {
        try {
            const string_value = JSON.stringify(object_value)
            await AsyncStorage.setItem("@POProcess", string_value)
        } catch (e) {
            // saving error
        }
    }
    const readPOProcess = async () => {
        try {
            const string_value = await AsyncStorage.getItem("@POProcess")
            let POProcess = string_value != null ? JSON.parse(string_value) : [];
            setPOProcess(POProcess);
        } catch (e) {
            // error reading value
        }
    }
    const onUpdate = () => {
        let new_data = {
            _id: '_' + Math.random().toString(36).substr(2, 9),

            DEV_Number: "",
            Product_name: "",
            PN: "",
            PONumber: "",
            Comment: "",
            user_id: user.uid,
        };
        writePOProcessFirebase(new_data);
        let t = [...POProcess];
        t.push(new_data);
        setPOProcess(t);
        //FIRESTORE
        //ASYNC STORAGE
        writePOProcess(t);


    };

    const writePOProcessFirebase = async (new_data) => {
        fb.firestore().collection("POProcess")
            .doc(new_data._id)
            .set(new_data)
            .then(function () {
                console.log("Firestore successfully written!");
                navigation.navigate('POScreen');
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        // console.log(new_data);
    }


    return (
        <ScrollView style={{ flex: 1, padding: 15 }}>
            <View style={{ paddingBottom: 10, alignItems: 'center', fontSize: 20 }}>
                <Text style={{ fontSize: 20 }}>Add New PO NUMBER</Text>
            </View>
            <Text style={{ paddingTop: 15 }}>DEV_Number</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder="DEV_Number"
                onChangeText={(DEV_Number) => setDEV_Number(DEV_Number)}
                value={DEV_Number}
            />

            <Text style={{ paddingTop: 15 }}>Product_name</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(Product_name) => setProduct_name(Product_name)}
                value={Product_name}
            />

            <Text style={{ paddingTop: 15 }}>Part_Number</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(Part_Number) => setPart_Number(Part_Number)}
                value={Part_Number}
            />

            <Text style={{ paddingTop: 15 }}>PO Number</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(PONumber) => setPONumber(PONumber)}
                value={PONumber}
            />

            <Text style={{ paddingTop: 15 }}>Comment</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(Comment) => setComment(Comment)}
                value={Comment}
            />

            <View style={{ marginHorizontal: 10, marginTop: 50 }}>
                <Button title="Save in PO Process" onPress={onUpdate} />
            </View>
        </ScrollView>
    );
}
