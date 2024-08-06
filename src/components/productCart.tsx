import { forwardRef } from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageProps,
  ViewProps,
} from "react-native";
import { FormatCurrency } from "@/utils/functions/format-currency";

type ProductDataProps = {
  id: string;
  title: string;
  description: string;
  thumbnail: ImageProps;
  price: number;
  quantity: number;
};

type ProductProps = ViewProps & {
  data: ProductDataProps;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
};

export const ProductCart = forwardRef<TouchableOpacity, ProductProps>(
  ({ data, onIncrement, onDecrement, onRemove, ...rest }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className="w-44 h-auto items-center mt-6 pb-4 border-3 shadow-2xl rounded-2xl bg-white"
        // style={{ backgroundColor: "#991B1B" }} // Red 800 in hex
        {...rest}
        disabled
      >
        <View className="absolute -mt-10 bg-gray-300 w-28 h-28 mx:w-20 mx:-20 rounded-full ">
          <Image
            source={data.thumbnail}
            className="w-full h-full rounded-full "
          />
        </View>

        <View className="mt-24 items-center justify-center mx-5">
          <Text className="text-red-800 font-bold text-2xl">{data.title}</Text>

          <View className="flex flex-row justify-between items-center space-x-2 mt-4">
            <View className="flex flex-row justify-between items-center w-12 h-8 bg-red-800 rounded-full px-2">
              <Text className="text-white text-md">{data.quantity}</Text>
              <View className="flex flex-col justify-between items-center ml-2">
                <TouchableOpacity onPress={() => onIncrement(data.id)}>
                  <Feather name="arrow-up" size={14} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDecrement(data.id)}>
                  <Feather name="arrow-down" size={14} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
            <Text className="text-red-800 text-md mt-2">
              {FormatCurrency(data.price * data.quantity)}
            </Text>
          </View>
          <View className="w-40 h-0.5 bg-white my-2"></View>
          <View className="flex-row justify-between w-full">
            <TouchableOpacity onPress={() => onRemove(data.id)}>
              <Feather name="trash-2" size={24} color="#991B1B" />
            </TouchableOpacity>
            <View className="w-10 h-8 bg-red-800 rounded-full items-center justify-center">
              <FontAwesome name="heart-o" color="#FFFFFF" size={20} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);
