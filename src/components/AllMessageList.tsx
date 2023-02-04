import { WalletContext } from "@/context/WalletContext";
import StreamMessages from "@/utils/streamMessages";
import type { DecodedMessage } from "@xmtp/xmtp-js";
import React, { useContext} from "react";
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
    <div className="msgs-container flex flex-dir-col">
      <div className="mt-auto">
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
      </div>
    </div>
  );
};

export default MessageList;
