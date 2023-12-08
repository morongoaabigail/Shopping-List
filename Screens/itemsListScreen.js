import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput, // Add TextInput for search input
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../Redux/reducers";
import ItemForm from "../components/ItemsForm";
import Modal from "react-native-modal";
import home from "../assets/home.png";

function ItemListScreen() {
  const shoppingList = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  // Calculate the total cost by multiplying price with quantity for each item
  const totalCost = shoppingList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Filter the shoppingList based on the search term
  const filteredList = shoppingList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <ScrollView>
        {/* Add the search input field */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search for items..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />

        <Image
          source={home}
          style={{
            height: 400,
            width: 370,
            marginVertical: 20,
            alignSelf: "center",
          }}
        />

        <TouchableOpacity
          title="Create Shopping List"
          onPress={toggleModal}
          style={{
            backgroundColor: "blue",
            height: 40,
            width: "80%",
            marginVertical: 13,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 16,
              paddingTop: 9,
            }}
          >
            Create a list{" "}
          </Text>
        </TouchableOpacity>

        <FlatList
          data={filteredList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <View style={styles.listItemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.textContainer}>
                <Text>{item.name}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Price: R{item.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                  <Text style={{color:"blue", fontWeight:"600", left:97, top:23}}>Delete</Text>
                </TouchableOpacity>
                {/* <Button title="Remove" onPress={() => handleRemoveItem(item.id)} /> */}
              </View>
            </View>
          )}
        />

        <View style={styles.totalContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total Cost:</Text>
          <Text style={{ fontSize: 20 }}>R{totalCost.toFixed(2)}</Text>
        </View>

        <Modal isVisible={isModalVisible}>
          <ItemForm toggleModal={toggleModal} image={home} />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
  },
  textContainer: {},
  image: {
    width: 70,
    height: 70,
    marginHorizontal: 15,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  searchInput: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 45,
    alignSelf: "center",
  },
});

export default ItemListScreen;
