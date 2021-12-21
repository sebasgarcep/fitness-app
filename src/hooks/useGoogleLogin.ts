import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';

import { GOOGLE_CLIENT_ID } from '../constants/environment';
import { loginWithGoogle } from '../services/server';
import { useLogin } from '../store/actions/session';

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleLogin(): [boolean, () => any] {
    const login = useLogin();

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: GOOGLE_CLIENT_ID,
    });

    React.useEffect(() => {
        if (response?.type === "success") {
            const { id_token: idToken } = response.params;
            loginWithGoogle(idToken)
                .then(session => login(session));
        }
    }, [response]);

    const loading = !request;

    const prompt = () => {
        promptAsync();
    };

    return [loading, prompt];
}