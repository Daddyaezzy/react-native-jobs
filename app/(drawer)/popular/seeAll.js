import {
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from "react-native";

import { Stack, useRouter } from "expo-router";
import { useState } from "react";

import styles from "../../../styles/search";
import { COLORS, icons, SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import NearbyJobCard from "../../../components/common/cards/nearby/NearbyJobCard";
import { ScreenHeaderBtn } from "../../../components";
import { Drawer } from "expo-router/drawer";

const seeAll = () => {
  const { data, isLoading, error } = useFetch("search", {
    query: "Developer",
    num_pages: 1,
  });
  const router = useRouter();

  const handleNavigate = (item) => {
    router.push(`/job-details/${item.job_id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Drawer.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <View>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <NearbyJobCard
                job={item}
                handleNavigate={() =>
                  router.push(`/home/job-details/${item.job_id}`)
                }
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{
              padding: SIZES.medium,
              rowGap: SIZES.medium,
            }}
            ListHeaderComponent={() => (
              <>
                <View style={styles.container}>
                  <Text style={styles.searchTitle}>All Popular Jobs</Text>
                  <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
                </View>
                <View style={styles.loaderContainer}>
                  {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                  ) : (
                    error && <Text>Oops something went wrong</Text>
                  )}
                </View>
              </>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default seeAll;
