import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Title, Subheading, ActivityIndicator } from 'react-native-paper';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import Container from '../components/Container';
import { RootStackParamList } from '../types';

WebBrowser.maybeCompleteAuthSession();

function isLoggedIn() {
    // FIXME: Unmock this
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(false), 500);
    });
}

async function validateLoginStatus(
    navigation: StackNavigationProp<RootStackParamList, 'Login'>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
    if (await isLoggedIn()) {
        navigation.replace("Root");
    } else {
        setLoading(false);
    }
}
 
export default function LoginScreen({
    navigation,
}: StackScreenProps<RootStackParamList, 'Login'>) {
    // FIXME: Extract into env file
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '', // FIXME: Load from env/build variables
    });

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        validateLoginStatus(navigation, setLoading);
    }, [navigation, setLoading]);

    React.useEffect(() => {
        if (response?.type === "success") {
            const { id_token: idToken } = response.params;
            console.log(idToken);
        }
    }, [response]);

    return (
        <Container style={styles.container}>
            {
                loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <React.Fragment>
                        <Title style={styles.title}>Fitness App</Title>
                        <Subheading style={styles.subtitle}>keep working.</Subheading>
                        <Button
                            disabled={!request}
                            icon="google"
                            mode="contained"
                            onPress={() => {
                                promptAsync();
                            }}
                        >
                            Login with Google
                        </Button>
                    </React.Fragment>
                )
            }
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
