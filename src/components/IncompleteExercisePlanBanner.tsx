import React from "react";
import { Avatar, Banner } from "react-native-paper";
import { exerciseTargets } from "../constants";
import { useExercisePlan } from "../store/selectors";
import { groupBy } from "../utils";

export default function IncompleteExercisePlanBanner() {
    const exercisePlan = useExercisePlan();
    const planTargets = Array.from(groupBy(exercisePlan, item => item.target).keys());
    const shouldDisplayBanner = planTargets.length > 0 && planTargets.length < exerciseTargets.length;

    const [visible, setVisible] = React.useState(shouldDisplayBanner);

    return (
        <Banner
            visible={visible}
            actions={[
                {
                    label: 'Acknowledge',
                    onPress: () => setVisible(false),
                },
            ]}
            icon={({ color, size }) => (
                <Avatar.Icon
                    size={size}
                    color={color}
                    icon="weight-lifter"
                />
            )}
        >
            You have an incomplete exercise plan. Consider adding at least one exercise from each muscle group for a complete experience.
        </Banner>
    );
}