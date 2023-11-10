import { galleryItem, linkItem, listItem, textItem } from "@/interfaces/itensProps"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { CircularProgress, Flex, Image, Link, ListItem, OrderedList, Stack, Text, UnorderedList, useColorMode } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { memo } from 'react'

interface HomeMainItemProps {
  item: (textItem | linkItem | galleryItem | listItem)
  handleOpenLighbox: (src: string) => void
}

const HomeMainItem = ({ item, handleOpenLighbox }: HomeMainItemProps) => {
  const { colorMode } = useColorMode()
  const { query } = useRouter()

  function replaceSearches(str: string): string {
    if (!query.s) return str

    const search = query.s.toString()
    const index = str.toLowerCase().indexOf(search)
    if (index !== -1) {
      return str.replaceAll(str.slice(index, index + search.length), `<span class='focus' style='background: #ffff00; color: #000'>${str.slice(index, index + search.length)}</span>`).toString()
    } else return str

  }

  return (
    <>
      {
        item.type === "text"
          ? <Text dangerouslySetInnerHTML={{ __html: replaceSearches(item.value) }} fontSize={item.fontSize} fontWeight={item.fontWeight}></Text>
          : item.type === "link"
            ? <Link display={"inline-flex"} alignItems={"center"} gap={"1"} color={"blue.500"} w={'fit-content'} fontSize={item.fontSize} fontWeight={item.fontWeight} href={`${item.url}`}><ExternalLinkIcon boxSize={'3.5'} /><Text dangerouslySetInnerHTML={{ __html: replaceSearches(item.value) }}></Text></Link>
            : item.type === "gallery"
              ? (
                <Flex justifyItems={{ base: 'center', lg: 'baseline' }} gap={2} mt={1} mb={4} px={1}>
                  {item.images.map((img, i) => (
                    <Stack gap={0.5} key={i}>
                      <Text fontSize={'xs'} color={'gray.400'} display={{ base: 'none', sm: 'inherit' }}>{img.alt}</Text>
                      <Image boxShadow={"xl"} _dark={{ boxShadow: 'none' }} cursor={'pointer'} src={`/img/${img.src}`} fallback={colorMode === "dark" ? <CircularProgress isIndeterminate capIsRound trackColor="gray.900" color="gray.100" thickness={6} m={20} /> : <CircularProgress isIndeterminate capIsRound trackColor="gray.100" color="gray.900" thickness={6} m={20} />} onClick={() => handleOpenLighbox(`/img/${img.src}`)} alt={img.alt} w={'full'} maxW={750} maxH={450} borderRadius={"lg"} />
                    </Stack>
                  ))}
                </Flex>
              )
              : item.type === 'list' && (
                <>
                  {item.style === "number" ? (
                    <OrderedList stylePosition={"inside"}>
                      {item.list.map((list, i) => <ListItem dangerouslySetInnerHTML={{ __html: replaceSearches(list.title) }} key={i} textAlign={'start'}></ListItem>)}
                    </OrderedList>
                  ) : (
                    <UnorderedList stylePosition={"inside"}>
                      {item.list.map((list, i) => <ListItem dangerouslySetInnerHTML={{ __html: `<b>${replaceSearches(list.title)}</b> ${list.text ? replaceSearches(list.text) : ''}` }} key={i} textAlign={'start'}></ListItem>)}
                    </UnorderedList>
                  )}
                </>
              )}
    </>
  )
}

export default memo(HomeMainItem)