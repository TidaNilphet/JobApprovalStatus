import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, Image, ScrollView, TouchableOpacity, FlatList, YellowBox, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import POItem from '../components/POItem';
import AsyncStorage from '@react-native-community/async-storage';
import { fb } from '../db_config';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { AuthContext, AuthContextProvider } from "../hooks/AuthContext";

export default function POScreen({ navigation }) {
    const [POProcess, setPOProcess] = useState([]);
    const [user, setUser] = useContext(AuthContext);

    const onCreate = () => {
        let new_data = {
            _id: '_' + Math.random().toString(36).substr(2, 9),
            DEV_Number: "",
            Product_name: "",
            PN: "",
            PONumber: "",
            Comment: "",
            user_id: user.uid,
        };
        let t = [...POProcess];
        t.push(new_data);
        setPOProcess(t);
        writePOProcess(t);

        //FIRESTORE
        writePOProcessFirebase(new_data);
    };

    const onUpdate = (new_PONumber, _id) => {
        let t = [...POProcess];
        let index = t.findIndex((item => item._id == _id));
        t[index].PONumber = new_PONumber;
        setPOProcess(t);
        writePOProcess(t);

        //FIRESTORE
        let new_data = t[index];
        writePOProcessFirebase(new_data);

    };


    const onDelete = (_id) => {
        let t = [...POProcess];
        let index = t.findIndex((item => item._id == _id));
        // t.splice(index, 1);
        setPOProcess(t);
        writePOProcess(t);


        let removed_item = t.splice(index, 1);
        //FIRESTORE
        let new_data = removed_item[0];
        removePOProcessFirebase(new_data);

    };

    const writePOProcess = async (object_value) => {
        try {
            const string_value = JSON.stringify(object_value)
            await AsyncStorage.setItem("@POProcess", string_value)
        } catch (e) {
            // saving error
        }
    }

    useEffect(() => {
        // readDEVProcess();
        readPOProcessFirebase();
        YellowBox.ignoreWarnings(['Setting a timer']);
    }, []);

    const readPOProcessFirebase = async () => {
        fb.firestore().collection("POProcess")
            .where("user_id", "==", user.uid)
            .onSnapshot((querySnapshot) => { //to way
                //.get().then((querySnapshot) => { //one way
                const POProcess = querySnapshot.docs.map(doc => doc.data());

                //WRITE TO ASYNC STORAGE
                writePOProcess(POProcess);

                //SET STATE
                setPOProcess(POProcess);
            });
    }

    const removePOProcessFirebase = async (new_data) => {
        fb.firestore().collection("POProcess")
            .doc(new_data._id)
            .delete()
            .then(function () {
                console.log("Firestore successfully deleted!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }

    const writePOProcessFirebase = async (new_data) => {
        fb.firestore().collection("POProcess")
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
                <Text style={{ fontSize: 20 }}>Add New PO</Text>
            </View>
            <FlatList
                style={{ marginTop: 15 }}
                data={POProcess}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <POItem
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

