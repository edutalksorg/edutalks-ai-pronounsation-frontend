import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Wallet, Gift, Copy, DollarSign, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();

  const copyReferralCode = () => {
    navigator.clipboard.writeText(user?.referralCode || '');
    toast({
      title: 'Copied!',
      description: 'Referral code copied to clipboard',
    });
  };

  const requestWithdrawal = () => {
    toast({
      title: 'Withdrawal requested',
      description: 'Your request is pending admin approval',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{user?.name}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
          <Badge className="gradient-hero text-white">
            {user?.subscriptionStatus === 'active' ? 'Premium Member' : 'Free Member'}
          </Badge>
        </div>

        <Tabs defaultValue="referral" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="referral">Referral Rewards</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="progress">Track Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="referral">
            <div className="space-y-6">
              <Card className="gradient-hero text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Gift className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">Invite Friends, Earn Rewards</h3>
                      <p className="text-white/90">
                        Share your referral code and earn cashback when friends subscribe
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Referral Code</CardTitle>
                  <CardDescription>
                    Share this code with friends to earn rewards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-muted rounded-lg p-4">
                      <p className="text-2xl font-mono font-bold text-center">
                        {user?.referralCode}
                      </p>
                    </div>
                    <Button onClick={copyReferralCode} variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Referral Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">12</p>
                      <p className="text-sm text-muted-foreground mt-1">Total Referrals</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold gradient-success bg-clip-text text-transparent">5</p>
                      <p className="text-sm text-muted-foreground mt-1">Active Subscribers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="wallet">
            <div className="space-y-6">
              <Card className="gradient-success text-white">
                <CardContent className="p-8 text-center">
                  <Wallet className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-sm opacity-90 mb-2">Available Balance</p>
                  <p className="text-5xl font-bold mb-6">${user?.walletBalance || 0}</p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      variant="secondary"
                      onClick={requestWithdrawal}
                      className="bg-white text-primary hover:bg-white/90"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Request Withdrawal
                    </Button>
                    <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                      Use for Courses
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { type: 'Referral Reward', amount: '+$25', date: '2 days ago' },
                      { type: 'Referral Reward', amount: '+$25', date: '1 week ago' },
                      { type: 'Course Purchase', amount: '-$50', date: '2 weeks ago' },
                    ].map((transaction, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{transaction.type}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                        <p
                          className={`font-bold ${
                            transaction.amount.startsWith('+')
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {transaction.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Daily Topics Completed</span>
                        <span className="text-sm text-muted-foreground">15/30</span>
                      </div>
                      <Progress value={50} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Quizzes Passed</span>
                        <span className="text-sm text-muted-foreground">8/12</span>
                      </div>
                      <Progress value={67} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Voice Calls</span>
                        <span className="text-sm text-muted-foreground">24 calls</span>
                      </div>
                      <Progress value={80} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Pronunciation Practice</span>
                        <span className="text-sm text-muted-foreground">45 sessions</span>
                      </div>
                      <Progress value={90} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: 'First Call', icon: '🎯', unlocked: true },
                      { name: 'Quiz Master', icon: '🏆', unlocked: true },
                      { name: '7 Day Streak', icon: '🔥', unlocked: true },
                      { name: 'Referral Pro', icon: '💎', unlocked: false },
                      { name: 'Perfect Score', icon: '⭐', unlocked: false },
                      { name: '30 Day Streak', icon: '🚀', unlocked: false },
                    ].map((achievement, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg text-center ${
                          achievement.unlocked
                            ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20'
                            : 'bg-muted opacity-50'
                        }`}
                      >
                        <div className="text-4xl mb-2">{achievement.icon}</div>
                        <p className="text-sm font-medium">{achievement.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
