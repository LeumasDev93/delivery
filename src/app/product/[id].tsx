import { View, Image, Text } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Redirect } from "expo-router";

import { useCartStore } from "@/stores/cart-store";

import { PRODUCTS } from "@/utils/data/products";
import { FormatCurrency } from "@/utils/functions/format-currency";

import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

export default function Product() {
  const cartStore = useCartStore();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const product = PRODUCTS.find((item) => item.id === id);

  function handleAddToCart() {
    cartStore.add(product!);
    navigation.goBack();
  }

  if (!product) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />

      <View className="p-5 mt-8 flex-1">
        <Text className="text-blue-900 text-2xl font-heading my-2">
          {product.title}
        </Text>
        <Text className="text-blue-900 text-2xl font-heading my-2">
          {FormatCurrency(product.price)}
        </Text>

        <Text className="text-slate-900 font-body text-base leading-6 my-2">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text
            key={ingredient}
            className="text-slate-700 font-body text-base leading-6"
          >
            {"\u2022"} {ingredient}
          </Text>
        ))}
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather color="white" name="plus-circle" size={20} />
          </Button.Icon>
          <Button.Text>Adiccionar ao pedido</Button.Text>
        </Button>
        <LinkButton
          className="text-gray-900"
          title="Voltar ao cardapio"
          href="/"
        />
      </View>
    </View>
  );
}
