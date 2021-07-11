import React from "react";
import { FAB } from "react-native-paper";
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type FloatingActionButtonProps = {
    icon: IconSource,
    label?: string,
    onPress?: () => any,
    style?: StyleProp<ViewStyle>,
};

export default function FloatingActionButton(props: FloatingActionButtonProps) {
    const { style, ...rest } = props;
    return (
        <FAB {...rest} style={[styles.fab, style]} />
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});