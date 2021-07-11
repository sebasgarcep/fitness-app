import React from "react";
import { StyleSheet, View as DefaultView } from "react-native";

import { View } from "./Themed";

export default function Container(props: DefaultView["props"]) {
    const { style, ...rest } = props;
    return (
        <View style={[styles.container, style]} {...rest} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});