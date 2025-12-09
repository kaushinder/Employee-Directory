import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  Input,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEmployeeStore } from "../store/employee";
import EmployeeCard from "../components/EmployeeCard";

const HomePage = () => {
  const { fetchEmployees, employees, totalPages, currentPage } = useEmployeeStore();
  const [searchInput, setSearchInput] = useState("");


  useEffect(() => {
    fetchEmployees(1, "");
  }, [fetchEmployees]);

  const handleSearch = () => {
    fetchEmployees(1, searchInput); 
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      fetchEmployees(currentPage - 1, searchInput);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      fetchEmployees(currentPage + 1, searchInput);
    }
  };

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Employees 🚀
        </Text>

     
        <HStack w="full" maxW="400px">
          <Input
            placeholder="Search by employee name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} colorScheme="blue">
            Search
          </Button>
        </HStack>

        {employees.length > 0 && (
          <HStack spacing={4}>
            <Button onClick={handlePrev} isDisabled={currentPage === 1}>
              Prev
            </Button>
            <Text>
              Page {currentPage} of {totalPages}
            </Text>
            <Button onClick={handleNext} isDisabled={currentPage === totalPages}>
              Next
            </Button>
          </HStack>
        )}

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {employees.map((employee) => (
            <EmployeeCard key={employee._id} employee={employee} />
          ))}
        </SimpleGrid>

        {employees.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No employees found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create an employee
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
