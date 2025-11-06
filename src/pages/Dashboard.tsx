// src/pages/Dashboard.tsx
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DailyTopics from "@/components/dashboard/DailyTopics";
import DailyQuizzes from "@/components/dashboard/DailyQuizzes";
import AIPronunciation from "@/components/dashboard/AIPronunciation";
import VoiceCalling from "@/components/dashboard/VoiceCalling";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Demo User (admin)</p>
      </div>

      <Tabs defaultValue="topics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="topics">Daily Topics</TabsTrigger>
          <TabsTrigger value="quizzes">Daily Quizzes</TabsTrigger>
          <TabsTrigger value="pronunciation">AI Pronunciation</TabsTrigger>
          <TabsTrigger value="calling">Voice Calling</TabsTrigger>
        </TabsList>

        <TabsContent value="topics"><DailyTopics /></TabsContent>
        <TabsContent value="quizzes"><DailyQuizzes /></TabsContent>
        <TabsContent value="pronunciation"><AIPronunciation /></TabsContent>
        <TabsContent value="calling"><VoiceCalling /></TabsContent>
      </Tabs>
    </div>
  );
}
