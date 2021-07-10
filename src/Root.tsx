import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReactReduxProvider } from 'react-redux';
import { Provider as ReactNativePaperProvider } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from './store';

export default function Root() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <ReactReduxProvider store={store}>
                <ReactNativePaperProvider>
                    <SafeAreaProvider>
                        <Navigation colorScheme={colorScheme} />
                        <StatusBar />
                    </SafeAreaProvider>
                </ReactNativePaperProvider>
            </ReactReduxProvider>
        );
    }
}
