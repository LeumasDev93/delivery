import { ReactNode } from "react";
import { Text } from "react-native"
import { TouchableOpacityProps, TouchableOpacity } from "react-native";

type ButtonProps = TouchableOpacityProps & {
    children: ReactNode
}

type ButtonTextProps = {
    children: ReactNode
}

type ButtonIconProps = {
    children: ReactNode
}

function Button( { children, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity className="h-12 bg-blue-900 rounded-md items-center justify-center flex-row" 
           activeOpacity={0.7}
           {...rest}
        >
            {children}
        </TouchableOpacity>
    )
}

function ButtonText( { children, ...rest }: ButtonTextProps) {
    return (
        <Text className="text-white font-heading text-base mx-2">
            {children}
        </Text>
    )
}

function ButtonIcon( { children }: ButtonIconProps) {
    return children
}


Button.Text = ButtonText
Button.Icon = ButtonIcon

export { Button }