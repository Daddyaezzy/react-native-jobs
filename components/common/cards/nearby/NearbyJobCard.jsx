import { View, Text, TouchableOpacity, Image } from "react-native";
import { imageUrlRegex } from "../../../../utils";
import { Link } from "expo-router";

import styles from "./nearbyjobcard.style";

const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <Link style={styles.container} href={`/home/job-details/${job.job_id}`}>
      <TouchableOpacity>
        <TouchableOpacity style={styles.logoContainer}>
          <Image
            source={{
              uri: imageUrlRegex.test(job.employer_logo)
                ? job.employer_logo
                : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.jobName}>
            {job.job_title}
          </Text>
          <Text style={styles.jobType}>{job.job_employment_type}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default NearbyJobCard;