import { forwardRef } from "react";
import { Text, Pressable, PressableProps, View, Image, TouchableOpacityProps, ImageProps } from "react-native"
import { clsx } from "clsx"


type CategoryDataProps = PressableProps & {
    title : string
    isSelected? : boolean
    thumbnail: ImageProps
}

type CategoryProps = TouchableOpacityProps & {
    data: CategoryDataProps
}
export const  CategoryButton = forwardRef<TouchableOpacityProps, CategoryProps>(({ data, ...rest }, ref) => {
    return (
        <View 
            className="w-30 items-center justify-center"
            >
            <Pressable 
                className={`w-20 h-20 rounded-full overflow-hidden items-center justify-center mt-10 ${
                    data.isSelected ? "border-4 border-blue-700" : ""
                }`}
                {...rest}
                >
                <Image source={data.thumbnail} className="w-full h-full" />
            </Pressable>
            <Text className="text-blue-900 font-bold mb-10">{data.title}</Text>
        </View>
    )
})
 