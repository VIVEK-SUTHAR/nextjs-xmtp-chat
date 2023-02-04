import { WalletContext } from "@/context/WalletContext";
import { XMTPContext } from "@/context/XmtpContext";
import type { DecodedMessage, Stream } from "@xmtp/xmtp-js";
import { useState, useEffect, useContext } from "react";

const StreamMessages = (peerAddress: string) => {
  const { walletAddress } = useContext(WalletContext);
  const [providerState, setProviderState] = useContext(XMTPContext);
  const { client, allConvoMessages } = providerState;
  const [stream, setStream] = useState<Stream<DecodedMessage>>(null!);
  const [conversation, setConversation] = useState<any>(null);

  useEffect(() => {
    const getActiveChat = async () => {
      if (!client || !peerAddress) {
        return;
      }
      setConversation(await client.conversations.newConversation(peerAddress));
    };
    getActiveChat();
  }, [client, peerAddress]);

  useEffect(() => {
    if (!conversation) return;

    const streamMessages = async () => {
      const newStream = await conversation?.streamMessages();
      setStream(newStream);
      for await (const msg of newStream) {
        if (setProviderState) {
          const newMessages =
            allConvoMessages?.get(conversation?.peerAddress) ?? [];
          newMessages.push(msg);
          const uniqueMessages = [
            ...Array.from(
              new Map(
                newMessages?.map((item: DecodedMessage) => [item["id"], item])
              ).values()
            ),
          ];
          allConvoMessages?.set(conversation.peerAddress, uniqueMessages);
          setProviderState({
            ...providerState,
            convoMessages: new Map(allConvoMessages),
          });
        }
      }
    };

    streamMessages();

    return () => {
      const closeStream = async () => {
        if (!stream) return;
        await stream.return();
      };
      closeStream();
    };
  }, [allConvoMessages, walletAddress, conversation]);
};

export default StreamMessages;
