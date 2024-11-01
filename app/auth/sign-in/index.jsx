import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./../../../constants/Colors"
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const SignIn = () => {
  const router = useRouter()
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.signInView}>
          <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.signInText}>Let's Sign You In</Text>
          <Text style={{ color: Colors.GRAY, fontFamily: "outfit", fontSize: 28, marginTop: 20 }}>Welcome Back!</Text>
          <Text style={{ color: Colors.GRAY, fontFamily: "outfit", fontSize: 20, marginTop: 10 }}>You've Been Missed</Text>
          <View style={{ marginTop: 50 }}>
            <Text style={{ fontFamily: "outfit" }}>Email</Text>
            <TextInput style={styles.inputField} placeholder='Enter Email' />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: "outfit" }}>Password</Text>
            <TextInput style={styles.inputField} secureTextEntry={true} placeholder='Enter Password' />
          </View>
          <TouchableOpacity style={{ padding: 20, backgroundColor: Colors.PRIMARY, borderRadius: 15, width: "90%", marginTop: 50 }}>
            <Text style={{ color: Colors.WHITE, textAlign: "center" }}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace("auth/sign-up")} style={{ padding: 17, backgroundColor: Colors.WHITE, borderRadius: 15, width: "90%", marginTop: 20, borderWidth: 1 }}>
            <Text style={{ color: Colors.PRIMARY, textAlign: "center" }}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SignIn

const styles = StyleSheet.create({
  signInView: {
    paddingTop: "4%",
    paddingLeft: "6%",
    backgroundColor: Colors.WHITE,
    height: "100%"
  },
  signInText: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    paddingTop:30
  },
  inputField: {
    padding: 15,
    marginTop: 5,
    width: "90%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY
  }
})