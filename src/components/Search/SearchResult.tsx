import { Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
  result: { name: string; items: any[] }[];
};

const SearchResult = (props: Props) => {
  const { result = [] } = props;
  const navigate = useNavigate();

  if (result.length === 0) return null;

  console.log(result);

  return (
    <Flex direction={"column"} gap={8} mt="4" overflow="auto">
      {result
        .filter((result) => result.items.length > 0)
        .map((result, index) => (
          <Flex
            key={index}
            direction={"column"}
            border={"1px solid black"}
            borderRadius={"5px"}
            padding="1em"
          >
            <Heading
              size="md"
              textTransform={"capitalize"}
              borderBottom={"1px solid black"}
              pb="2"
            >
              {result.name}
            </Heading>
            <Flex
              direction={"column"}
              gap={2}
              mt={4}
              alignItems={"start"}
              pl="4"
            >
              {result.items.slice(0, 3).map((item: any, index: number) => (
                <Text key={index} fontWeight={500}>
                  {item.name || item.title}
                </Text>
              ))}
              <Divider />
              <Button
                onClick={() => navigate(`/category/${result.name}`)}
                colorScheme="blue"
                mt={2}
              >
                View All
              </Button>
            </Flex>
          </Flex>
        ))}
    </Flex>
  );
};

export default SearchResult;
