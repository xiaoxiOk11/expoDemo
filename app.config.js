module.exports = {
  expo: {
    name: "ghoastGame",
    slug: "ghoastGame",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "ghoastgame",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      deploymentTarget: "12.0"
    },
    android: {
      package: "com.ghoastgame.app",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      minSdkVersion: 21
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
      backgroundColor: "#ffffff",
      description: "Your app description",
      shortName: "GhoastGame",
      build: {
        babel: {
          include: ["@expo/vector-icons"]
        }
      }
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        mode: "hash"
      },
      eas: {
        projectId: "ffb644d8-301e-4362-8cef-73971de18138"
      }
    },
    owner: "xiaoxihahha"
  }
};
