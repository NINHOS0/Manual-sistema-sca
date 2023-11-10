import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, UseDisclosureProps } from "@chakra-ui/react"
import { HomeAside, HomeCurrentPage } from "@/components/components";
import { section } from "@/interfaces/contentProps"
import { memo } from "react"

interface IHomeAsideMobile {
  controller: UseDisclosureProps
  data: section[]
}

const HomeAsideMobile = ({ controller, data }: IHomeAsideMobile) => {
  return (
    <Drawer
      isOpen={controller.isOpen!}
      onClose={controller.onClose!}
      placement="left"
      size={"xs"}
    >
      <DrawerOverlay />
      <DrawerContent bgColor={"gray.100"} color={"black"} _dark={{ color: "white", bgColor: "gray.900" }}>
        <DrawerHeader>
          <HomeCurrentPage data={data} fontSize={"xs"} />
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody pl={"-2"} mt={2}>
          <HomeAside data={data} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default memo(HomeAsideMobile)