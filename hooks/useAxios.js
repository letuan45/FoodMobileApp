//A Cover of followed by youtuber Dave Gray
import { useState, useEffect, useCallback } from "react";
import { getStringData } from "../services/useAsyncStorage";

//Hook này dùng cho method Gọi tự động
const useAxios = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(0);
  // Để chạy lại useEffect bên dưới
  const refetch = useCallback(() => {
    setReload((prev) => prev + 1);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const controller = new AbortController(); // Dùng đến khi cần dừng 1 request

    const fetchData = async () => {
      const token = await getStringData("token");
      //setIsLoading(true);
      try {
        const res = await axiosInstance({
          method: method.toLowerCase(),
          url: url,
          data: requestConfig ? requestConfig.data : null,
          params: requestConfig ? requestConfig.params : null,
          signal: controller.signal,
          headers: {
            access_token: token ? `${token}` : "",
          },
        });

        setResponse(res.data);
        setError(null);
      } catch (err) {
        setError(err.response);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    //Khi conponent unmount câu lệnh sau sẽ chạy
    //và ngăn memory leak
    return () => controller.abort();
    // eslint-disable-next-line
  }, [axiosInstance, method, url, reload]);

  return { response, isLoading, error, refetch };
};

export default useAxios;
