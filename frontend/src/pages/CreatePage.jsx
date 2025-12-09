import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEmployeeStore } from "../store/employee";

const CreatePage = () => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    contact: "",
    image: "",
  });
  const toast = useToast();
  const { createEmployee } = useEmployeeStore();

  const handleAddEmployee = async () => {
    const { success, message } = await createEmployee(newEmployee);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      isClosable: true,
    });

    if (success) {
      setNewEmployee({ name: "", role: "", contact: "", image: "" });
    }
  };

  return (
    <Container maxW={"container.sm"} py={8}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={4}>
          Create New Employee
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Employee Name"
              name="name"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
            />
            <Input
              placeholder="Role (e.g. Backend Developer)"
              name="role"
              value={newEmployee.role}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, role: e.target.value })
              }
            />
            <Input
              placeholder="Contact (phone or email)"
              name="contact"
              value={newEmployee.contact}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, contact: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newEmployee.image}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, image: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddEmployee} w="full">
              Add Employee
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
