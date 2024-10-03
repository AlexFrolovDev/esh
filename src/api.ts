export const getRoot = async (): Promise<{ [key: string]: string }> => {
  const response = await fetch("https://swapi.dev/api/");

  const result = response.json();

  return result;
};
export const getEntity = async (url: string, name?: string) => {
  const response = await fetch(url);

  const items = await response.json();

  const result: {
    items: any[];
    name?: string;
  } = {
    items: items.results,
  };

  if (name) {
    result.name = name;
  }

  return result;
};
