import { Box, Flex, Image, InputGroup, InputRightElement, Link, Tooltip, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import { LogoWhite, LogoBlack } from "@/exports/logo"
import { section } from "@/interfaces/contentProps";
import { useRouter } from 'next/router'
import React, { memo } from 'react';
import { HomeAutocomplete } from "./components";

interface HomeHeaderProps {
  data: section[],
  lang: string
}

const HomeHeader = ({ data, lang }: HomeHeaderProps) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const route = useRouter()

  return (
    <Flex zIndex={10} color={"black"} bgColor={"whiteAlpha.900"} _dark={{ color: "white", bgColor: "blackAlpha.500" }} w={"full"} h={14} alignItems={"center"} justifyContent={"center"} p={1}>
      <Flex justifyContent={'space-between'} w={"full"} maxW={"1400px"} gap={4} px={{ base: 4, sm: 8, md: 14 }}>
        <Box alignSelf={'center'}>
          <Tooltip label={route.query.page![0] === 'en' ? 'Home' : 'Início'}>
            <Link href={`/${lang}/${data[0].id}` || '#'}>
              <Image alt="Trocar tema" src={colorMode === "light" ? LogoBlack.src : LogoWhite.src} h={"40px"} />
            </Link>
          </Tooltip>
        </Box>
        <Flex justifyContent={'end'} alignItems={'center'} gap={4} ml={'auto'} flex={1}>
          <InputGroup w={'full'} maxW={'96'}>
            <HomeAutocomplete lang={lang} data={data} />
            <InputRightElement><SearchIcon /></InputRightElement>
          </InputGroup>
          <Tooltip label={route.query.page![0] === 'en' ? 'Change theme' : 'Mudar tema'}>
            {colorMode === "light" ? <SunIcon onClick={toggleColorMode} cursor={'pointer'} /> : <MoonIcon onClick={toggleColorMode} cursor={'pointer'} />}
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default memo(HomeHeader)