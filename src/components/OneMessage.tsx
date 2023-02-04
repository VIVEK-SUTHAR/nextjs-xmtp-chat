import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import type { DecodedMessage } from "@xmtp/xmtp-js";
import React from "react";

type OneMessageProps = {
  msg: DecodedMessage;
  position: boolean;
};

const OneMessage = ({ msg, position }: OneMessageProps) => {
  return (
    <Box w={"100%"} my="1">
      <HStack flexDirection={position ? "row-reverse" : "row"}>
        <Avatar src="https://avatars.dicebear.com/api/human/450.svg" />
        <VStack justifyContent={"flex-start"} alignItems="flex-start">
          {!position && <Text>{msg.senderAddress}</Text>}
          {/* <Text>{position ? "You" : msg.senderAddress}</Text> */}
          <Text>{msg.content}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default OneMessage;
