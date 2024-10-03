import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

type Props = {
  onEditItemClick: (idx: number) => void;
  onDeleteItemClick: (idx: number) => void;
  items: any[];
  columnsSettings: { fieldName: string; title: string }[];
};

const ResultsTable = (props: Props) => {
  const { onEditItemClick, onDeleteItemClick, items, columnsSettings } = props;

  return (
    <TableContainer>
      <Table variant={"simple"}>
        <Thead>
          <Tr>
            {columnsSettings.map((column) => (
              <Th key={column.fieldName}>{column.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {items.map((person, idx) => (
            <Tr
              key={person.name}
              sx={{
                _hover: {
                  background: "rgba(0,0,0,0.1)",
                },
              }}
            >
              {columnsSettings.map((column) => (
                <Th key={column.fieldName}>{person[column.fieldName]}</Th>
              ))}
              <Td>
                <Flex gap={4}>
                  <IconButton
                    onClick={() => onEditItemClick(idx)}
                    aria-label="Edit"
                    title="Edit"
                    icon={<EditIcon />}
                  />
                  <IconButton
                    onClick={() => onDeleteItemClick(idx)}
                    aria-label="Delete"
                    title="Delete"
                    colorScheme="red"
                    icon={<DeleteIcon />}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ResultsTable;
