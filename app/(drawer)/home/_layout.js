// import { Drawer } from "expo-router/drawer";

// const DrawerLayout = () => {
//   return (
//     <Drawer screenOptions={{ headerShown: false }}>
//       <Drawer.Screen
//         name="Home"
//         options={{
//           drawerLabel: "Home",
//           title: "Home",
//         }}
//       ></Drawer.Screen>
//       <Drawer.Screen
//         name="Popular"
//         options={{
//           drawerLabel: "Popular",
//           title: "Popular",
//         }}
//       ></Drawer.Screen>
//       <Drawer.Screen
//         name="Nearby"
//         options={{
//           drawerLabel: "Nearby",
//           title: "Nearby",
//         }}
//       ></Drawer.Screen>
//     </Drawer>
//   );
// };

// export default DrawerLayout;

import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Drawer } from "expo-router/drawer";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../../../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../../../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../../../assets/fonts/DMSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return <Stack onLayout={onLayoutRootView} />;
};

export default Layout;
