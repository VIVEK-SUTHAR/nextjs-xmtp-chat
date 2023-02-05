import getRelativeTime from "@/utils/getDiff";
import getDifference from "@/utils/getDiff";
import shortenAddress from "@/utils/shortAddress";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import type { DecodedMessage } from "@xmtp/xmtp-js";
import React, { useEffect, useState } from "react";

type OneMessageProps = {
  msg: DecodedMessage;
  position: boolean;
};

const OneMessage = ({ msg, position }: OneMessageProps) => {
  console.log(msg);

  const [seed, setSeed] = useState(0);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  return (
    <HStack
      bg={position ? "gray.100" : "red.100"}
      w={"auto"}
      height={"auto"}
      maxW={"80"}
      alignSelf={position ? "flex-end" : "flex-start"}
      flexDirection={position ? "row-reverse" : "row"}
      alignItems="flex-end"
      px={4}
      py={2}
      borderRadius={4}
    >
      <Avatar
        src={`${
          !position
            ? `https://avatars.dicebear.com/api/human/${seed}.svg`
            : "https://avatars.dicebear.com/api/human/450.svg"
        }`}
        size={"xs"}
      />
      <VStack justifyContent={"flex-start"} alignItems="flex-start">
        <Text marginRight={position ? 2 : 0}>{msg.content}</Text>
        <Text fontSize={"xs"}>{getRelativeTime(msg.sent.getTime())}</Text>
      </VStack>
    </HStack>
  );
};

export default OneMessage;
