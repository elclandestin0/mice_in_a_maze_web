// src/hooks/useUnity.ts
import { useUnityContext } from "react-unity-webgl";

export const useUnity = () => {
  const { unityProvider, sendMessage, requestFullscreen, isLoaded, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "Build/webgl.loader.js",
    dataUrl: "Build/webgl.data",
    frameworkUrl: "Build/webgl.framework.js",
    codeUrl: "Build/webgl.wasm",
  });

  return { unityProvider, sendMessage, requestFullscreen, isLoaded, addEventListener, removeEventListener };
};

