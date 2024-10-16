import { Text, View } from "react-native";
import Login from "../constants/components/Login"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Login />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
