/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ReactNode, useState } from "react";
import { TextInput } from "react-native";
import { Select as NativeBaseSelect, ISelectProps, CheckIcon, FormControl, Text } from "native-base";
import React from "react";

type SelectProps = ISelectProps & {
  errorMessage?: string | null;
  children: ReactNode;
  label?: string;
  isRequired?: boolean;
  enabledFilter?: boolean;
}

export function Select({  errorMessage = null,label, isRequired = false, children,  enabledFilter = false, ...rest} : SelectProps){
  const invalid = !!errorMessage;
  const [filterText, setFilterText] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filteredChildren = React.Children.toArray(children).filter(child => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const childLabel = (child as React.ReactElement).props.label;
    if (!childLabel) return false;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return childLabel.toLowerCase().includes(filterText.toLowerCase());
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setFilterText(""); // Limpa o texto do filtro ao fechar
  };
  return(
    <FormControl isInvalid={invalid} mb={2}>
      {label && (
        <FormControl.Label>
          {label}
          {isRequired && <Text color="red.500">*</Text>}
        </FormControl.Label>
      )}
      {enabledFilter && (
        <TextInput
          placeholder="Filtrar..."
          value={filterText}
          onChangeText={text => setFilterText(text)}
          // Estilize seu TextInput conforme necessário
        />
      )}
      <NativeBaseSelect 
        onOpen={handleOpen}
        onClose={handleClose}
        bg="white"
        h={12}
        px={4}
        borderWidth={2}
        fontSize="md"
        fontFamily="body"
        color="gray.300"
        backgroundColor='lightGray'
        placeholderTextColor="gray.300"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size={4} />,
        }}
        {...rest}
      >
        {enabledFilter ? filteredChildren : children}
      </NativeBaseSelect>
      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
    
  )
}

export { NativeBaseSelect };