import React from "react";
import { Button, FormControl, HStack, Input, useToast } from "@chakra-ui/react";

type ComposerProps = {
  msgText: string;
  setMsgTxt: React.Dispatch<React.SetStateAction<string>>;
  sendNewMessage: any;
  errorMessage: string;
};

const Composer = ({
  msgText,
  sendNewMessage,
  setMsgTxt,
  errorMessage,
}: ComposerProps) => {
  const toast = useToast();
  return (
    <HStack>
     
        <Input
          onChange={(e) => {
            e.preventDefault();
            setMsgTxt(e.target.value);
          }}
          placeholder="Write a message"
        value={msgText}
        onKeyUp={e => {
          if (e.key === "Enter") {
            sendNewMessage()
          }
        }}
        />
        <Button
          type="submit"
          className="btn"
          onClick={() => {
            if (errorMessage || !msgText) {
              toast({
                position: "top",
                title: errorMessage ? errorMessage : "Please type something",
                status: "error",
                colorScheme: "red",
                duration: 2000,
              });
              return;
            }

            sendNewMessage();
          }}
        >
          Send
        </Button>
    </HStack>
  );
};

export default Composer;
