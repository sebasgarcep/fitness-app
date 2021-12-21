import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Title, Subheading } from 'react-native-paper';

import Container from '../components/Container';
import { RootStackParamList } from '../types';
import useGoogleLogin from '../hooks/useGoogleLogin';
import { useSession } from '../store/selectors/session';
 
export default function LoginScreen({
    navigation,
}: StackScreenProps<RootStackParamList, 'Login'>) {
    const session = useSession();
    const [loadingGoogleLogin, promptGoogleLogin] = useGoogleLogin();

    React.useEffect(() => {
        if (session) {
            navigation.replace("Root");
        }
    }, [session]);

    return (
        <Container style={styles.container}>
            <Title style={styles.title}>Fitness App</Title>
            <Subheading style={styles.subtitle}>keep working.</Subheading>
            <Button
                disabled={loadingGoogleLogin}
                icon="google"
                mode="contained"
                onPress={promptGoogleLogin}
            >
                Login with Google
            </Button>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
    },
    subtitle: {
        marginBottom: 60,
    },
});
