import { useEffect, useState } from "react";

// Equal @mixin media-bp-down(tablet) in main.scss
const useScreenTest = (mediaBreakPoint = "(max-width: 559px)") => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaBpDown = window.matchMedia(mediaBreakPoint);

    function screenTest(MQL: MediaQueryList | MediaQueryListEvent) {
      if (MQL.matches) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    }

    screenTest(mediaBpDown);
    mediaBpDown.addEventListener("change", screenTest);

    return () => mediaBpDown.removeEventListener("change", screenTest);
  }, [mediaBreakPoint]);

  return isSmallScreen;
};

export default useScreenTest;
