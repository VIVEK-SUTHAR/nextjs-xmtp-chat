import { XMTPContext } from "@/context/XmtpContext";
import { useContext } from "react";

const SendMessage = (peerAddress: string) => {
  const [providerState] = useContext(XMTPContext);
  const { client } = providerState || {};

  const sendMessage = async (message: string) => {
    if (!client || !peerAddress) {
      return;
    }
    const conversation = await client.conversations.newConversation(
      peerAddress
    );
    if (!conversation) return;
    await conversation.send(message);
  };

  return {
    sendMessage,
  };
};

export default SendMessage;
