import { Center, Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const PageContent = (props: PropsWithChildren) => {
  return (
    <Center w={"80%"} margin={"auto"} overflow="hidden" height="100%">
      <Flex
        direction={"column"}
        alignItems="start"
        overflow="hidden"
        height="100%"
        width="100%"
      >
        {props.children}
      </Flex>
    </Center>
  );
};
