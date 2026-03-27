import React from 'react';
import {View} from "react-native";
import { StyleSheet } from "react-native";
import PinMarker from "./pinMarker.svg"

const Pin = () => {
    return (
        <View style={styles.container}>
            <PinMarker />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: -21,
        marginTop: -60,
    },
})

export default Pin;