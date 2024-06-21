import React, { useEffect, useRef, useState } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import "react-toastify/dist/ReactToastify.css";
import { StyledToastContainer, Toast } from "./Toast";
import isLogin from "./isLogin";
import { getCookie } from "../services/cookie";

const FetchSSE = () => {
  const accessToken = getCookie("accessToken");
  const [realtimeData, setRealtimeData] = useState(null);

  const eventSource = useRef(null);
  const EventSource = EventSourcePolyfill || NativeEventSource;

  useEffect(() => {
    if (isLogin()) {
      try {
        const fetchSSE = async () => {
          eventSource.current = new EventSource("http://127.0.0.1:8080/notifications/subscribe/1", {
            headers: {
              "Content-Type": "text/event-stream",
              "Authorization": `Bearer ${accessToken}`,
            },
            withCredentials: true,
          });
          eventSource.current.addEventListener("notification", (e) => {
            const notificationData = JSON.parse(e.data);
            setRealtimeData(notificationData);
            Toast.info(notificationData.message, notificationData.functionCode);
          });

          eventSource.current.onerror = () => {
            eventSource.current?.close();
            setTimeout(fetchSSE, 3000);
          };

          eventSource.current.onopen = (event) => {
            console.log("Connection opened", event);
          };
        };
        fetchSSE();
      } catch (error) {
        throw error;
      }
    }

    return () => {
      eventSource.current?.close();
    };
  }, [isLogin]);

  console.log(realtimeData);
  return <StyledToastContainer />;
};

export default FetchSSE;
