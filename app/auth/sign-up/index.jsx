import { StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./../../../constants/Colors";
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../../../assets/configs/FirebaseConfig';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

const SignUp = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  // Replace with your actual web client ID
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', 
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log('Google Sign-In success:', user);
          // Navigate to your app's main screen after successful login
        })
        .catch((error) => {
          console.error('Google Sign-In error:', error);
          ToastAndroid.show("Google Sign-In failed", ToastAndroid.BOTTOM);
        });
    }
  }, [response]);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const onCreateNewAccount = () => {
    if (email && password && fullName) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
        })
        .catch((error) => {
          console.error('Signup error:', error);
          ToastAndroid.show(error.message, ToastAndroid.BOTTOM);
        });
    } else {
      ToastAndroid.show("Please enter all details", ToastAndroid.BOTTOM);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.signInView}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 30, paddingTop: 30 }}>Create New Account</Text>

          <View style={{ marginTop: 50 }}>
            <Text style={{ fontFamily: "outfit" }}>Full Name</Text>
            <TextInput style={styles.inputField} placeholder='Enter Full Name' onChangeText={setFullName} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: "outfit" }}>Email</Text>
            <TextInput style={styles.inputField} placeholder='Enter Email' onChangeText={setEmail} value={email} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: "outfit" }}>Password</Text>
            <TextInput style={styles.inputField} secureTextEntry={true} placeholder='Enter Password' onChangeText={setPassword} value={password} />
          </View>
          <TouchableOpacity style={{ padding: 20, backgroundColor: Colors.PRIMARY, borderRadius: 15, width: "90%", marginTop: 50 }} onPress={onCreateNewAccount}>
            <Text style={{ color: Colors.WHITE, textAlign: "center" }}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => promptAsync()} style={{ padding: 17, backgroundColor: Colors.WHITE, borderRadius: 15, width: "90%", marginTop: 20, borderWidth: 1 }}>
            <Text style={{ color: Colors.PRIMARY, textAlign: "center" }}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace("auth/sign-in")} style={{ padding: 17, backgroundColor: Colors.WHITE, borderRadius: 15, width: "90%", marginTop: 20, borderWidth: 1 }}>
            <Text style={{ color: Colors.PRIMARY, textAlign: "center" }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  signInView: {
    paddingTop: "4%",
    paddingLeft: "6%",
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  inputField: {
    padding: 15,
    marginTop: 5,
    width: "90%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
  },
});
