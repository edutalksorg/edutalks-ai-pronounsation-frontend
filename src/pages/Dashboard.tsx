import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, BookOpen, Brain, Mic } from 'lucide-react';
import { VoiceCalling } from '@/components/dashboard/VoiceCalling';
import { DailyTopics } from '@/components/dashboard/DailyTopics';
import { DailyQuizzes } from '@/components/dashboard/DailyQuizzes';
import { AIPronunciation } from '@/components/dashboard/AIPronunciation';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Learning Dashboard</h1>
        <p className="text-muted-foreground">Track your progress and continue learning</p>
      </div>

      <Tabs defaultValue="voice" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="voice" className="flex items-center gap-2 py-3">
            <Phone className="h-4 w-4" />
            <span>Voice Calls</span>
          </TabsTrigger>
          <TabsTrigger value="topics" className="flex items-center gap-2 py-3">
            <BookOpen className="h-4 w-4" />
            <span>Daily Topics</span>
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex items-center gap-2 py-3">
            <Brain className="h-4 w-4" />
            <span>Quizzes</span>
          </TabsTrigger>
          <TabsTrigger value="pronunciation" className="flex items-center gap-2 py-3">
            <Mic className="h-4 w-4" />
            <span>AI Pronunciation</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="voice">
          <VoiceCalling />
        </TabsContent>

        <TabsContent value="topics">
          <DailyTopics />
        </TabsContent>

        <TabsContent value="quizzes">
          <DailyQuizzes />
        </TabsContent>

        <TabsContent value="pronunciation">
          <AIPronunciation />
        </TabsContent>
      </Tabs>
    </div>
  );
}
