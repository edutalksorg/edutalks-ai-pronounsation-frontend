import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Trophy, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const DUMMY_QUIZZES = [
  { id: 1, title: 'Grammar Fundamentals', questions: 10, difficulty: 'Easy',   completed: true,  score: 80 },
  { id: 2, title: 'Vocabulary Builder',    questions: 15, difficulty: 'Medium', completed: false, score: null },
  { id: 3, title: 'Idioms and Phrases',    questions: 12, difficulty: 'Hard',   completed: false, score: null },
];

function diffColor(d: string) {
  if (d === 'Easy') return 'bg-green-100 text-green-800';
  if (d === 'Medium') return 'bg-yellow-100 text-yellow-800';
  if (d === 'Hard') return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-800';
}

export default function DailyQuizzes() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5" />Daily Quizzes</CardTitle>
          <CardDescription>Test your knowledge and track your progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {DUMMY_QUIZZES.map((q) => (
              <Card key={q.id} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold">{q.title}</h3>
                        {q.completed && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" /> Completed
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="outline">{q.questions} questions</Badge>
                        <Badge className={diffColor(q.difficulty)}>{q.difficulty}</Badge>
                      </div>
                      {q.completed && q.score !== null && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Your Score</span>
                            <span className="font-semibold">{q.score}%</span>
                          </div>
                          <Progress value={q.score} className="h-2" />
                        </div>
                      )}
                    </div>
                    <Button variant={q.completed ? 'outline' : 'default'} className={!q.completed ? 'gradient-hero' : ''}>
                      {q.completed ? 'Retake' : 'Start Quiz'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="gradient-success text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">Keep it up!</h3>
              <p className="text-white/90">Complete all quizzes to unlock bonus rewards</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
