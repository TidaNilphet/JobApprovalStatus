import React, { useState, useEffect, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { fb } from '../db_config';
import { AuthContext, AuthContextProvider } from "../hooks/AuthContext";
import AsyncStorage from '@react-native-community/async-storage';
import { Text, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, YellowBox } from 'react-native';

export default function EditTestProcessScreen({ route, navigation }) {
    const [testProcess, settestProcess] = useState([]);
    const [user, setUser] = useContext(AuthContext);
    const [_id, set_id] = useState("");
    const [DEV_Number, setDEV_Number] = useState("");
    const [Product_name, setProduct_name] = useState("");
    const [PostSMT, setPostSMT] = useState("");
    const [PreBI, setPreBI] = useState("");
    const [PostBI1, setPostBI1] = useState("");
    const [Bi1, setBi1] = useState("");
    const [PostBI2, setPostBI2] = useState("");
    const [Bi2, setBi2] = useState("");
    const [TX, setTX] = useState("");
    const [RX, setRX] = useState("");
    const [HS, setHS] = useState("");
    const [Compliancy, setCompliancy] = useState("");
    const [Customize, setCustomize] = useState("");
    const [BER, setBER] = useState("");

    useEffect(() => {
        readtestProcess();
        YellowBox.ignoreWarnings(['Setting a timer']);
        if (route.params) {
            const { _id, DEV_Number, Product_name, PostSMT, PreBI, PostBI1, Bi1, PostBI2, Bi2, TX, RX, HS, Compliancy, Customize, BER } = route.params;
            set_id(_id);
            setDEV_Number(DEV_Number);
            setProduct_name(Product_name);
            setPostSMT(PostSMT);
            setPreBI(PreBI);
            setPostBI1(PostBI1);
            setBi1(Bi1);
            setPostBI2(PostBI2);
            setBi2(Bi2);
            setTX(TX);
            setRX(RX);
            setHS(HS);
            setCompliancy(Compliancy);
            setCustomize(Customize);
            setBER(BER);
        }
    }, []);



    const onUpdate = () => {
        let new_data = {
            _id: '_' + Math.random().toString(36).substr(2, 9),
            DEV_Number: "",
            Product_name: "",
            PreBI: "",
            PostBI1: "",
            Bi1: "",
            PostBI2: "",
            Bi2: "",
            TX: "",
            RX: "",
            HS: "",
            Compliancy: "",
            Customize: "",
            BER: "",
            user_id: user.uid,
        };
        writetestProcessFirebase(new_data);
        let t = [...testProcess];
        t.push(new_data);
        settestProcess(t);
        //writetestProcess(t);
        //ASYNC STORAGE
        writetestProcess(t);

    };

    const writetestProcessFirebase = async (new_data) => {
        fb.firestore().collection("testProcess")
            .doc(new_data._id)
            .set(new_data)
            .then(function () {
                console.log("Firestore successfully written!");
                navigation.navigate('TestProcessScreen');
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        // console.log(new_data);
    }
    const writetestProcess = async (object_value) => {
        try {
            const string_value = JSON.stringify(object_value)
            await AsyncStorage.setItem("@testProcess", string_value)
        } catch (e) {
            // saving error
        }
    }
    const readtestProcess = async () => {
        try {
            const string_value = await AsyncStorage.getItem("@testProcess")
            let testProcess = string_value != null ? JSON.parse(string_value) : [];
            settestProcess(testProcess);
        } catch (e) {
            // error reading value
        }
    }

    return (
        <ScrollView style={{ flex: 1, padding: 15 }}>
            <View style={{ paddingBottom: 10, alignItems: 'center', fontSize: 20 }}>
                <Text style={{ fontSize: 20 }}>Add New Process</Text>
            </View>
            <Text style={{ paddingTop: 5 }}>DEV_Number</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder="DEV_Number"
                onChangeText={(DEV_Number) => setDEV_Number(DEV_Number)}
                value={DEV_Number}
            />

            <Text style={{ paddingTop: 5 }}>Product_name</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(Product_name) => setProduct_name(Product_name)}
                value={Product_name}
            />

            <Text style={{ paddingTop: 5 }}>PreBI</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(PreBI) => setPreBI(PreBI)}
                value={PreBI}
            />

            <Text style={{ paddingTop: 5 }}>PostBI1</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(PostBI1) => setPostBI1(PostBI1)}
                value={PostBI1}
            />

            <Text style={{ paddingTop: 5 }}>Bi1</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(Bi1) => setBi1(Bi1)}
                value={Bi1}
            />

            <Text style={{ paddingTop: 5 }}>PostBI2</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(PostBI2) => setPostBI2(PostBI2)}
                value={PostBI2}
            />

            <Text style={{ paddingTop: 5 }}>Bi2</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(Bi2) => setBi2(Bi2)}
                value={Bi2}
            />

            <Text style={{ paddingTop: 5 }}>TX</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(TX) => setTX(TX)}
                value={TX}
            />

            <Text style={{ paddingTop: 5 }}>RX</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(RX) => setRX(RX)}
                value={RX}
            />

            <Text style={{ paddingTop: 5 }}>HS</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(HS) => setHS(HS)}
                value={HS}
            />

            <Text style={{ paddingTop: 5 }}>Compliancy</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(Compliancy) => setCompliancy(Compliancy)}
                value={Compliancy}
            />

            <Text style={{ paddingTop: 5 }}>Customize</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(Customize) => setCustomize(Customize)}
                value={Customize}
            />

            <Text style={{ paddingTop: 5 }}>BER</Text>
            <TextInput style={{
                height: 35,
                borderColor: 'blue',
                borderWidth: 1
            }}
                placeholder=" "
                onChangeText={(BER) => setBER(BER)}
                value={BER}
            />

            <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                <Button title="Save in Test Process" onPress={onUpdate} />
            </View>
        </ScrollView>
    );
}
