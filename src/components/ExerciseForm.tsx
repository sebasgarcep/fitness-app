import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card, Caption, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuid } from 'uuid';

import { exerciseTargets } from '../constants';
import { Exercise, ExerciseTarget } from '../types';
import { useExercise } from '../store/selectors';

export type ExerciseFormProps = {
    id?: string,
    onSubmit: (data: Exercise) => any,
};

export default function ExerciseForm({ id, onSubmit }: ExerciseFormProps) {
    const exercise = useExercise(id);

    const [img, setImg] = React.useState(exercise?.img || '');
    const [target, setTarget] = React.useState<ExerciseTarget>(exercise?.target || 'cardio');
    const [name, setName] = React.useState(exercise?.name || '');
    const [sets, setSets] = React.useState(exercise?.sets?.toString() || '');
    const [type, setType] = React.useState((!exercise || exercise.reps) ? 'reps' : 'time');
    const [reps, setReps] = React.useState(exercise?.reps?.toString() || '');
    const [time, setTime] = React.useState(exercise?.time?.toString() || '');
    const [comments, setComments] = React.useState(exercise?.comments || '');

    const pickImg = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImg(result.uri);
        }
    };

    const submitForm = () => {
        if (!name) { return; }
        if (!img) { return; }
        if (!type) { return; }

        const data: Exercise = {
            id: id || uuid(),
            target,
            name,
            img,
            sets: Number.parseInt(sets),
            comments,
        };

        if (Number.isNaN(data.sets)) { return; }

        if (type === "reps") {
            data.reps = Number.parseInt(reps, 10);
            if (Number.isNaN(data.reps)) { return; }
        }

        if (type === "time") {
            data.time = Number.parseInt(time, 10);
            if (Number.isNaN(data.time)) { return; }
        }

        onSubmit(data);
    };

    return (
        <Card elevation={5}>
            <TouchableOpacity onPress={pickImg}>
                <Card.Cover
                    source={img ? { uri: img } : require('../../assets/images/placeholder.jpeg')}
                    style={styles.input}
                />
            </TouchableOpacity>
            <Card.Content>
                <Caption>Target Muscles</Caption>
                <Picker
                    selectedValue={target}
                    onValueChange={value => setTarget(value)}
                    style={styles.input}
                >
                    {exerciseTargets.map(item => (
                        <Picker.Item
                            key={item.id}
                            value={item.id}
                            label={item.label}
                        />
                    ))}
                </Picker>
                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <TextInput
                    label="Sets"
                    keyboardType="number-pad"
                    value={sets}
                    onChangeText={setSets}
                    style={styles.input}
                />
                <Caption>Exercise Type</Caption>
                <Picker
                    selectedValue={type}
                    onValueChange={value => setType(value)}
                    style={styles.input}
                >
                    <Picker.Item
                        value="reps"
                        label="Repetition Exercise"
                    />
                    <Picker.Item
                        value="time"
                        label="Time Exercise"
                    />
                </Picker>
                {type === "reps" && (
                    <TextInput
                        label="Repetitions"
                        keyboardType="number-pad"
                        value={reps}
                        onChangeText={setReps}
                        style={styles.input}
                    />
                )}
                {type === "time" && (
                    <TextInput
                        label="Time"
                        keyboardType="number-pad"
                        right={<TextInput.Affix text="seconds" />}
                        value={time}
                        onChangeText={setTime}
                        style={styles.input}
                    />
                )}
                <TextInput
                    label="Comments"
                    multiline
                    value={comments}
                    onChangeText={setComments}
                    style={styles.input}
                />
                <Button
                    icon="plus"
                    mode="contained"
                    onPress={submitForm}
                >
                    Save
                </Button>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
    },
});
