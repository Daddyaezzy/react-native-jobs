import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";

import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  Company,
  JobFooter,
  JobAbout,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../../../components";
import { COLORS, icons, SIZES } from "../../../../constants";
import useFetch from "../../../../hook/useFetch";
import * as Sharing from "expo-sharing";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const share = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync("data[0]?.job_google_link");
      } else {
        console.log("Sharing is not available on this device.");
      }
    } catch (error) {
      console.error("Error sharing: ", error);
    }
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "About":
        return (
          <JobAbout
            title="About the job:"
            info={data[0].job_description ?? ["N/A"]}
          />
        );
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );

      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              handlePress={share}
              dimension="60%"
            />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something Went Wrong</Text>
          ) : data.length === 0 ? (
            <Text>No Text Data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;

// import { View, Text } from "react-native";
// import React from "react";

// const Testing = () => {
//   return (
//     <View>
//       <Text>Testing</Text>
//     </View>
//   );
// };

// export default Testing;
