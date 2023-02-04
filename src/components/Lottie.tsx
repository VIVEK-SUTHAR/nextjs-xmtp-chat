import Lottie from "react-lottie";
import wallet from "../lottie/wallet.json";
import nocomments from "../lottie/nocomments.json";
import { Box } from "@chakra-ui/react";
export default function Loader({ name }: { name: string }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: name === "xmtp" ? nocomments : wallet,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      isClickToPauseDisabled={true}
      style={{ cursor: "default", height: "60%", width: "60%" }}
    />
  );
}
