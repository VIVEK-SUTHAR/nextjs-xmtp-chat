import { WalletContext } from "@/context/WalletContext";
import { XMTPContext } from "@/context/XmtpContext";
import SendMessage from "@/utils/sendMessage";
import { Box, Button, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import AddressInput from "./AddressInput";
import AllConversations from "./AllConversations";
import MessageList from "./AllMessageList";
import Composer from "./Composer";
import Loader from "./Lottie";
import Navbar from "./Navbar";

function Home() {
  const { walletAddress } = useContext(WalletContext);
  const [providerState] = useContext(XMTPContext);
  const { allConvoMessages, client, isLoadingConversations } = providerState;
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [isNewMessage, setIsNewMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [messageText, setMessageText] = useState("");
  const { sendMessage } = SendMessage(selectedChat);
  const resetAll = () => {
    setSelectedChat(null);
    setIsNewMessage(false);
    setErrorMessage("");
    setMessageText("");
  };

  const onInputBlur = async (newAddress: string) => {
    const canMessage = async (address: string) => {
      return (await client?.canMessage(address)) || false;
    };
    if (!newAddress?.startsWith("0x") || newAddress?.length !== 42) {
      setErrorMessage("Invalid address");
    } else {
      const isOnNetwork = await canMessage(newAddress);
      if (!isOnNetwork) {
        setErrorMessage("Address not on XMTP network");
      } else {
        setSelectedChat(newAddress);
        setErrorMessage("");
      }
    }
  };

  const sendNewMessage = () => {
    console.log("s");
    
    sendMessage(messageText);
    setMessageText("");
  };

  return (
    <Box maxW={"container.lg"} margin={"0 auto"}>
      <Navbar />
      {!walletAddress && (
        <Box
          justifyContent={"center"}
          alignItems="center"
          height={"container.sm"}
        >
          <Loader name="wallet" />
          <br />
          <Text fontSize={"3xl"} textAlign="center">
            Connect Your Wallet to continue
          </Text>
        </Box>
      )}
      {walletAddress && !client && (
        <Box
          justifyContent={"center"}
          alignItems="center"
          height={"container.sm"}
        >
          <Loader name="xmtp" />
          <br />
          <Text fontSize={"3xl"} textAlign="center">
            Enable XMTP To Continue
          </Text>
        </Box>
      )}
      {client && (
        <Box maxW={"container.md"} margin={"0 auto"}>
          {!selectedChat && !isNewMessage ? (
            <>
              <HStack justifyContent={"space-between"} my={4}>
                <Text>All Conversations</Text>
                <Button
                  variant={"ghost"}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsNewMessage(true);
                  }}
                >
                  + New Chat
                </Button>
              </HStack>
              {client && isLoadingConversations && (
                <VStack justifyContent={"center"}>
                  <Text fontSize={"2xl"}>Loading All Conversations</Text>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="white"
                    color="green.500"
                    size="xl"
                  />
                </VStack>
              )}
              <AllConversations
                messages={allConvoMessages}
                setSelectedChat={setSelectedChat}
              />
            </>
          ) : (
            <>
              <Button onClick={resetAll}>Back</Button>
              <Box maxW={"container.md"} margin={"0 auto"}>
                <AddressInput
                  isNewMessage={isNewMessage}
                  onInputBlur={onInputBlur}
                  errorMessage={errorMessage}
                  selectedChat={selectedChat}
                />
              </Box>
              <Box
                maxH={"xl"}
                borderColor="gray.900"
                borderWidth={1}
                overflowY={"scroll"}
                padding={4}
              >
                <MessageList
                  convoMessages={allConvoMessages.get(selectedChat) ?? []}
                  isNewMsg={isNewMessage}
                  selectedConvo={selectedChat}
                />
              </Box>
              <Composer
                msgText={messageText}
                sendNewMessage={sendNewMessage}
                setMsgTxt={setMessageText}
              />
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

export default Home;
