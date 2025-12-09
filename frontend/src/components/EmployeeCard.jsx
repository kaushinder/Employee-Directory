import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEmployeeStore } from "../store/employee";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeCard = ({ employee }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState(employee);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteEmployee, updateEmployee } = useEmployeeStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleDeleteEmployee = async (e, pid) => {
    e.stopPropagation();
    const { success, message } = await deleteEmployee(pid);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateEmployee = async (pid, updatedEmployee) => {
    const { success, message } = await updateEmployee(pid, updatedEmployee);
    onClose();
    toast({
      title: success ? "Success" : "Error",
      description: success ? "Employee updated successfully" : message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCardClick = () => {
    navigate(`/employee/${employee._id}`);
  };

  return (
    <Box
      as={Box}
      onClick={handleCardClick}
      cursor="pointer"
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      display="flex"
      flexDirection="column"
      h="100%"
    >
      <Image
        src={employee.image}
        alt={employee.name}
        h={{ base: 56, md: 64 }}
        w="full"
        objectFit="cover"
        objectPosition="center"
      />

      <Box p={4} flex="1">
        <Heading as="h3" size="md" mb={1}>
          {employee.name}
        </Heading>

        <Text fontWeight="semibold" fontSize="md" color={textColor}>
          {employee.role}
        </Text>

        <Text fontSize="sm" color={textColor} mt={1}>
          Contact: {employee.contact}
        </Text>

        <HStack spacing={2} mt={4}>
          <IconButton
            icon={<EditIcon />}
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            colorScheme="blue"
            aria-label="Edit employee"
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={(e) => handleDeleteEmployee(e, employee._id)}
            colorScheme="red"
            aria-label="Delete employee"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>Update Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Employee Name"
                name="name"
                value={updatedEmployee.name}
                onChange={(e) =>
                  setUpdatedEmployee({ ...updatedEmployee, name: e.target.value })
                }
              />
              <Input
                placeholder="Role"
                name="role"
                value={updatedEmployee.role}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    role: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Contact"
                name="contact"
                value={updatedEmployee.contact}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    contact: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedEmployee.image}
                onChange={(e) =>
                  setUpdatedEmployee({
                    ...updatedEmployee,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateEmployee(employee._id, updatedEmployee)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default EmployeeCard;
