import { StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./../../../constants/Colors"
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../../../assets/configs/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const SignUp = () => {
  const navigation = useNavigation()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  console.log(fullName,password,email)
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])
  const onCreateNewAccount = () =>{
    if(email?.length > 0 && password?.length > 0 && fullName?.length > 0){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials)=>{
        const user = userCredentials.user;
        console.log(user);
      })
      .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message
        console.log(error)
      })
    }else{
      ToastAndroid.show("Please enter all details", ToastAndroid.BOTTOM);
      return;
    }
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.signInView}>
        <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 30, paddingTop:30 }}>Create New Account</Text>

          <View style={{ marginTop: 50 }}>
            <Text style={{ fontFamily: "outfit" }}>Full Name</Text>
            <TextInput style={styles.inputField} placeholder='Enter Full Name' onChangeText={value => setFullName(value)} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: "outfit" }}>Email</Text>
            <TextInput style={styles.inputField} placeholder='Enter Email' onChangeText={value => setEmail(value)} value={email} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: "outfit" }}>Password</Text>
            <TextInput style={styles.inputField} secureTextEntry={true} placeholder='Enter Password' onChangeText={value => setPassword(value)} value={password}/>
          </View>
          <TouchableOpacity style={{ padding: 20, backgroundColor: Colors.PRIMARY, borderRadius: 15, width: "90%", marginTop: 50 }} onPress={() => onCreateNewAccount()}>
            <Text style={{ color: Colors.WHITE, textAlign: "center" }}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace("auth/sign-in")} style={{ padding: 17, backgroundColor: Colors.WHITE, borderRadius: 15, width: "90%", marginTop: 20, borderWidth: 1 }}>
            <Text style={{ color: Colors.PRIMARY, textAlign: "center" }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SignUp

const styles = StyleSheet.create({
  signInView: {
    paddingTop: "4%",
    paddingLeft: "6%",
    backgroundColor: Colors.WHITE,
    height: "100%"
  },
  signInText: {
    fontFamily: "outfit-bold",
    fontSize: 30
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