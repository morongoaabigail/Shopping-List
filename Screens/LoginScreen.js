import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { signInWithEmailAndPassword, getAuth } from "@firebase/auth";
import Login from "../assets/login.png"
import app from "../firebaseConfig";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app); // Initialize the auth instance

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Successfully logged in
      navigation.navigate("Home"); // Navigate to the "home" page
    } catch (error) {
      console.log("Login Error:", error);
      // Handle login error
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior="padding"
      enabled>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>
          Welcome
        </Text>
        <Image source={Login} style={styles.image} />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your email"
            borderColor="black"
            value={email}
            style={styles.inputs}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={true}
            
            value={password}
            style={styles.inputs}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity onPress={handleLogin} >
          <Text style={{color:"blue", fontWeight:"800", marginTop:13, fontSize:17}}>Sign In</Text>
        </TouchableOpacity>
        
        <Text onPress={() => navigation.navigate("Register")} style={{color:"blue", marginTop:10}}>
          Don't have an account? Register here.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
   
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color:"blue"
  },
  image: {
    height: 330,
    width: 350,
  },
  inputContainer: {
    width: "80%",
  },
  inputs: {
    height: 40,
    width: "100%",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    height: 40,
    width: "80%",
    marginVertical: 10,
    color: "white",
  },
});

export default LoginScreen;
