
import React, { useState, useEffect, useContext, TouchableOpacity } from 'react';
import { View, Text, Dimensions, graphStyle, FlatList, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AuthContext, AuthContextProvider } from "../hooks/AuthContext";
import { Ionicons } from '@expo/vector-icons';
import { fb } from '../db_config';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, YellowBox } from 'react-native';
export default function ChartScreen({ navigation }) {
    const [ChartProcess, setChartProcess] = useState([]);
    const [user, setUser] = useContext(AuthContext);
    const [DEVProcess, setDEVProcess] = useState([]);
    const [_id, set_id] = useState("");
    const [Disposition, setDisposition] = useState("");
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    const screenWidth = Dimensions.get('window').width
    const readDEVProcessFirebase = async () => {
        fb.firestore().collection("DEVProcess")
            .where("user_id", "==", user.uid)
            // .onSnapshot((querySnapshot) => { //to way
            .get().then((querySnapshot) => { //one way
                const DEVProcess = querySnapshot.docs.map(doc => doc.data());

                //WRITE TO ASYNC STORAGE
                readDEVProcessFirebase(DEVProcess);

                //SET STATE
                setDEVProcess(DEVProcess);
                setChartProcess(ChartProcess);
                setDisposition(Disposition);
            });
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "white" }}>
            <Image
                source={{ uri: "https://sv1.picz.in.th/images/2021/02/06/oNIS0k.md.png" }}
                style={{ width: '100%', height: 100 }}
            />

            <Text style={{ fontSize: 20, textAlign: 'center' }}>
                Deviation Reports
            </Text>

            <LineChart
                data={{
                    labels: ["In Process", "On Hold ", "Released", "Complete"],
                    datasets: [
                        {
                            data: [
                                Math.random("@DEVProcess".where, Disposition) * 100,
                                Math.random("@DEVProcess".where, Disposition) * 100,
                                Math.random("@DEVProcess".where, Disposition) * 100,
                                Math.random("@DEVProcess".where, Disposition) * 100,

                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />

        </View >
    );
}
