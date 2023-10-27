import { View, Image, Text, SafeAreaView } from "react-native";
import React from "react";

const DetailsScreen = ({ route, navigation }) => {
  const matches = route.params;
  console.log(matches.match.goals.away);
  return (
    <SafeAreaView className="w-screen h-screen bg-gray-100">
      <Image
        source={{ uri: matches.match.league.logo }}
        className="w-20 h-20 mx-auto mt-5"
      />
      <Text className="w-fit mx-auto mt-5  text-xl font-bold">
        {matches.match.league.name}
      </Text>
      <View className="p-2 mx-auto flex flex-row gap-3">
        <View className="flex-1 flex flex-col items-center">
          <Text className="text-center text-xs">
            {matches.match.teams.home.name}
          </Text>
          <Image src={matches.match.teams.home.logo} className="w-10 h-10" />
        </View>
        <View className="flex-1 flex flex-col items-center justify-center">
          <Text className="text-center font-bold">vs</Text>
        </View>
        <View className="flex-1  flex flex-col items-center">
          <Text className="text-center text-xs">
            {matches.match.teams.away.name}
          </Text>
          <Image src={matches.match.teams.away.logo} className="w-10 h-10" />
        </View>
      </View>
      <View className="p-2 mx-auto flex flex-row gap-3">
        <View className="flex-1 ">
          <Text className="text-center text-2xl font-bold">
            {matches.match.goals.home}
          </Text>
          {matches.match.events.map(
            (event, index) =>
              event.type === "Goal" &&
              event.team.id === matches.match.teams.home.id && (
                <Text
                  key={index}
                  className="text-end text-xs text-gray-400 px-2"
                >
                  {event.player.name} {event.time.elapsed}'
                </Text>
              )
          )}
        </View>
        <View className="flex-1  flex flex-col items-center justify-center">
          <Text className="text-center font-bold border border-red-500">:</Text>
        </View>
        <View className="flex-1">
          <Text className="text-center text-2xl font-bold">
            {matches.match.goals.away}
          </Text>
          {matches.match.events.map(
            (event, index) =>
              event.type === "Goal" &&
              event.team.id === matches.match.teams.away.id && (
                <Text
                  key={index}
                  className="text-end text-xs text-gray-400 px-2"
                >
                  {event.player.name} {event.time.elapsed}'
                </Text>
              )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;
