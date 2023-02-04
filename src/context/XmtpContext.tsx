import { Client } from "@xmtp/xmtp-js";
import { Signer } from "ethers";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { WalletContext } from "./WalletContext";

interface IXMTPContext {
  providerState: IXMTProvideState;
  setProviderState: Dispatch<SetStateAction<IXMTProvideState>>;
}

interface IXMTProvideState {
  client: Client | null;
  initXMTPClient: (Signer: Signer) => void;
  isLoadingConversations: boolean;
  allConversations: Map<string, any>;
  allConvoMessages: Map<string, any>;
}

export const XMTPContext = createContext<IXMTPContext>({} as IXMTPContext);

export default function XMTPContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Signer, walletAddress } = useContext(WalletContext);

  const [providerState, setProviderState] = useState<IXMTProvideState>({
    client: null,
    initXMTPClient: () => {},
    isLoadingConversations: true,
    allConversations: new Map(),
    allConvoMessages: new Map(),
  });

  const initXMTPClient = async (signer: Signer) => {
    if (signer && !providerState.client) {
      try {
        const keys = await Client.getKeys(Signer, { env: "dev" });
        const client = await Client.create(null, {
          env: "dev",
          privateKeyOverride: keys,
        });
        setProviderState({
          ...providerState,
          client,
        });
      } catch (e) {
        console.error(e);
        setProviderState({
          ...providerState,
          client: null,
        });
      }
    }
  };
  const disconnect = () => {
    setProviderState({
      ...providerState,
      client: null,
      allConversations: new Map(),
      allConvoMessages: new Map(),
    });
  };

  useEffect(() => {
    Signer
      ? setProviderState({ ...providerState, initXMTPClient })
      : disconnect();
  }, [Signer]);

  useEffect(() => {
    if (!providerState.client) return;
    const listConversations = async () => {
      setProviderState({ ...providerState, isLoadingConversations: true });
      const { client, allConvoMessages, allConversations } = providerState;
      const allconvos = (await client!.conversations.list()).filter(
        (conversation) => !conversation.context?.conversationId
      );

      Promise.all(
        allconvos.map(
          async (convo: {
            peerAddress: string;
            messages: () => any;
          }): Promise<void> => {
            if (convo.peerAddress !== walletAddress) {
              const messages = await convo.messages();
              allConvoMessages.set(convo.peerAddress, messages);
              allConversations.set(convo.peerAddress, convo);
              setProviderState({
                ...providerState,
                allConvoMessages,
                allConversations,
              });
            }
          }
        )
      ).then(() => {
        setProviderState({ ...providerState, isLoadingConversations: false });
      });
    };
    listConversations();
  }, [providerState.client]);
  return (
    <XMTPContext.Provider value={[providerState, setProviderState]}>
      {children}
    </XMTPContext.Provider>
  );
}
