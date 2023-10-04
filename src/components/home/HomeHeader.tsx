import { Flex, Grid, GridItem, IconButton, Image, Link, Tooltip, useColorMode } from "@chakra-ui/react";
import LogoBlack from "/public/img/logo-black.png"
import LogoWhite from "/public/img/logo-white.png"
import { section } from "@/interfaces/contentProps";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface HomeHeaderProps {
  data: section[],
}

export default function HomeHeader({ data }: HomeHeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex color={"black"} bgColor={"whiteAlpha.900"} _dark={{ color: "white", bgColor: "blackAlpha.500" }} w={"full"} h={14} alignItems={"center"} justifyContent={"center"}>
      <Grid w={"full"} maxW={"1400px"} templateColumns="repeat(3, 1fr)" templateRows={"40px"} px={{base: 4, sm: 8, md: 14}}>
        <GridItem colStart={1} colEnd={3}>
          <Tooltip label="Início">
            <Link href={`${data[0].id}`} h={"full"}>
              <Image alt="Trocar tema" src={colorMode === "light" ? LogoBlack.src : LogoWhite.src} h={"full"} />
            </Link>
          </Tooltip>
        </GridItem>
        <GridItem colStart={3} justifySelf={"end"}>
          <Tooltip label="Alterar tema">
            <IconButton onClick={toggleColorMode} variant={"unstyled"} minW={"fit-content"} minH={"fit-content"} aria-label="Tema" icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />} />
          </Tooltip>
        </GridItem>
      </Grid>
    </Flex>
  );
}
