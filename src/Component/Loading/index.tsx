import React from "react";
import { BounceLoader } from "react-spinners";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        background: "white",
        zIndex: "100000000000000000000000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "0",
      }}
    >
      <BounceLoader color="#0aad0a" />
    </div>
  );
};

export default Loading;
