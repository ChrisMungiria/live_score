import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { REACT_APP_API_KEY } from "@env";

export default function App({ navigation }) {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const uniqueLeagues = [...new Set(matches.map((match) => match.league.name))];

  const url = "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": REACT_APP_API_KEY,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

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
      <ScrollView
        horizontal
        persistentScrollbar={false}
        className="gap-3 pl-5 my-2"
      >
        <View className="px-4 py-2 bg-slate-400 mx-2 rounded-3xl">
          <Text className="text-white">All</Text>
        </View>
        {uniqueLeagues.map((league, index) => (
          <View key={index} className="px-4 py-2 bg-slate-200 mx-2 rounded-3xl">
            <Text>{league}</Text>
          </View>
        ))}
      </ScrollView>
      <ScrollView className="flex flex-col">
        <Text className="ml-5 font-bold text-3xl">Live Matches</Text>
        {isLoading ? (
          <Text>Loading ...</Text>
        ) : matches.length > 0 ? (
          matches.map((match, index) => (
            <Pressable
              onPress={() => navigation.navigate("Details", { match: match })}
              key={index}
              className="w-10/12 flex flex-col p-4  rounded-2xl mx-auto mt-5 bg-white shadow-lg"
            >
              <Text className="text-center mb-3 font-bold">
                {match.league.name}
              </Text>
              <View className="flex flex-row">
                <View className="w-1/3 flex items-center justify-center">
                  <Text>{match.teams.home.name}</Text>
                  <Image
                    source={{ uri: match.teams.home.logo }}
                    width={40}
                    height={40}
                  />
                  {match.events.map(
                    (event, index) =>
                      event.type === "Goal" &&
                      event.team.id === match.teams.home.id && (
                        <Text
                          key={index}
                          className="text-end text-xs text-gray-400"
                        >
                          {event.player.name} {event.time.elapsed}'
                        </Text>
                      )
                  )}
                </View>
                <View className="w-1/3 ">
                  <Text className="text-center font-bold text-xl">
                    {match.goals.home} - {match.goals.away}
                  </Text>
                </View>
                <View className="w-1/3 flex items-center justify-center">
                  <Text className="text-end">{match.teams.away.name}</Text>
                  <Image
                    source={{ uri: match.teams.away.logo }}
                    width={40}
                    height={40}
                  />
                  {match.events.map(
                    (event, index) =>
                      event.type === "Goal" &&
                      event.team.id === match.teams.away.id && (
                        <Text
                          key={index}
                          className="text-end text-xs text-gray-400"
                        >
                          {event.player.name} {event.time.elapsed}'
                        </Text>
                      )
                  )}
                </View>
              </View>
            </Pressable>
          ))
        ) : (
          <View className="w-screen h-screen flex items-center justify-center">
            <Text className="text-gray-600">No matches available</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
