import React, { useEffect, useRef, useState } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import "react-toastify/dist/ReactToastify.css";
import { StyledToastContainer, Toast } from "./Toast";

const FetchSSE = () => {
  const [realtimeData, setRealtimeData] = useState(null);

  const eventSource = useRef(null);

  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const fetchSSE = () => {
      eventSource.current = new EventSource(
        "http://127.0.0.1:8080/notifications/subscribe/1",
        {
          withCredentials: true,
        }
      );

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

    return () => {
      eventSource.current?.close();
    };
  }, []);

  console.log(realtimeData);
  return <StyledToastContainer />;
};

export default FetchSSE;
