import { getPreviewMessage } from "@/utils/getPreviewMessage";
import type { Conversation } from "@xmtp/xmtp-js";
import React from "react";
import MessageCard from "./MessageCard";

type AllConversationProps = {
  messages: Conversation[];
  setSelectedChat: React.Dispatch<React.SetStateAction<Conversation>>;
};

function AllConversations({ messages, setSelectedChat }: AllConversationProps) {
  const ConversationInSorted = new Map(
    [...messages.entries()].sort((conversationA, conversationB) => {
      return getPreviewMessage(conversationA[1])?.sent <
        getPreviewMessage(conversationB[1])?.sent
        ? 1
        : -1;
    })
  );

  return (
    <div>
      {Array.from(ConversationInSorted.keys()).map((peerAddress) => {
        if (ConversationInSorted.get(peerAddress)?.length > 0) {
          return (
            <>
              <MessageCard
                key={"Convo_" + peerAddress}
                setSelectedChat={setSelectedChat}
                address={peerAddress}
                latestMessage={getPreviewMessage(
                  ConversationInSorted.get(peerAddress)
                )}
              />
            </>
          );
        } else return <></>;
      })}
    </div>
  );
}

export default AllConversations;
