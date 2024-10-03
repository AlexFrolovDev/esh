import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

type Props = {
  columnsSettings: { fieldName: string; title: string }[];
  formMode: string;
  formValues: { [key: string]: string };
  onValueUpdate: any;
  onFormSaveClick: any;
  onFormCancelClick: any;
};

const CharacterForm = (props: Props) => {
  const {
    columnsSettings,
    formMode,
    formValues,
    onValueUpdate,
    onFormCancelClick,
    onFormSaveClick,
  } = props;

  return (
    <Box border="1px solid grey" borderRadius="5px" p="8" pt={0} mt={8}>
      <Center>
        <Heading size="md" mb={4} mt={4}>
          {formMode === "create" ? "New" : "Editing"} Person
        </Heading>
      </Center>
      <Flex direction={"column"} gap={4} alignItems={"start"}>
        {columnsSettings.map((column, idx) => (
          <Box key={column.fieldName}>
            <FormLabel htmlFor={column.fieldName}>
              {column.title}
              {column.fieldName === "name" && (
                <Text as="span" color="red">
                  &nbsp; *
                </Text>
              )}
            </FormLabel>
            <Input
              autoFocus={idx === 0}
              type="text"
              name={column.fieldName}
              id={column.fieldName}
              value={formValues[column.fieldName || ""]}
              onChange={onValueUpdate}
            />
          </Box>
        ))}
        <Divider />
        <Flex gap={8} mt={8}>
          <Button colorScheme="green" onClick={onFormSaveClick}>
            Save
          </Button>
          <Button colorScheme="red" onClick={onFormCancelClick}>
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CharacterForm;
