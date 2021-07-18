import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, Image, ScrollView, TouchableOpacity, FlatList, YellowBox, Modal, ListViewBase } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DEVItem from '../components/DEVItem';
import AsyncStorage from '@react-native-community/async-storage';
import { fb } from '../db_config';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { AuthContext, AuthContextProvider } from "../hooks/AuthContext";
//import SearchBar from 'react-native-search-bar';
export default function DEVScreen({ navigation }) {
    const [DEVProcess, setDEVProcess] = useState([]);
    const [user, setUser] = useContext(AuthContext);

    const onCreate = () => {
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

    const onUpdate = (new_DEV_Number, _id) => {
        let t = [...DEVProcess];
        let index = t.findIndex((item => item._id == _id));
        t[index].DEV_Number = new_DEV_Number;
        setDEVProcess(t);
        writeDEVProcess(t);

        //FIRESTORE
        let new_data = t[index];
        writeDEVProcessFirebase(new_data);

    };


    const onDelete = (_id) => {
        let t = [...DEVProcess];
        let index = t.findIndex((item => item._id == _id));
        // t.splice(index, 1);
        setDEVProcess(t);
        writeDEVProcess(t);


        let removed_item = t.splice(index, 1);
        //FIRESTORE
        let new_data = removed_item[0];
        removeDEVProcessFirebase(new_data);

    };

    const writeDEVProcess = async (object_value) => {
        try {
            const string_value = JSON.stringify(object_value)
            await AsyncStorage.setItem("@DEVProcess", string_value)
        } catch (e) {
            // saving error
        }
    }

    useEffect(() => {
        // readDEVProcess();
        readDEVProcessFirebase();
        YellowBox.ignoreWarnings(['Setting a timer']);
    }, []);

    const readDEVProcessFirebase = async () => {
        fb.firestore().collection("DEVProcess")
            .where("user_id", "==", user.uid)
            .onSnapshot((querySnapshot) => { //to way
                //.get().then((querySnapshot) => { //one way
                const DEVProcess = querySnapshot.docs.map(doc => doc.data());

                //WRITE TO ASYNC STORAGE
                writeDEVProcess(DEVProcess);

                //SET STATE
                setDEVProcess(DEVProcess);
            });
    }


    const removeDEVProcessFirebase = async (new_data) => {
        fb.firestore().collection("DEVProcess")
            .doc(new_data._id)
            .delete()
            .then(function () {
                console.log("Firestore successfully deleted!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }

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
    }

    return (

        <View style={{ flex: 1, padding: 15, backgroundColor: 'white' }}>

            <Image
                source={{ uri: "https://sv1.picz.in.th/images/2021/02/06/oNIS0k.md.png" }}
                style={{ width: '100%', height: 100 }}
            />
            <View style={{ alignItems: 'center', fontSize: 50, backgroundColor: 'lightpink' }}>
                <Text style={{ fontSize: 20 }}>Add STATUS</Text>
            </View>
            <FlatList
                style={{ marginTop: 15 }}
                data={DEVProcess}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <DEVItem
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