import { Box, Flex, Grid, GridItem, HStack, IconButton, Image, Input, InputGroup, InputRightAddon, InputRightElement, Link, Tooltip, useColorMode } from "@chakra-ui/react";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList, Item } from "@choc-ui/chakra-autocomplete";
import LogoBlack from "/public/img/logo-black.png"
import LogoWhite from "/public/img/logo-white.png"
import { section } from "@/interfaces/contentProps";
import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import React, { memo, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import HomeAutocomplete from "./HomeAutocomplete";

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
          <Tooltip label={route.query.page![0] === 'en' ? 'Change theme' : 'Trocar tema'}>
            {colorMode === "light" ? <SunIcon onClick={toggleColorMode} cursor={'pointer'} /> : <MoonIcon onClick={toggleColorMode} cursor={'pointer'} />}
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default memo(HomeHeader)