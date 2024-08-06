import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
} from "react-native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";

type HeaderProps = {
  title: string;
  cardQuantityItens?: number;
  onSearch: (query: string) => void; // Adicionando a função de callback onSearch
};

export function Header({ title, cardQuantityItens = 0, onSearch }: HeaderProps) {
  
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query); // Chamando a função de callback onSearch
  };
  
  return (
    <View className="flex-row items-center justify-between bg-blue-900 h-28 pt-12">
      <View className="flex-row items-center space-x-2 mx-5">
        <TouchableOpacity >
          <Feather name="menu" color={colors.white} size={34} />
        </TouchableOpacity>
        <TextInput
          className="h-9 flex-1 max-w-xs rounded-full bg-white text-center"
          placeholder="Search..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View className="flex-row items-center space-x-4">
          {cardQuantityItens > 0 && (
            <Link href="/cart" asChild>
              <TouchableOpacity activeOpacity={0.7} className="relative">
                <View className="absolute -top-2 -right-3 bg-red-800 w-4 h-4 rounded-full items-center justify-center">
                  <Text className="text-white font-bold text-xs">
                    {cardQuantityItens}
                  </Text>
                </View>
                <Ionicons name="cart-sharp" color={colors.white} size={24} />
              </TouchableOpacity>
            </Link>
          )}
          <FontAwesome name="user-circle" color={colors.white} size={27} />
        </View>
      </View>
    </View>
  );
}