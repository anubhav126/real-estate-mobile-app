import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {useLocalSearchParams} from "expo-router";

const Property =  () =>{
    const {id} = useLocalSearchParams();

        return (
            <View>
                <Text>
                    Properties

                </Text>
            </View>
        )
}

export default Property;
