import { Avatar, Box, HStack, Input, Text } from "@chakra-ui/react";
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
    <div className={`flex flex-dir-col ${isNewMessage ? "flex-1" : ""}`}>
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
          {errorMessage && <Text color={"red.200"}>{errorMessage}</Text>}
        </HStack>
      ) : (
        <Text>Chatting with : {selectedChat}</Text>
      )}
    </div>
  );
};

export default AddressInput;
