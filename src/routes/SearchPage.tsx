import { useCallback, useContext, useEffect, useState } from "react";
import { SwapiContext } from "../context";
import { Center, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { getEntity } from "../api";
import { useNavigate } from "react-router-dom";
import SearchResult from "../components/Search/SearchResult";
import { PageContent } from "../styled";

const debounce = (fn: Function, delay = 1000) => {
  let timerId: number;

  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
};

const SearchPage = () => {
  const navigate = useNavigate();
  const { api } = useContext(SwapiContext);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ name: string; items: any[] }[]>([]);

  const search = useCallback(
    debounce((query: string) => {
      setResults([]);

      if (!query) {
        return;
      }

      setSearching(true);

      const requests = Object.entries(api!).map(([name, value]) => {
        return getEntity(`${value}?search=${query}`, name);
      });

      Promise.all(requests).then((responses: any[]) => {
        setSearching(false);
        setResults(responses);
      });
    }),
    []
  );

  useEffect(() => {
    if (!api) navigate("/");
  }, []);

  useEffect(() => {
    search(query);
  }, [query]);

  return (
    <PageContent>
      <Flex gap={4} alignItems={"end"} mt="3em">
        <Text as="b" fontSize={"1.2em"}>
          Search:{" "}
        </Text>
        <Input
          value={query}
          onChange={(evt: any) => setQuery(evt.target.value)}
        />
      </Flex>
      <SearchResult result={results} />
      {searching && (
        <Center>
          <Heading size="lg">Searching...</Heading>
        </Center>
      )}
    </PageContent>
  );
};

export default SearchPage;
