import React, { useState } from "react";
import {
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Text,
  Image,
  Heading,
  ScrollView,
  Pressable,
  HStack,
  Input,
  Icon,
  Center,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const theme = extendTheme({
  colors: {
    primary: {
      50: "#f3f4f6",
      100: "#e2e8f0",
      500: "#3b82f6",
      800: "#1e40af",
    },
    accent: {
      500: "#f97316",
    },
  },
});

const bookList = [
  {
    id: "1",
    title: "The Alchemist",
    author: "Paulo Coelho",
    image: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg",
    description: "A journey of self-discovery and following your dreams.",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://images-na.ssl-images-amazon.com/images/I/91%2Bs9t3E2WL.jpg",
    description: "An easy and proven way to build good habits and break bad ones.",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    image: "https://images-na.ssl-images-amazon.com/images/I/41SH-SvWPxL.jpg",
    description: "A dystopian novel set in a totalitarian society.",
  },
  {
    id: "4",
    title: "Becoming",
    author: "Michelle Obama",
    image: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
    description: "A deeply personal memoir by the former First Lady of the United States.",
  },
  {
    id: "5",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
    description: "A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan.",
  },
];

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");

  const filteredBooks = bookList.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Center flex={1} bg="primary.50">
      <HStack px={4} py={3} bg="accent.500" alignItems="center" justifyContent="space-between" w="100%">
        <Heading color="white" size="md">Wattpad</Heading>
        <Icon as={MaterialIcons} name="menu" size="lg" color="white" />
      </HStack>

      <Input
        placeholder="Search books"
        variant="filled"
        width="90%"
        borderRadius="10"
        py="1"
        px="2"
        my="4"
        InputLeftElement={<Icon as={MaterialIcons} name="search" size="sm" ml="2" color="gray.400" />}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />

      <ScrollView flex={1} w="100%">
        {filteredBooks.map((book) => (
          <Pressable key={book.id} onPress={() => navigation.navigate("Details", { book })}>
            <HStack
              bg="primary.100"
              borderRadius="md"
              shadow={2}
              mx={4}
              my={2}
              p={3}
              alignItems="center"
            >
              <Image
                source={{ uri: book.image }}
                alt={book.title}
                size="lg"
                borderRadius="md"
              />
              <VStack ml={4} flex={1} justifyContent="space-between">
                <Heading size="sm" color="primary.900">{book.title}</Heading>
                <Text color="primary.800">{book.author}</Text>
              </VStack>
            </HStack>
          </Pressable>
        ))}
      </ScrollView>
    </Center>
  );
}

function DetailsScreen({ route }) {
  const { book } = route.params;

  return (
    <Center flex={1} bg="primary.50">
      <VStack space={4} alignItems="center" px={4}>
        <Image
          source={{ uri: book.image }}
          alt={book.title}
          size="2xl"
          borderRadius="md"
        />
        <Heading color="primary.900">{book.title}</Heading>
        <Text fontSize="lg" color="primary.700">By {book.author}</Text>
        <Text textAlign="center" px={4}>{book.description}</Text>
      </VStack>
    </Center>
  );
}

export default App;
