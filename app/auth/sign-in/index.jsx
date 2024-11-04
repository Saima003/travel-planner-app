import { StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./../../../constants/Colors"
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../assets/configs/FirebaseConfig';
const SignIn = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter valid Email and Password", ToastAndroid.LONG);
      return;
    }
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage;
        switch (errorCode) {
          case "auth/user-not-found":
            errorMessage = "Email not found.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password.";
            break;
          default:
            errorMessage = "Invalid Credentials";
            break;
        }
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        console.log(error);
      });
  };
  
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
            <TextInput style={styles.inputField} placeholder='Enter Email'  onChangeText={(value) => setEmail(value)}/>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: "outfit" }}>Password</Text>
            <TextInput style={styles.inputField} secureTextEntry={true} placeholder='Enter Password' onChangeText={(value) => setPassword(value)} />
          </View>
          <TouchableOpacity style={{ padding: 20, backgroundColor: Colors.PRIMARY, borderRadius: 15, width: "90%", marginTop: 50 }} onPress={()=> onSignIn()}>
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