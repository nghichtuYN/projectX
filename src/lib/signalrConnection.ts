import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
} from "@microsoft/signalr";

let connection: HubConnection | null = null;

export const getSignalRConnection = () => {
  if (!connection) {
    connection = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_API_URL_HUB}`, {
        withCredentials: true,
        transport: 1,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    connection.onclose(async (error) => {
      if (error && (error as any).statusCode === 401) {
        console.log("Token hết hạn, làm mới token...");
        // await refreshTokenAndReconnect();
      }
    });
  }

  return connection;
};
