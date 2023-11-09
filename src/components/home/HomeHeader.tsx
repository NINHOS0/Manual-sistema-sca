import { Flex, Grid, GridItem, HStack, IconButton, Image, Input, InputGroup, InputRightAddon, InputRightElement, Link, Tooltip, useColorMode } from "@chakra-ui/react";
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
    <Flex zIndex={10} color={"black"} bgColor={"whiteAlpha.900"} _dark={{ color: "white", bgColor: "blackAlpha.500" }} w={"full"} h={14} alignItems={"center"} justifyContent={"center"}>
      <Grid w={"full"} maxW={"1400px"} templateColumns="repeat(3, 1fr)" templateRows={"40px"} px={{ base: 4, sm: 8, md: 14 }}>
        <GridItem colStart={1} colEnd={3} w={'fit-content'}>
          <Tooltip label={route.query.page![0] === 'en' ? 'Home' : 'Início'}>
            <Link href={`/${lang}/${data[0].id}` || '#'} h={"full"}>
              <Image alt="Trocar tema" src={colorMode === "light" ? LogoBlack.src : LogoWhite.src} h={"full"} />
            </Link>
          </Tooltip>
        </GridItem>
        <GridItem colStart={3} justifySelf={"end"} alignSelf={'center'}>
          <HStack gap={4}>
            <InputGroup>
              <HomeAutocomplete lang={lang} data={data}/>
              <InputRightElement><SearchIcon/></InputRightElement>
            </InputGroup>
            <Tooltip label={route.query.page![0] === 'en' ? 'Change theme' : 'Trocar tema'}>
              {colorMode === "light" ? <SunIcon onClick={toggleColorMode} cursor={'pointer'} /> : <MoonIcon onClick={toggleColorMode} cursor={'pointer'} />}
            </Tooltip>
          </HStack>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default memo(HomeHeader)