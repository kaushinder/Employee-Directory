import {
  Box,
  Container,
  Heading,
  Image,
  Text,
  useColorModeValue,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const cardBg = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`/api/employee/${id}`);
        const data = await res.json();
        if (data.success) {
          setEmployee(data.data);
        }
      } catch (err) {
        console.error("Error fetching employee", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <Container maxW="container.md" py={12}>
        <Spinner />
      </Container>
    );
  }

  if (!employee) {
    return (
      <Container maxW="container.md" py={12}>
        <Text>Employee not found.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={12}>
      <Box
        bg={cardBg}
        rounded="lg"
        shadow="lg"
        overflow="hidden"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Image
          src={employee.image}
          alt={employee.name}
          w={{ base: "100%", md: "40%" }}
          h={{ base: 64, md: "auto" }}
          objectFit="cover"
          objectPosition="center"
        />
        <VStack align="flex-start" p={6} spacing={3} flex="1">
          <Heading size="lg">{employee.name}</Heading>
          <Text fontWeight="semibold">Role: {employee.role}</Text>
          <Text>Contact: {employee.contact}</Text>
          <Text fontSize="sm" color="gray.500">
            Created: {new Date(employee.createdAt).toLocaleString()}
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default EmployeeDetailPage;
