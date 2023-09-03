import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_ENV } from "@env";

// const rapidApiKey = RAPID_API_ENV;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const options = {
  //   method: "GET",
  //   url: `https://jsearch.p.rapidapi.com/${endpoint}`,
  //   params: {
  //     ...query,
  //   },
  //   headers: {
  //     "X-RapidAPI-Key": "c260dd9bc4msh0880d926653afdap16a796jsn53e29b83e621",
  //     "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  //   },
  // };

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": "2ec4d9b7ddmsh99fcaf9d91a78e3p1009b6jsnb55856589d6b",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There was an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
