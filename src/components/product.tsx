import { forwardRef } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageProps,
  View,
  Text,
} from "react-native";

type ProductDataProps = {
  title: string;
  description: string;
  thumbnail: ImageProps;
  quantity?: number;
};

type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps;
};

export const Product = forwardRef<TouchableOpacity, ProductProps>(
  ({ data, ...rest }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className="w-full h-96 items-center mt-6 pb-4 border-3 bg-white shadow-lg rounded-xl"
        {...rest}
      >
        <View className="w-full bg-red-800 rounded-t-xl">
          <View className="w-full flex-row items-center justify-between p-3">
            <Text className="text-white font-bold text-sm md:text-base">
              20 Restaurantes Disponíveis
            </Text>
            <Ionicons name="filter-sharp" color={colors.white} size={24} />
          </View>
        </View>
        <Image source={data.thumbnail} className="w-full h-32 " />

        <View className="flex-1 p-3 w-full">
          <View className="flex-row items-center justify-between">
            <Text className="text-red-800 font-bold text-base">
              {data.title}
            </Text>
            <FontAwesome name="heart-o" color={colors.red[800]} size={24} />
            {data.quantity && (
              <Text className="text-slate-400 font-subtitle text-sm">
                x {data.quantity}
              </Text>
            )}
          </View>
          <View className="w-full h-0.5 bg-blue-900 my-2"></View>
          <View className="flex-row justify-between space-x-4">
            <View className="flex-1">
              <Text className="font-bold text-sm md:text-base">Restaurante:</Text>
              <Text className="font-subtitle text-xs md:text-sm">{data.title}</Text>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-sm md:text-base">Tempo de Entrega:</Text>
              <Text className="font-subtitle text-xs md:text-sm">10 a 15 min</Text>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-sm md:text-base">Total de Pedidos:</Text>
              <Text className="font-subtitle text-xs md:text-sm">105</Text>
            </View>
          </View>
          <View className="w-full h-0.5 bg-blue-900 my-4"></View>
          <Text className="text-slate-400 text-xs leading-5">
            {data.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);
