import { StyleSheet, Text, TextInput, ToastAndroid, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../../../assets/configs/FirebaseConfig';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session'; // ✅ This was missing

// WebBrowser.maybeCompleteAuthSession();

const SignUp = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  // ✅ Make sure you're using the correct Web Client ID (for Expo)
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
  console.log("Redirect URI:", redirectUri);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_ID, // This must be a Web client ID
    redirectUri,
  });

  useEffect(() => {
    console.log(response,"ressss")
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredentials) => {
          const user = userCredentials.user;
          router.replace("/MyTrip");
        })
        .catch((error) => {
          console.error('Google Sign-In error:', error);
          ToastAndroid.show("Google Sign-In failed", ToastAndroid.BOTTOM);
        });
    }
  }, [response]);

  const onCreateNewAccount = () => {
    if (email && password && fullName) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          router.replace("/MyTrip");
        })
        .catch((error) => {
          console.error('Signup error:', error);
          ToastAndroid.show(error.message, ToastAndroid.BOTTOM);
        });
    } else {
      ToastAndroid.show("Please enter all details", ToastAndroid.BOTTOM);
    }
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.signInView}>
          <TouchableOpacity onPress={handleGoBack}>
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
            <TextInput style={styles.inputField} secureTextEntry placeholder='Enter Password' onChangeText={setPassword} value={password} />
          </View>
          <TouchableOpacity
            style={{ padding: 20, backgroundColor: Colors.PRIMARY, borderRadius: 15, width: "90%", marginTop: 50 }}
            onPress={onCreateNewAccount}
          >
            <Text style={{ color: Colors.WHITE, textAlign: "center" }}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("pressed");
              promptAsync({ useProxy: true });}}
            disabled={!request}
            style={{ padding: 17, backgroundColor: Colors.WHITE, borderRadius: 15, width: "90%", marginTop: 20, borderWidth: 1 }}
          >
            <Text style={{ color: Colors.PRIMARY, textAlign: "center" }}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("auth/sign-in")}
            style={{ padding: 17, backgroundColor: Colors.WHITE, borderRadius: 15, width: "90%", marginTop: 20, borderWidth: 1 }}
          >
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
