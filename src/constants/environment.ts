import Constants from 'expo-constants';

const values = Constants.manifest?.extra || {};

export const GOOGLE_CLIENT_ID = values.GOOGLE_CLIENT_ID as string;
export const SERVER_HOST = values.SERVER_HOST as string;