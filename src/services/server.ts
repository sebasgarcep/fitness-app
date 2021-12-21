import axios, { AxiosRequestConfig } from 'axios';

import { SERVER_HOST } from '../constants/environment';
import { Session } from '../types';

function request(configuration?: AxiosRequestConfig) {
    return axios({
        baseURL: `${SERVER_HOST}/api/v1`,
        ...configuration,
    });
}

export function loginWithGoogle(googleIdToken: string): Promise<Session> {
    return request({
        url: '/auth/google',
        method: 'POST',
        data: {
            "id_token": googleIdToken,
        },
    })
        .then(response => {
            return response.data.data as Session;
        });
}