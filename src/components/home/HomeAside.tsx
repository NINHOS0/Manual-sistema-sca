import { section, subsection } from "@/interfaces/contentProps"
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Link, Stack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import {memo, Fragment} from 'react';

interface HomeAsideProps {
  data: section[],
}

const HomeAside = ({ data }: HomeAsideProps) => {
  const { query } = useRouter()

  return (
    <Accordion allowMultiple border={"none"} defaultIndex={[data.filter(e => e.routes !== undefined).findIndex((e) => e.id === query.page![1]) || -1]}>
      <Stack gap={0}>
        {data.map((sec: section) => (
          <Fragment key={sec.id}>
            {sec.routes ? (
              <AccordionItem border={"none"} w={"fit-content"}>
                <AccordionButton _hover={{ bgColor: "transparent" }}>
                  <AccordionIcon />
                  <Box as="span" flex="1" mx={2} textAlign="left" fontWeight={query.page && query.page![1] === sec.id ? "bold" : "normal"}>
                    {sec.name}
                  </Box>
                </AccordionButton>
                <AccordionPanel p={0}>
                  <Stack pl={14} spacing={0}>
                    {sec.routes?.map((sub: subsection) => (
                      <Link key={sub.id} href={`/${query.page![0]}/${sec.id}/${sub.id}`} fontWeight={query.page && query.page![1] === sec.id && query.page![2] === sub.id ? "bold" : "normal"}>{sub.name}</Link>
                    ))}
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            ) : (
              <Link pl={"2.8em"} my={2} href={`/${query.page![0]}/${sec.id}`} fontWeight={query.page && query.page![1] === sec.id ? "bold" : "normal"}>{sec.name}</Link>
            )}
          </Fragment>
        ))}
      </Stack>
    </Accordion>
  )
}

export default memo(HomeAside)