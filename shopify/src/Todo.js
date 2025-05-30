import {
  Badge,
  Box,
  Button,
  InlineStack,
  Modal,
  Page,
  ResourceItem,
  ResourceList,
  Text,
  TextField,
} from "@shopify/polaris";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import axios from "axios";

function Todo() {
  const API_URL = "http://localhost:5001/test-81497/us-central1/hello/api";
  const [checkList, setCheckList] = useState([]);
  const [listTodo, setListTodo] = useState([]);
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        console.log("Fetched todos:", data);
        setListTodo(data || []);
      } catch (error) {
        setListTodo([]);
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleComplete = async (id) => {
    try {
      const todoToUpdate = listTodo.find((todo) => todo.id === id);
      const updatedTodo = {
        id: todoToUpdate.id,
        title: todoToUpdate.title,
        isComplete: !todoToUpdate.isComplete,
      };

      const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
      setListTodo(
        listTodo.map((todo) => (todo.id === id ? response.data : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setListTodo(listTodo.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleAdd = async () => {
    if (title.trim() !== "") {
      try {
        const newTodo = {
          title: title.trim(),
          isComplete: false,
        };

        const response = await axios.post(API_URL, newTodo);
        setListTodo([...listTodo, response.data]);
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
    setTitle("");
    setActive(false);
  };

  const handleCancel = () => {
    setTitle("");
    setActive(false);
  };

  const showModal = useCallback(() => setActive(true), []);

  const handleClickComplete = async () => {
    if (checkList.length > 0) {
      try {
        const updatePromises = checkList.map(async (id) => {
          const todoToUpdate = listTodo.find((todo) => todo.id === id);
          const updatedTodo = { ...todoToUpdate, isComplete: true };
          return axios.put(`${API_URL}/${id}`, updatedTodo);
        });

        await Promise.all(updatePromises);
        setListTodo(
          listTodo.map((todo) =>
            checkList.includes(todo.id) ? { ...todo, isComplete: true } : todo
          )
        );
        setCheckList([]);
      } catch (error) {
        console.error("Error updating todos:", error);
      }
    }
  };

  const handleClickIncomplete = async () => {
    if (checkList.length > 0) {
      try {
        const updatePromises = checkList.map(async (id) => {
          const todoToUpdate = listTodo.find((todo) => todo.id === id);
          const updatedTodo = { ...todoToUpdate, isComplete: false };
          return axios.put(`${API_URL}/${id}`, updatedTodo);
        });

        await Promise.all(updatePromises);
        setListTodo(
          listTodo.map((todo) =>
            checkList.includes(todo.id) ? { ...todo, isComplete: false } : todo
          )
        );
        setCheckList([]);
      } catch (error) {
        console.error("Error updating todos:", error);
      }
    }
  };

  const handleClickDelete = async () => {
    if (checkList.length > 0) {
      try {
        const deletePromises = checkList.map((id) =>
          axios.delete(`${API_URL}/${id}`)
        );

        await Promise.all(deletePromises);
        setListTodo(listTodo.filter((todo) => !checkList.includes(todo.id)));
        setCheckList([]);
      } catch (error) {
        console.error("Error deleting todos:", error);
      }
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

            <Button size="slim" onClick={() => handleComplete(id)}>
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
