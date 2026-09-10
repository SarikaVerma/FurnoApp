// Must be the very first import in the entry file — this is how
// react-native-gesture-handler installs its native event handling.
import "react-native-gesture-handler";
import React from "react";
import { View, Platform, StyleSheet, useWindowDimensions, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen from "./src/views/OnboardingScreen";
import LoginScreen from "./src/views/LoginScreen";
import VerificationScreen from "./src/views/VerificationScreen";
import ProfileScreen from "./src/views/ProfileScreen";
import HomeScreen from "./src/views/HomeScreen";
import FiltersScreen from "./src/views/FiltersScreen";
import WalletScreen from "./src/views/WalletScreen";
import ProductDetailScreen from "./src/views/ProductDetailScreen";
import ReviewsScreen from "./src/views/ReviewsScreen";
import CartScreen from "./src/views/CartScreen";
import PaymentScreen from "./src/views/PaymentScreen";
import NotificationsScreen from "./src/views/NotificationsScreen";
import SettingsScreen from "./src/views/SettingsScreen";
import { useSessionViewModel } from "./src/viewmodels/useSessionViewModel";
import { colors } from "./src/theme";

// JS-only stack navigator — see note in git history / prior conversation:
// native-stack fails with a TurboModuleRegistry/PlatformConstants error in
// Expo Snack's bridgeless runtime, this version has no native dependency.
const Stack = createStackNavigator();

export default function App() {
  // CSS `100vh` is unreliable inside Snack's nested iframe embedding — it
  // can resolve against the wrong viewport. useWindowDimensions() instead
  // reads the real, live pixel height straight from the browser (and
  // updates automatically on resize/orientation change), giving every
  // downstream flex:1 + minHeight:0 a concrete number to actually shrink
  // into. Native iOS/Android don't need this — height is undefined there
  // and the root just falls back to flex:1 sizing to the screen normally.
  const { height } = useWindowDimensions();
  // Resolves once at startup: does a persisted session already exist?
  // The Stack.Navigator only mounts once this is known, so its
  // initialRouteName is correct on the very first render instead of
  // flashing Onboarding before redirecting.
  const { checking, initialRoute } = useSessionViewModel();

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <View style={[styles.root, Platform.OS === "web" && { height }]}>
        {checking ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.crimson} />
          </View>
        ) : (
          <NavigationContainer>
            {/* headerMode: "float" is load-bearing on web, even with headers hidden.
                @react-navigation/stack's CardSheet only clips a screen to flex:1 +
                overflow:hidden when headerMode === "float"; its own default falls
                back to "screen" on every non-iOS platform, which switches it into
                minHeight:100% "let document.body scroll" mode instead. That's what
                was letting the Home screen grow past the viewport and push the tab
                bar off-screen — the app's own ScrollView/flex styles were correct
                the whole time. */}
            <Stack.Navigator
              initialRouteName={initialRoute}
              screenOptions={{ headerShown: false, headerMode: "float" }}
            >
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Verification" component={VerificationScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Filters" component={FiltersScreen} />
              <Stack.Screen name="Wallet" component={WalletScreen} />
              <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
              <Stack.Screen name="Reviews" component={ReviewsScreen} />
              <Stack.Screen name="Cart" component={CartScreen} />
              <Stack.Screen name="Payment" component={PaymentScreen} />
              <Stack.Screen name="Notifications" component={NotificationsScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </View>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    ...Platform.select({
      web: { overflow: "hidden" },
      default: {},
    }),
  },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
});
