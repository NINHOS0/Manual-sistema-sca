import { Flex, Grid, GridItem, Image, Link, Tooltip, useColorMode } from "@chakra-ui/react";
import LogoBlack from "/public/img/logo-black.png"
import LogoWhite from "/public/img/logo-white.png"
import { section } from "@/interfaces/contentProps";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { memo } from 'react';
import { useRouter } from 'next/router'

interface HomeHeaderProps {
  data: section[],
  lang: string
}

const HomeHeader = ({ data, lang }: HomeHeaderProps) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { query: {page} } = useRouter()  

  return (
    <Flex color={"black"} bgColor={"whiteAlpha.900"} _dark={{ color: "white", bgColor: "blackAlpha.500" }} w={"full"} h={14} alignItems={"center"} justifyContent={"center"}>
      <Grid w={"full"} maxW={"1400px"} templateColumns="repeat(3, 1fr)" templateRows={"40px"} px={{ base: 4, sm: 8, md: 14 }}>
        <GridItem colStart={1} colEnd={3} w={'fit-content'}>
          <Tooltip label={page![0] === 'en' ? 'Home' : 'Início'}>
            <Link href={`/${lang}/${data[0].id}` || '#'} h={"full"}>
              <Image alt="Trocar tema" src={colorMode === "light" ? LogoBlack.src : LogoWhite.src} h={"full"} />
            </Link>
          </Tooltip>
        </GridItem>
        <GridItem colStart={3} justifySelf={"end"} alignSelf={'center'}>
          <Tooltip label={page![0] === 'en' ? 'Change theme' : 'Trocar tema'}>
            {colorMode === "light" ? <SunIcon onClick={toggleColorMode} cursor={'pointer'} /> : <MoonIcon onClick={toggleColorMode} cursor={'pointer'} />}
          </Tooltip>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default memo(HomeHeader)