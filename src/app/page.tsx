"use client";

import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Container } from "@chakra-ui/react";

export default function Home() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/webgl.loader.js",
    dataUrl: "Build/webgl.data",
    frameworkUrl: "Build/webgl.framework.js",
    codeUrl: "Build/webgl.wasm",
  });

  return (
    <Container maxW="container.xl" centerContent>
      <Unity unityProvider={unityProvider} style={{ width: '100%', height: '100vh' }} />
    </Container>
  );
}