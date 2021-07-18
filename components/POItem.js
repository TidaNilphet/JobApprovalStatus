import React from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function POItem(props) {
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
                    placeholder="PO Number "
                    onChangeText={(new_PONumber) => props.onUpdate(new_PONumber, props.item._id)}
                    value={props.item.PONumber}
                    size={30} color="#600000"
                />
            </View>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('EditPOScreen', {
                    _id: props.item._id,
                    DEV_Number: props.item.DEV_Number,
                    Product_name: props.item.Product_name,
                    Part_Nuber: props.item.Part_Nuber,
                    PONumber: props.item.PONumber,
                    Comment: props.item.Comment,

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
