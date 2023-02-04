import { WalletContext } from "@/context/WalletContext";
import { XMTPContext } from "@/context/XmtpContext";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
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
  console.log(allConversations);

  return (
    <Box maxW={"container.lg"} margin="0 auto" py={4}>
      <HStack justifyContent={"space-between"}>
        <Box>
          <Text fontSize={"2xl"}>BlockChat</Text>
        </Box>
        <Box>
          {walletAddress ? (
            <div className="flex align-center header-mobile">
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
                  <Text>{walletAddress}</Text>
                  <Button onClick={() => disConnecetWallet()}>
                    Disconnect
                  </Button>
                </HStack>
              )}
            </div>
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
