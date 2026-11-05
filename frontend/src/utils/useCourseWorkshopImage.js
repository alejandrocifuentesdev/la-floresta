import { useState } from 'react'

export default function useCourseWorkshopImage(src) {
  const [loadedImage, setLoadedImage] = useState(null)
  const orientation = loadedImage && loadedImage.src === src ? loadedImage.orientation : 'horizontal'

  function onLoad(event) {
    const { naturalWidth, naturalHeight } = event.currentTarget
    if (naturalWidth && naturalHeight) {
      setLoadedImage({
        src,
        orientation: naturalHeight > naturalWidth ? 'vertical' : 'horizontal',
      })
    }
  }

  function onError() {
    setLoadedImage(null)
  }

  return { orientation, onLoad, onError }
}
