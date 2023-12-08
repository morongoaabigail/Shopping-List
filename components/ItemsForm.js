import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/reducers";
import { AntDesign } from '@expo/vector-icons'; 
import * as ImagePicker from "expo-image-picker";

function ItemForm({ toggleModal }) {
  const [itemName, setItemName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access the image library is required.");
      }
    })();
  }, []);

  const calculateTotalPrice = () => {
    const unitPrice = parseFloat(price);
    const qty = parseInt(quantity);
    if (!isNaN(unitPrice) && !isNaN(qty)) {
      return (unitPrice * qty).toFixed(2);
    }
    return "0.00";
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: itemName,
      store: storeName,
      image,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };

    dispatch(addItem(newItem));
    setItemName("");
    setStoreName("");
    setImage("");
    setPrice("");
    setQuantity("1");
    toggleModal();
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      setImage(selectedImage.uri);
    }
  };

  const handleScroll = () => {
    Keyboard.dismiss(); // Close the keyboard when scrolling
  };

  return (
    <ScrollView
      contentContainerStyle={styles.formContainer}
      onScroll={handleScroll}
      style={styles.modalBackground}
    >
      <View style={styles.header}>
        <Text style={{ fontSize: 20, color:"blue", fontWeight:"800", bottom:34, }}>Add Item</Text>
        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
        <AntDesign name="closecircle" size={24} color="blue" />
        </TouchableOpacity>
      </View>
     

      <TextInput
        style={styles.input}
        placeholder="Item Name"
        placeholderTextColor="#888"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Store"
        placeholderTextColor="#888"
        value={storeName}
        onChangeText={(text) => setStoreName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#888"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.quantityInput}
        placeholder="Quantity"
        placeholderTextColor="#888"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        keyboardType="numeric"
      />
      <Text style={{ marginVertical: 15, fontWeight:"600", fontSize:20}}>
        {image ? <Image source={{ uri: image }} style={styles.imagePreview} /> : null} Total Price: R{calculateTotalPrice()}
      </Text>
      <TouchableOpacity onPress={selectImage} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Select Image</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent:"center",
  },
  modalBackground: {
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
   bottom:160,
    left: 100,
  },
  
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#fff",
    width: "80%",
  },
  quantityInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#fff",
    width: "80%",
  },
  uploadButton: {
    height: 30,
    width: "80%",
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  addButton: {
    height: 30,
    width: "80%",
    backgroundColor: "blue",
    marginTop: 10,
    marginBottom: 50, // Added margin to push the "Add" button up
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  image: {
    height: 200, // Adjusted the height
    width: "100%",
  },
  imagePreview: {
    width: 80,
    height: 80,
  },
});

export default ItemForm;
