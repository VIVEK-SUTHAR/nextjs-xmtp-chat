import shortenAddress from "@/utils/shortAddress";
import { Avatar, Box, Flex, HStack, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

type AddressInputProps = {
  isNewMessage: boolean;
  onInputBlur: (newAddress: string) => Promise<void>;
  errorMessage: string;
  selectedChat: string;
};

const AddressInput = ({
  isNewMessage,
  onInputBlur,
  errorMessage,
  selectedChat,
}: AddressInputProps) => {
  const [newAddress, setNewAddress] = useState("");
  return (
    <Flex flexDirection={"column"} flex={isNewMessage ? 1 : 0}>
      {isNewMessage ? (
        <HStack p={4}>
          <Avatar src="https://avatars.dicebear.com/api/human/120.svg" />
          <Input
            value={newAddress}
            onBlur={(e) => {
              e.preventDefault();
              onInputBlur(newAddress);
            }}
            onChange={(e) => {
              e.preventDefault();
              setNewAddress(e.target.value);
            }}
            placeholder="Enter Wallet Address"
          />
          <br />
        </HStack>
      ) : (
        <Text>Chatting with : {shortenAddress(selectedChat)}</Text>
      )}
    </Flex>
  );
};

export default AddressInput;
