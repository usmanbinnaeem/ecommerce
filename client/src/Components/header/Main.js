import { useState, useCallback } from "react";
import HomePageSlider from "./HomePageSlider";
import images from "./images"

const Main = () => {
    const [autoPlay, setAutoPlay] = useState(3)

    const stopAutoPlay = useCallback(() => {
      setAutoPlay(0)
    }, [])
    return (
        <div>
          <HomePageSlider slides={images} autoPlay={autoPlay} stopAutoPlay={stopAutoPlay}/>   
        </div>
    )
}

export default Main
