import { StyleSheet, Text, TextInput, ToastAndroid, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../../../assets/configs/FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  sendEmailVerification
} from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const SignUp = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const redirectUri = AuthSession.makeRedirectUri({
    native: "myapp://redirect",
    useProxy: true,
  });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_ID,
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredentials) => {
          router.replace("/MyTrip");
        })
        .catch((error) => {
          console.error('Google Sign-In error:', error);
          ToastAndroid.show("Google Sign-In failed", ToastAndroid.BOTTOM);
        });
    }
  }, [response]);

  const checkEmailVerifiedAndRedirect = async () => {
    setIsVerifying(true);
    const interval = setInterval(async () => {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        clearInterval(interval);
        setIsVerifying(false);
        ToastAndroid.show("Email Verified!", ToastAndroid.BOTTOM);
        router.replace("/MyTrip");
      }
    }, 3000);
  };

  const onCreateNewAccount = async () => {
    if (email && password && fullName) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredentials.user);
        ToastAndroid.show("Verification email sent. Please check your inbox.", ToastAndroid.LONG);
        checkEmailVerifiedAndRedirect();
      } catch (error) {
        console.error('Signup error:', error);
          console.error('Signup error:', error);
          let message = "Something went wrong. Please try again.";
          switch (error.code) {
            case 'auth/email-already-in-use':
              message = "This email is already registered. Please try signing in.";
              break;
            case 'auth/invalid-email':
              message = "Please enter a valid email address.";
              break;
            case 'auth/weak-password':
              message = "Password should be at least 6 characters.";
              break;
            case 'auth/missing-password':
              message = "Please enter your password.";
              break;
            default:
              message = error.message;
              break;
          }
          ToastAndroid.show(message, ToastAndroid.LONG);
        }
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
            disabled={isVerifying}
          >
            <Text style={{ color: Colors.WHITE, textAlign: "center" }}>
              {isVerifying ? "Verifying..." : "Create Account"}
            </Text>
          </TouchableOpacity>

          {isVerifying && (
            <View style={{ marginTop: 20 }}>
              <ActivityIndicator size="large" color={Colors.PRIMARY} />
              <Text style={{ marginTop: 10, fontFamily: "outfit" }}>
                Waiting for email verification...
              </Text>
            </View>
          )}

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
