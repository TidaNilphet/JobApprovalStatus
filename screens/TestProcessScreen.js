import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Text, TouchableOpacity, FlatList, YellowBox, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TestProcessItem from '../components/TestProcessItem';
import AsyncStorage from '@react-native-community/async-storage';
import { fb } from '../db_config';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { AuthContext, AuthContextProvider } from "../hooks/AuthContext";

export default function TestProcessScreen({ navigation }) {
    const [testProcess, setTestProcess] = useState([]);
    const [user, setUser] = useContext(AuthContext);

    const onCreate = () => {
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
        let t = [...testProcess];
        t.push(new_data);
        setTestProcess(t);
        writeTestProcess(t);

        //FIRESTORE
        writeTestProcessFirebase(new_data);
    };

    const onUpdate = (new_DEV_Number, _id) => {
        let t = [...testProcess];
        let index = t.findIndex((item => item._id == _id));
        t[index].DEV_Number = new_DEV_Number;
        setTestProcess(t);
        writeTestProcess(t);

        //FIRESTORE
        let new_data = t[index];
        writeTestProcessFirebase(new_data);

    };


    const onDelete = (_id) => {
        let t = [...testProcess];
        let index = t.findIndex((item => item._id == _id));
        // t.splice(index, 1);
        setTestProcess(t);
        writeTestProcess(t);


        let removed_item = t.splice(index, 1);
        //FIRESTORE
        let new_data = removed_item[0];
        removeTestProcessFirebase(new_data);

    };

    const writeTestProcess = async (object_value) => {
        try {
            const string_value = JSON.stringify(object_value)
            await AsyncStorage.setItem("@testProcess", string_value)
        } catch (e) {
            // saving error
        }
    }

    useEffect(() => {
        // readTestProcess();
        readTestProcessFirebase();
        YellowBox.ignoreWarnings(['Setting a timer']);
    }, []);

    const readTestProcessFirebase = async () => {
        fb.firestore().collection("testProcess")
            .where("user_id", "==", user.uid)
            .onSnapshot((querySnapshot) => { //to way
                //.get().then((querySnapshot) => { //one way
                const testProcess = querySnapshot.docs.map(doc => doc.data());

                //WRITE TO ASYNC STORAGE
                writeTestProcess(testProcess);

                //SET STATE
                setTestProcess(testProcess);
            });
    }

    const removeTestProcessFirebase = async (new_data) => {
        fb.firestore().collection("testProcess")
            .doc(new_data._id)
            .delete()
            .then(function () {
                console.log("Firestore successfully deleted!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }

    const writeTestProcessFirebase = async (new_data) => {
        fb.firestore().collection("testProcess")
            .doc(new_data._id)
            .set(new_data)
            .then(function () {
                console.log("Firestore successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }

    return (
        <View style={{ flex: 1, padding: 15, backgroundColor: 'white' }}>
            <Image
                source={{ uri: "https://sv1.picz.in.th/images/2021/02/06/oNIS0k.md.png" }}
                style={{ width: '100%', height: 100 }}
            />
            <View style={{ alignItems: 'center', fontSize: 20, backgroundColor: 'lightpink' }}>
                <Text style={{ fontSize: 20 }}>Add Test Process</Text>
            </View>
            <FlatList
                style={{ marginTop: 15 }}
                data={testProcess}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <TestProcessItem
                            item={item}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            navigation={navigation}
                        />
                    );
                }
                }
            />
            <TouchableOpacity onPress={onCreate}
                style={{
                    backgroundColor: "lightpink",
                    padding: 10,
                    width: 50,
                    height: 50,
                    alignItems: "center",
                    alignContent: "center",
                    borderRadius: 100,
                    position: 'absolute',
                    right: 10,
                    bottom: 10,
                }}
            >
                <Ionicons name='md-add' size={26} />
            </TouchableOpacity>
        </View>
    );
}
