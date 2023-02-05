import { WalletContext } from "@/context/WalletContext";
import StreamMessages from "@/utils/streamMessages";
import { Box, VStack } from "@chakra-ui/react";
import type { DecodedMessage } from "@xmtp/xmtp-js";
import React, { useContext } from "react";
import OneMessage from "./OneMessage";

type MessageListProps = {
  isNewMsg: boolean;
  convoMessages: DecodedMessage[];
  selectedConvo: string;
};

const MessageList = ({
  isNewMsg,
  convoMessages,
  selectedConvo,
}: MessageListProps) => {
  StreamMessages(selectedConvo);
  const { walletAddress } = useContext(WalletContext);
  return (
    <VStack minH={"72"} maxH={"80"}>
      {!isNewMsg &&
        convoMessages?.map((msg: DecodedMessage) => {
          return (
            <OneMessage
              msg={msg}
              key={msg.id}
              position={msg.senderAddress === walletAddress}
            />
          );
        })}
      {isNewMsg &&
        convoMessages?.map((msg: DecodedMessage) => {
          return (
            <OneMessage
              msg={msg}
              key={msg.id}
              position={msg.senderAddress === walletAddress}
            />
          );
        })}
    </VStack>
  );
};

export default MessageList;
