import { Stack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { galleryItem, linkItem, textItem } from "@/interfaces/itensProps";
import { Counter, Thumbnails, Captions, Zoom } from "yet-another-react-lightbox/plugins";
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { HomeMainItem } from "./components";

interface HomeMainContentProps {
  content: (textItem | linkItem | galleryItem)[],
}

type IImage = { src: string, title: string }[]

export default function HomeMainContent({ content }: HomeMainContentProps) {

  const [images, setImages] = useState<IImage>([]);
  useEffect(() => {
    const allImages: IImage = []
    if (content) {
      content.forEach((item) => {
        if (item.type === "gallery") {
          item.images.forEach((e) => {
            allImages.push({ src: `/img/${e.src}`, title: e.alt, })
          })
        }
      })
    }
    setImages(allImages)
  }, [content]);

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<number>(0);
  const captionsRef = useRef<any>(null);
  const zoomRef = useRef<any>(null);

  function getIndex(src: string): number {
    let index = -1;
    images.forEach((ima, i) => {
      if (ima.src === src) {
        return index = i
      }
    })
    return index
  }

  const handleOpenLighbox = (src: string) => {
    setImage(getIndex(src))
    setOpen(true)
  }

  return (
    <Stack textAlign={"justify"} h={{ md: "calc(100vh - 13em)" }} overflowY={{ md: "auto" }} pr={4} pb={16}>
      {content.map((item, i) => (
        <HomeMainItem key={i} item={item} handleOpenLighbox={handleOpenLighbox} />
      ))}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        index={image}
        plugins={[Counter, Thumbnails, Captions, Zoom]}
        counter={{ container: { style: { top: "unset", bottom: -10, left: '50%', transform: 'translateX(-60%)' } } }}
        thumbnails={{ imageFit: 'cover', padding: 0 }}
        captions={{ ref: captionsRef }}
        carousel={{ finite: true }}
        zoom={{
          ref: zoomRef,
          maxZoomPixelRatio: 2,
          wheelZoomDistanceFactor: 1000,
          scrollToZoom: true
        }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: false}}
      />
    </Stack>
  )
}