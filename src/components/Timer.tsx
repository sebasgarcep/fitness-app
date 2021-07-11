import * as React from "react";
import { StyleSheet } from "react-native";
import { Circle } from 'react-native-progress';

export type TimerProps = {
    total: number,
    progress: number,
};

export default function Timer({ total, progress }: TimerProps) {
    const remaining = total - progress;
    return (
        <Circle
            size={200}
            progress={progress / total}
            showsText
            formatText={() => `${remaining} s`}
        />
    );
}

const styles = StyleSheet.create({

});