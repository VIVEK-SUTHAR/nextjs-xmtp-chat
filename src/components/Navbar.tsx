import { WalletContext } from "@/context/WalletContext";
import { XMTPContext } from "@/context/XmtpContext";
import shortenAddress from "@/utils/shortAddress";
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";

function Navbar() {
  const {
    connectWallet,
    Signer,
    walletAddress,
    disConnecetWallet,
  } = useContext(WalletContext);
  const [providerState] = useContext(XMTPContext);
  const { client, allConversations } = providerState;
  return (
    <Box maxW={"container.lg"} margin="0 auto" py={4}>
      <HStack justifyContent={"space-between"} px={[2,4,2]}>
        <Box>
          <Text fontSize={"2xl"}>BlockChat</Text>
        </Box>
        <Box >
          {walletAddress ? (
            <Flex>
              {!client && (
                <Button
                  className="btn"
                  onClick={() => providerState.initXMTPClient(Signer)}
                >
                  Enable XMTP
                </Button>
              )}
              {client && (
                <HStack>
                  <Text>{shortenAddress(walletAddress)}</Text>
                  <Button onClick={() => disConnecetWallet()}>
                    Disconnect
                  </Button>
                </HStack>
              )}
            </Flex>
          ) : (
            <Button variant={"outline"} className="btn" onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}
        </Box>
      </HStack>
    </Box>
  );
}

export default Navbar;
