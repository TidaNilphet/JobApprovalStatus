import React from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TestProcessItem(props) {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 25,
                paddingVertical: 10,
            }}>

            <View style={{ flex: 12 }}>
                <TextInput
                    placeholder="DEV Number "
                    onChangeText={(new_DEV_Number) => props.onUpdate(new_DEV_Number, props.item._id)}
                    value={props.item.DEV_Number}
                    size={30} color="#600000"
                />
            </View>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('EditTestProcessScreen', {
                    _id: props.item._id,
                    DEV_Number: props.item.DEV_Number,
                    Product_name: props.item.Product_name,
                    PostSMT: props.item.PostSMT,
                    PreBI: props.item.PreBI,
                    PostBI1: props.item.PostBI1,
                    Bi1: props.item.Bi1,
                    PostBI2: props.item.PostBI2,
                    Bi2: props.item.Bi2,
                    TX: props.item.TX,
                    RX: props.item.RX,
                    HS: props.item.HS,
                    Compliancy: props.item.Compliancy,
                    Customize: props.item.Customize,
                    BER: props.item.BER,
                })}
                style={{ flex: 5, marginRight: 10 }} >
                <Ionicons name="md-create" size={30} color="#600000" />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => props.onDelete(props.item._id)}
                style={{ flex: 3 }} >
                <Ionicons name="md-trash" size={30} color="#600000" />
            </TouchableOpacity>
        </View>
    );
}
