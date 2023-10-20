import { View, SafeAreaView, TextInput, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import SearchIcon from "react-native-vector-icons/EvilIcons";
import { REACT_APP_API_KEY } from "@env";

export default function App() {
  const url = "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": REACT_APP_API_KEY,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMatches = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      setMatches(JSON.parse(result).response);
      setIsLoading(false);
      console.log(result);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMatches();
    const intervalId = setInterval(getMatches, 15000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <SafeAreaView className="w-screen h-screen bg-gray-100">
      <View className="flex flex-row border border-gray-300 w-8/12 mx-auto p-2 rounded-3xl text-gray-300">
        <SearchIcon name="search" size={30} color="rgb(229 231 235)" />
        <TextInput placeholder="Search..." className=" w-10/12" />
      </View>
      <View className="flex flex-col mt-10">
        <Text className="ml-5 font-bold text-3xl">Live Matches</Text>
        {isLoading ? (
          <Text>Loading ...</Text>
        ) : matches.length > 0 ? (
          matches.map((match, index) => (
            <View
              key={index}
              className="w-10/12 flex flex-row p-4  rounded-2xl mx-auto mt-5 bg-white shadow-lg"
            >
              <View className="w-1/3 ">
                <Text className="text-xs text-center">
                  {match.teams.home.name}
                </Text>
                <Text className="text-right text-xl font-bold mt-3">
                  {match.goals.home}
                </Text>
              </View>
              <View className="w-1/3 ">
                <Text className="text-center">vs</Text>
              </View>
              <View className="w-1/3 ">
                <Text className="text-xs text-center">
                  {match.teams.away.name}
                </Text>
                <Text className="text-left text-xl font-bold mt-3">
                  {match.goals.away}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View className="w-screen h-screen flex items-center justify-center">
            <Text className="text-gray-600">No matches available</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// Designing the UI
// Search bar on top
// List of matches
