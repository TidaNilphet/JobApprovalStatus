import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Text, Button, Alert, YellowBox, TouchableOpacity, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext, AuthContextProvider } from "../hooks/AuthContext";
import AsyncStorage from '@react-native-community/async-storage';
import { fb } from '../db_config';

export default function EditDEVScreen({ route, navigation }) {
    const [DEVProcess, setDEVProcess] = useState([]);
    const [user, setUser] = useContext(AuthContext);
    const [_id, set_id] = useState("");
    const [DEV_Number, setDEV_Number] = useState("");
    const [Product_name, setProduct_name] = useState("");
    const [Part_Number, setPart_Number] = useState("");
    const [Workorder, setWorkorder] = useState("");
    const [Disposition, setDisposition] = useState("");
    const [Comment, setComment] = useState("");

    useEffect(() => {
        readDEVProcessFirebase();
        YellowBox.ignoreWarnings(['Setting a timer']);
        if (route.params) {
            const { _id, DEV_Number, Product_name, Part_Number, Workorder, Disposition, Comment } = route.params;
            set_id(_id);
            setDEVProcess(DEVProcess);
            setDEV_Number(DEV_Number);
            setProduct_name(Product_name);
            setPart_Number(Part_Number);
            setWorkorder(Workorder);
            setDisposition(Disposition);
            setComment(Comment);


        }
    }, []);


    const onUpdate = () => {
        let new_data = {
            _id: '_' + Math.random().toString(36).substr(2, 9),
            DEV_Number: "",
            Product_name: "",
            Part_Nuber: "",
            Workorder: "",
            Disposition: "",
            Comment: "",
            user_id: user.uid,
        };
        let t = [...DEVProcess];
        t.push(new_data);
        setDEVProcess(t);
        writeDEVProcess(t);

        //FIRESTORE
        writeDEVProcessFirebase(new_data);

    };

    const writeDEVProcessFirebase = async (new_data) => {
        fb.firestore().collection("DEVProcess")
            .doc(new_data._id)
            .set(new_data)
            .then(function () {
                console.log("Firestore successfully written!");

            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        console.log(new_data);
        navigation.navigate('DEVScreen');
    }
    const writeDEVProcess = async (object_value) => {
        try {
            const string_value = JSON.stringify(object_value)
            await AsyncStorage.setItem("@DEVProcess", string_value)
        } catch (e) {
            // saving error
        }
    }
    const readDEVProcessFirebase = async () => {
        try {
            const string_value = await AsyncStorage.getItem("@DEVProcess")
            let DEVProcess = string_value != null ? JSON.parse(string_value) : [];
            setDEVProcess(DEVProcess);
        } catch (e) {
            // error reading value
        }
    }

    return (
        <ScrollView style={{ flex: 1, padding: 15 }}>

            <View style={{ paddingBottom: 10, alignItems: 'center', fontSize: 20 }}>
                <Text style={{ fontSize: 20 }}>Add New DEV NUMBER</Text>
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

            <Text style={{ paddingTop: 15 }}>PartNumber</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(Part_Number) => setPart_Number(Part_Number)}
                value={Part_Number}
            />

            <Text style={{ paddingTop: 15 }}>Workorder</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(Workorder) => setWorkorder(Workorder)}
                value={Workorder}
            />

            <Text style={{ paddingTop: 15 }}>Disposition</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(Disposition) => setDisposition(Disposition)}
                value={Disposition}
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
                <Button title="Save in DEV Process" onPress={onUpdate} />
            </View>
        </ScrollView>
    );
}
