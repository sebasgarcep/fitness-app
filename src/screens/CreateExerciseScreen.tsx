import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, RadioButton, TextInput } from 'react-native-paper';

import { View } from '../components/Themed';
import { SettingsTabParamList } from '../types';

export default function CreateExerciseScreen({
    navigation,
}: StackScreenProps<SettingsTabParamList, 'CreateExerciseScreen'>) {
    const [value, setValue] = React.useState('');
    
    let element = null;
    switch (value) {
        case 'reps': {
            element = (
                <TextInput
                    label="Repetitions"
                    keyboardType="number-pad"
                    style={styles.input}
                />
            );
            break;
        }
        case 'time': {
            element = (
                <TextInput
                    label="Time"
                    keyboardType="number-pad"
                    right={<TextInput.Affix text="seconds" />}
                    style={styles.input}
                />
            );
            break;
        }
        default: {
            break;
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card elevation={5}>
                <Card.Cover
                    source={{  }}
                    style={styles.input}
                />
                <Card.Content>
                    <TextInput
                        label="Name"
                        style={styles.input}
                    />
                    <TextInput
                        label="Rounds"
                        keyboardType="number-pad"
                        style={styles.input}
                    />
                    <View style={styles.input}>
                        <RadioButton.Group
                            value={value}
                            onValueChange={value => setValue(value)}
                        >
                            <RadioButton.Item
                                value="reps"
                                label="Repetition Exercise"
                            />
                            <RadioButton.Item
                                value="time"
                                label="Time Exercise"
                            />
                        </RadioButton.Group>
                    </View>
                    {element}
                    <Button
                        icon="plus"
                        mode="contained"
                        onPress={() => {}}
                    >
                        Create
                    </Button>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        marginBottom: 20,
    },
});
