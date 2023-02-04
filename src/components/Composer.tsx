import React from "react";
import { Button, HStack, Input } from "@chakra-ui/react";

type ComposerProps = {
  msgText: string;
  setMsgTxt: React.Dispatch<React.SetStateAction<string>>;
  sendNewMessage: any;
};

const Composer = ({ msgText, sendNewMessage, setMsgTxt }: ComposerProps) => {
  return (
    <HStack>
      <Input
        onChange={(e) => {
          e.preventDefault();
          setMsgTxt(e.target.value);
        }}
        placeholder="Write a message"
        value={msgText}
      />
      <Button className="btn" onClick={sendNewMessage}>
        Send
      </Button>
    </HStack>
  );
};

export default Composer;
