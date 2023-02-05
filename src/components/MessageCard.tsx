import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

type MessageCardProps = {
  setSelectedChat: any;
  address: string | unknown;
  latestMessage: string;
};

function MessageCard(props: MessageCardProps) {
  const { address, latestMessage, setSelectedChat } = props;
  return (
    <HStack
      justifyContent={"flex-start"}
      p={4}
      borderColor={"gray.600"}
      borderRadius={4}
      borderWidth={2}
      my={2}
      onClick={() => setSelectedChat(address)}
    >
      <Avatar src="https://avatars.dicebear.com/api/human/450.svg" />
      <VStack justifyContent={"flex-start"} alignItems="flex-start">
        <Text>{address}</Text>
        {latestMessage && <Text>{latestMessage.content}</Text>}
      </VStack>
    </HStack>
  );
}

export default MessageCard;
