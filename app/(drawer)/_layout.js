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
//     </Drawer>
//   );
// };

// export default DrawerLayout;

import { Drawer } from "expo-router/drawer";

const DrawerLayout = () => {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Home",
          title: "home",
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="nearby"
        options={{
          drawerLabel: "nearby",
          title: "nearby",
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="popular"
        options={{
          drawerLabel: "popular",
          title: "popular",
        }}
      ></Drawer.Screen>
    </Drawer>
  );
};

export default DrawerLayout;
