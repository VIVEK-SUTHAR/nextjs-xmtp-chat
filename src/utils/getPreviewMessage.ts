import type { Conversation, Conversations } from "@xmtp/xmtp-js";

export const getPreviewMessage = (messages:any) =>
  messages?.length ? messages[messages.length - 1] : null;
