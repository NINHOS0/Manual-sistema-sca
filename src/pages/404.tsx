import { Container, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

export default function Error404() {
  return (
    <Flex bgColor={"gray.100"} _dark={{ color: "white", bgColor: "gray.900" }} h={'100vh'}>
      <Container centerContent justifyContent={'center'}>
        <Heading size={'2xl'}>404</Heading>
        <Heading size={"lg"} mb={4}>Página não encontrada</Heading>
        <Link href={'/pt-br/inicio'}>Ir para página inicial</Link>
      </Container>
    </Flex>
  )
}