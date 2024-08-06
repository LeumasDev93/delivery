import { useState, useEffect } from "react";
import { useNavigation } from "expo-router";
import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { PHONE_NUMBER } from "@/utils/data/products";

import { FormatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { ProductCart } from "@/components/productCart";

export default function Cart() {
  const [address, setAddress] = useState("");
  const cartStore = useCartStore();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState<PHONE_NUMBER[]>([]);
  const [total, setTotal] = useState(FormatCurrency(0));

  useEffect(() => {
    setTotal(calculateTotal());
  }, [cartStore.products]);

  const calculateTotal = () => {
    return FormatCurrency(
      cartStore.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      )
    );
  };

  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  function handleProductRemove(productId: string) {
    Alert.alert("Remover", `Deseja remover este item do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => {
          cartStore.remove(productId); // Remova o produto completamente
          setTotal(calculateTotal());
        },
      },
    ]);
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega.");
    }

    const products = cartStore.products
      .map((Product) => `\n ${Product.quantity} ${Product.title} \n ${Product.description}`)
      .join("");

    const message = `
        🍔 NOVO PEDIDO 
        \n Entregar em: ${address}

        ${products}

        \n Valor Total: ${total}
        `;

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`
    );
    console.log(phoneNumber, "phoneNumber");
    cartStore.clear();
    setTotal(FormatCurrency(0));
    navigation.goBack();
  }

  const handleIncrement = (id: string) => {
    const product = cartStore.products.find((product) => product.id === id);
    if (product) {
      product.quantity += 1;
      setTotal(calculateTotal());
    }
  };

  const handleDecrement = (id: string) => {
    const product = cartStore.products.find((product) => product.id === id);
    if (product && product.quantity > 1) {
      product.quantity -= 1;
      setTotal(calculateTotal());
    }
  };

  const renderProducts = () => {
    const productRows = [];
    for (let i = 0; i < cartStore.products.length; i += 2) {
      productRows.push(
        <View key={i} className="flex-row justify-between my-4">
          <ProductCart
            key={cartStore.products[i].id}
            data={cartStore.products[i]}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleProductRemove}
          />
          {cartStore.products[i + 1] && (
            <ProductCart
              key={cartStore.products[i + 1].id}
              data={cartStore.products[i + 1]}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleProductRemove}
            />
          )}
        </View>
      );
    }
    return productRows;
  };

  function handleSearch(query: string) {
   
  }

  return (
    <View className="flex-1">
      <Header title=""  cardQuantityItens={cartQuantityItems} onSearch={handleSearch}/>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
        <View className="flex-row items-center m-5">
          <Text className="text-gray-900 text-2xl font-bold">Total:</Text>
          <Text className="text-blue-900 text-2xl font-heading ml-2">
            {total}
          </Text>
        </View>

        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="flex-1 border-b border-gray-700 my-4">
                {renderProducts()}
              </View>
            ) : (
              <Text className="font-body text-gray-400 text-center my-8">
                Seu carrinho está vazio
              </Text>
            )}

            <Input
              placeholder="Informe o endereço de entrega com zona e rua..."
              onChangeText={setAddress}
              blurOnSubmit={true}
              onSubmitEditing={handleOrder}
              returnKeyType="next"
            />
            <View className="bg-gray-50 rounded-md px-4 font-body text-sm text-gray-900 my-4">
              <Picker
                style={{ width: "100%", height: 50 }}
                selectedValue={phoneNumber}
                onValueChange={(value) => setPhoneNumber(value)}
              >
                <Picker.Item label="Leumas" value="2385267277" />
                <Picker.Item label="Samuel" value="2385961753" />
                <Picker.Item label="Heleno" value="2389855607" />
                <Picker.Item label="Sepol" value="2389855901" />
              </Picker>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar Pedido</Button.Text>
          <Button.Icon>
            <Feather color="white" name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>
        <LinkButton
          className="text-gray-900"
          title="Voltar ao cardápio"
          href="/"
        />
      </View>
    </View>
  );
}
