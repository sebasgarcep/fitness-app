import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Divider, Headline, List } from 'react-native-paper';

import Container from '../components/Container';
import { View } from '../components/Themed';
import Timer from '../components/Timer';
import Colors from '../constants/Colors';
import { useBeginExerciseTracker, useCompleteExerciseTrackerStep, useProgressExerciseTrackerStep, useSkipExerciseTrackerStep } from '../store/actions';
import { useExerciseTracker } from '../store/selectors';
import { ExerciseStep, ExerciseTracker, ScreenStackParamList } from '../types';

type BeginExerciseTrackerProps = {
    date: Date,
};

function BeginExerciseTracker({ date }: BeginExerciseTrackerProps) {
    const beginExerciseTracker = useBeginExerciseTracker();
    return (
        <Container style={styles.beginStateContainer}>
            <TouchableOpacity
                style={styles.beginButton}
                onPress={() => beginExerciseTracker(date)}
            >
                <Headline>Begin</Headline>
            </TouchableOpacity>
        </Container>
    );
}

type RepsExerciseTrackerProps = {
    date: Date,
    step: ExerciseStep & { type: "reps" },
};

function RepsExerciseTracker({ date, step }: RepsExerciseTrackerProps) {
    const skipExerciseTrackerStep = useSkipExerciseTrackerStep();
    const completeExerciseTrackerStep = useCompleteExerciseTrackerStep();
    return (
        <Container style={styles.repsStateContainer}>
            <View style={styles.repsWrapper}>
                <Headline>{step.total} reps</Headline>
            </View>
            <View style={styles.repsActionsWrapper}>
                <Button mode="outlined" onPress={() => skipExerciseTrackerStep(date)}>Skip</Button>
                <Button mode="contained" onPress={() => completeExerciseTrackerStep(date)}>Complete</Button>
            </View>
        </Container>
    );
}

type TimeExerciseTrackerProps = {
    date: Date,
    step: ExerciseStep & { type: "time" },
};

function TimeExerciseTracker({ date, step }: TimeExerciseTrackerProps) {
    const progressExerciseTrackerStep = useProgressExerciseTrackerStep();
    const completeExerciseTrackerStep = useCompleteExerciseTrackerStep();

    // FIXME: This is not going to work in the background. Fix that!
    React.useEffect(() => {
        let progress = 0;
        let total = step.total;
        let handle = setInterval(() => {
            if (total - progress <= 0) {
                // FIXME: Add complete call and loud notification
                clearInterval(handle);
            } else {
                progress += 1;
                progressExerciseTrackerStep(date, progress);
            }
        }, 1000);
    }, []);

    return (
        <Container style={styles.timeStateContainer}>
            <Timer total={step.total} progress={step.progress} />
            <View style={styles.timeActionsWrapper}>
                {/* FIXME: Add Skip Button (outlines) */}
                {/* FIXME: Add Pause Button if not complete, Complete Button Otherwise (contained) */}
            </View>
        </Container>
    );
}

type RestExerciseTrackerProps = {
    date: Date,
    step: ExerciseStep & { type: "rest" },
};

function RestExerciseTracker({ date, step }: RestExerciseTrackerProps) {
    const progressExerciseTrackerStep = useProgressExerciseTrackerStep();
    const completeExerciseTrackerStep = useCompleteExerciseTrackerStep();

    // FIXME: This is not going to work in the background. Fix that!
    React.useEffect(() => {
        let progress = 0;
        let total = step.total;
        let handle = setInterval(() => {
            if (total - progress <= 0) {
                // FIXME: Add complete call and loud notification
                clearInterval(handle);
            } else {
                progress += 1;
                progressExerciseTrackerStep(date, progress);
            }
        }, 1000);
    }, []);

    return (
        <Container style={styles.restStateContainer}>
            <Timer total={step.total} progress={step.progress} />
            <Button
                mode="contained"
                onPress={() => completeExerciseTrackerStep(date)}
                style={styles.restCompleteButton}
            >
                Complete
            </Button>
        </Container>
    );
}

type StepTrackerProps = {
    date: Date,
    exerciseTracker: ExerciseTracker,
};

function StepTracker({ date, exerciseTracker }: StepTrackerProps) {
    const currentStep = exerciseTracker.steps.find(item => item.status === "progress");

    let content = null;
    if (!currentStep) {
        content = <BeginExerciseTracker date={date} />
    } else if (currentStep.type === "reps") {
        content = <RepsExerciseTracker date={date} step={currentStep} />
    } else if (currentStep.type === "time") {
        content = <TimeExerciseTracker date={date} step={currentStep} />
    } else if (currentStep.type === "rest") {
        content = <RestExerciseTracker date={date} step={currentStep} />
    }

    return content;
}

type StepListProps = {
    exerciseTracker: ExerciseTracker,
};

function StepList({ exerciseTracker }: StepListProps) {
    const getIconName = (item: ExerciseStep): string => {
        switch(item.status) {
            case "pending": {
                return "account-clock";
            }
            case "progress": {
                return "progress-alert";
            }
            case "skipped": {
                return "cancel";
            }
            case "completed": {
                return "check";
            }
        }
    };

    const getTitle = (item: ExerciseStep): string => {
        if (item.type === "rest") { return "Rest"; }
        return exerciseTracker.plan[item.exercise].name;
    };

    const getDescription = (item: ExerciseStep): string => {
        switch(item.type) {
            case "rest": {
                return `${item.total} seconds.`;
            }
            case "reps": {
                return `${exerciseTracker.plan[item.exercise].reps} reps. ${exerciseTracker.plan[item.exercise].comments}`;
            }
            case "time": {
                return `${item.total} seconds. ${exerciseTracker.plan[item.exercise].comments}`
            }
        }
    };

    return (
        <Container>
            <ScrollView>
                {exerciseTracker.steps.map(item => (
                    <React.Fragment key={item.id}>
                        <List.Item
                            left={props => <List.Icon {...props} icon={getIconName(item)} />}
                            title={getTitle(item)}
                            description={getDescription(item)}
                        />
                        <Divider />
                    </React.Fragment>
                ))}
            </ScrollView>
        </Container>
    );
}

export default function ExerciseTrackerScreen({
    navigation,
}: StackScreenProps<ScreenStackParamList, 'ExerciseTrackerScreen'>) {
    const date = new Date("2000-01-01");
    const exerciseTracker = useExerciseTracker(date)!; // FIXME: this value may be undefined, ... handle this case
    return (
        <Container>
            <StepTracker date={date} exerciseTracker={exerciseTracker} />
            <StepList exerciseTracker={exerciseTracker} />
        </Container>
    );
}

const styles = StyleSheet.create({
    beginStateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    beginButton: {
        backgroundColor: Colors.light.tint,
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    repsStateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    repsWrapper: {
        backgroundColor: Colors.light.tint,
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    repsActionsWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
    },
    restStateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    restCompleteButton: {
        width: '100%',
    },
    timeStateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeActionsWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
    },
});