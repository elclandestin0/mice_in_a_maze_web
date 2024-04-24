import React from 'react';
import { Button } from '@chakra-ui/react';
import { Unity, useUnityContext } from 'react-unity-webgl';


export function Play() {
    const { unityProvider, requestFullscreen } = useUnityContext({
        loaderUrl: "Build/webgl.loader.js",
        dataUrl: "Build/webgl.data",
        frameworkUrl: "Build/webgl.framework.js",
        codeUrl: "Build/webgl.wasm",
    });

    function handleClickEnterFullscreen() {
        requestFullscreen(true);
    }

    return (
        <>
            <Unity unityProvider={unityProvider} style={{ width: '75%', height: '75%' }} />
            <Button p={5} colorScheme='teal' onClick={handleClickEnterFullscreen}>Enter Fullscreen</Button>
        </>
    );
}