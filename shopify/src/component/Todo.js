import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  InlineGrid,
  InlineStack,
  Modal,
  Page,
  ResourceItem,
  ResourceList,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";

function Todo() {
  const [checkList, setCheckList] = useState([]);
  const [listTodo, setListTodo] = useState([
    {
      id: "1",
      title: "quis ut nam facilis et officia qui",
      isComplete: false,
    },
    {
      id: "2",
      title: "fugiat veniam minus",
      isComplete: true,
    },
  ]);
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState("");

  const handleToggle = (id) => {
    setListTodo(
      listTodo.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setListTodo(listTodo.filter((todo) => todo.id !== id));
  };

  const handleAdd = () => {
    if (title.trim() !== "") {
      setListTodo([
        ...listTodo,
        {
          id: Date.now().toString(),
          title,
          isComplete: false,
        },
      ]);
    }
    setTitle("");
    setActive(false);
  };

  const handleCancel = () => {
    setTitle("");
    setActive(false);
  };

  const showModal = useCallback(() => setActive(true), []);

  const handleClickComplete = () => {
    if (checkList.length > 0) {
      setListTodo(
        listTodo.map((todo) =>
          checkList.includes(todo.id) ? { ...todo, isComplete: true } : todo
        )
      );
      setCheckList([]);
    }
  };

  const handleClickIncomplete = () => {
    if (checkList.length > 0) {
      setListTodo(
        listTodo.map((todo) =>
          checkList.includes(todo.id) ? { ...todo, isComplete: false } : todo
        )
      );
      setCheckList([]);
    }
  };
  const handleClickDelete = () => {
    if (checkList.length > 0) {
      setListTodo(listTodo.filter((todo) => !checkList.includes(todo.id)));
      setCheckList([]);
    }
  };
  return (
    <Box background="bg-surface" minHeight="100%">
      <Page
        title="Todoes"
        primaryAction={
          <Button onClick={showModal} variant="primary">
            Create
          </Button>
        }
      >
        <Modal
          open={active}
          title="Create todo"
          primaryAction={{
            content: "Add",
            onAction: handleAdd,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: handleCancel,
            },
          ]}
        >
          <Modal.Section>
            <Box paddingBlockStart="2">
              <TextField
                label="Title"
                value={title}
                onChange={setTitle}
                autoComplete="off"
              />
            </Box>
          </Modal.Section>
        </Modal>

        <ResourceList
          items={listTodo}
          renderItem={renderItem}
          selectedItems={checkList}
          onSelectionChange={setCheckList}
          selectable
        />

        <Box padding="500">
          {listTodo.length > 0 && (
            <InlineStack gap="200" align="center">
              <Button onClick={handleClickComplete}>Complete</Button>
              <Button onClick={handleClickIncomplete}>Incomplete</Button>
              <Button onClick={handleClickDelete}>Delete</Button>
            </InlineStack>
          )}
        </Box>
      </Page>
    </Box>
  );

  function renderItem(item) {
    const { id, title, isComplete } = item;

    return (
      <ResourceItem id={id}>
        <InlineStack align="space-between">
          <Text alignment="start" fontWeight="bold" as="h3">
            {title}
          </Text>

          <Box>
            <Badge tone={isComplete ? "success" : "attention"}>
              {isComplete ? "Complete" : "Incomplete"}
            </Badge>

            <Button size="slim" onClick={() => handleToggle(id)}>
              Complete
            </Button>

            <Button size="slim" onClick={() => handleDelete(id)}>
              Delete
            </Button>
          </Box>
        </InlineStack>
      </ResourceItem>
    );
  }
}

export default Todo;
