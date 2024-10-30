import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

async function getter() {
  throw new Error("gaand mar gayi bc");
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/");
  const response = await data.json();
  return response;
}

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>hiii</div>
      <Posts />
    </QueryClientProvider>
  );
}

function Posts() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["getjson"],
    queryFn: getter,
  });

  if (error) {
    return <div>erorr in fetching bro</div>;
  }

  if (isLoading) {
    return <div>loading....</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}

export default App;
