import React from "react";
import useAxios from "axios-hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import GitHubActivityChart from "../GitHubActivityChart ";
import dayjs from "dayjs";

const GitHubProfile = ({ username, className }) => {
  const [{ data, loading, error }] = useAxios(
    `https://api.github.com/users/${username}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const generateRandomData = () => {
    const today = dayjs();
    return Array.from({ length: 365 }, (_, i) => ({
      date: today.subtract(i, "day").format("YYYY-MM-DD"),
      count: Math.floor(Math.random() * 5),
    }));
  };
  const activityData = generateRandomData();

  return (
        
    <Card className={cn(className, "w-full md:w-80 mx-auto shadow-lg ")} >
      <CardHeader>
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src={data.avatar_url}
          alt={data.login}
          />
        <CardTitle className="text-center mt-2">
          {data.name || data.login}
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          {data.bio || "No bio available"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center">
          Followers: <strong>{data.followers}</strong> | Following:{" "}
          <strong>{data.following}</strong>
        </p>
        <p className="text-center">
          Public Repos: <strong>{data.public_repos}</strong>
        </p>
      </CardContent>
      <CardFooter className="flex justify-center flex-col gap-3">
        <a href={data.html_url} target="_blank" rel="noopener noreferrer">
          <Button
          >
            View Profile
          </Button>
        </a>
        <GitHubActivityChart data={activityData} />
      </CardFooter>
    </Card>
  );
};

export default GitHubProfile;
