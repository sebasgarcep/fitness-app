import 'dotenv/config';

export default {
	expo: {
		name: "Fitness App",
		slug: "fitness-app",
		version: "0.1.0",
		orientation: "portrait",
		icon: "./assets/images/icon.png",
		scheme: "fitnessapp",
		userInterfaceStyle: "automatic",
		splash: {
			image: "./assets/images/splash.png",
			resizeMode: "contain",
			backgroundColor: "#add8e6",
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: [
			"**/*",
		],
		ios: {
			bundleIdentifier: "fitness.app",
			supportsTablet: true,
		},
		android: {
			package: "fitness.app",
			adaptiveIcon: {
				foregroundImage: "./assets/images/adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
		},
		web: {
			favicon: "./assets/images/favicon.png",
		},
        extra: {},
	},
};
