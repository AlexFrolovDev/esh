import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageContent } from "../styled";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { getEntity } from "../api";
import { SwapiContext } from "../context";
import ResultsTable from "../components/Category/ResultsTable/ResultsTable";
import CharacterForm from "../components/Category/CharacterForm/CharacterForm";

const TABLE_COLUMNS = [
  {
    fieldName: "name",
    title: "Name",
  },
  {
    fieldName: "gender",
    title: "Gender",
  },
  {
    fieldName: "birth_year",
    title: "Birth Year",
  },
  {
    fieldName: "height",
    title: "Mass",
  },
  {
    fieldName: "hair_color",
    title: "Hair Color",
  },
  {
    fieldName: "eye_color",
    title: "Eye Color",
  },
];

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { api } = useContext(SwapiContext);
  const [people, setPeople] = useState<any[]>([]);
  const [editingItemIdx, setEditingitemIdx] = useState<number | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const deleteItem = (idx: number) => {
    const newPeople = [...people];
    newPeople.splice(idx, 1);
    setPeople(newPeople);
  };

  const onEditItemClick = (idx: number) => {
    setEditingitemIdx(idx);
    setFormValues(people[idx]);
    toggleForm("edit");
  };

  const validateForm = () => {
    return formValues.name?.length > 0;
  };

  const toggleForm = (mode?: "create" | "edit") => {
    mode && setFormMode(mode || "create");
    mode === "create" && setFormValues({});
    setFormVisible((prev) => !prev);
  };

  const onValueUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSaveClick = () => {
    if (!validateForm()) {
      alert("Name is required");
      return;
    }

    if (formMode === "create") {
      setPeople((prev) => [formValues, ...prev]);
    } else {
      const newPeople = [...people];
      newPeople[editingItemIdx!] = formValues;
      setPeople(newPeople);
    }

    setFormVisible(false);
    setEditingitemIdx(null);
  };

  const onFormCancelClick = () => {
    setFormVisible(false);
    setFormValues({});
  };

  useEffect(() => {
    categoryName &&
      !!api &&
      getEntity(api![categoryName]).then((res) => setPeople(res.items));
  }, [api]);

  if (!api) return null;

  return (
    <PageContent>
      <Flex gap={8} mt={8} mb={8} width={"100%"} alignItems={"baseline"}>
        <Button colorScheme="blue" onClick={() => navigate("/")}>
          Home
        </Button>
        <Flex flex={1} justifyContent={"center"}>
          <Heading textTransform={"capitalize"}>{categoryName}</Heading>
        </Flex>
      </Flex>
      <Box>
        {!formVisible && categoryName === "people" && (
          <Button colorScheme="green" onClick={() => toggleForm("create")}>
            Create
          </Button>
        )}
      </Box>
      {formVisible && categoryName === "people" && (
        <CharacterForm
          formMode={formMode}
          formValues={formValues}
          columnsSettings={TABLE_COLUMNS}
          onValueUpdate={onValueUpdate}
          onFormSaveClick={onFormSaveClick}
          onFormCancelClick={onFormCancelClick}
        />
      )}
      {!formVisible && categoryName === "people" && (
        <ResultsTable
          items={people}
          columnsSettings={TABLE_COLUMNS}
          onEditItemClick={onEditItemClick}
          onDeleteItemClick={deleteItem}
        />
      )}
    </PageContent>
  );
};

export default CategoryPage;
