import { section, subsection } from "@/interfaces/contentProps"
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Link, Stack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from 'react';


interface HomeAsideProps {
  data: section[],
}

export default function HomeAside({ data }: HomeAsideProps) {
  const { query } = useRouter()

  return (
    <Accordion allowMultiple border={"none"}>
      <Stack gap={0}>
        {data.map((sec: section) => (
          <React.Fragment key={sec.id}>
            {sec.routes ? (
              <AccordionItem border={"none"} w={"fit-content"}>
                <AccordionButton _hover={{ bgColor: "transparent" }}>
                  <AccordionIcon />
                  <Box as="span" flex="1" mx={2} textAlign="left" fontWeight={query.page && query.page![0] === sec.id ? "medium" : "normal"}>
                    {sec.name}
                  </Box>
                </AccordionButton>
                <AccordionPanel p={0}>
                  <Stack pl={14} spacing={0}>
                    {sec.routes?.map((sub: subsection) => (
                      <Link key={sub.id} href={`/${query.page![0]}/${sec.id}/${sub.id.split('_')[0]}`} fontWeight={query.page && query.page![0] === sec.id ? "medium" : "normal"}>{sub.name}</Link>
                    ))}
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            ) : (
              <Link pl={"2.8em"} my={2} href={`/${query.page![0]}/${sec.id}`} fontWeight={query.page && query.page![0] === sec.id ? "medium" : "normal"}>{sec.name}</Link>
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Accordion>
  )
}