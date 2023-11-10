import { section } from "@/interfaces/contentProps"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { memo } from 'react';

interface HomeCurrentPageProps {
  data: section[],
  fontSize?: string
}

const HomeCurrentPage = ({ data, fontSize = 'base' }: HomeCurrentPageProps) => {
  const route = useRouter();
  const { page } = route.query

  return (
    <>
      {route && page![2] ? (
        <Text fontSize={fontSize} color={"blackAlpha.700"} _dark={{ color: "whiteAlpha.700" }}> {data.filter(sec => sec.id === page![1])[0]?.name || page![1]} <ChevronRightIcon /> {data.filter(sec => sec.id === page![1])[0]?.routes?.filter(sub => sub.id === page![2])[0]?.name || page![2]} </Text>
      ) : (
        <Text fontSize={fontSize} color={"blackAlpha.700"} _dark={{ color: "whiteAlpha.700" }}> {data.filter(sec => sec.id === page![1])[0]?.name || page![1]} </Text>
      )}
    </>
  )
}

export default memo(HomeCurrentPage)