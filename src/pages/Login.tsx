import { useState } from 'react';
<<<<<<< HEAD
import { useNavigate, Link } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> 75787e558a22d02d86ba092c5fe844950f261d8d
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
<<<<<<< HEAD
=======

>>>>>>> 75787e558a22d02d86ba092c5fe844950f261d8d
    try {
      await login(email, password);
      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
<<<<<<< HEAD

=======
      
>>>>>>> 75787e558a22d02d86ba092c5fe844950f261d8d
      const storedUser = localStorage.getItem('edulearn_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role === 'superadmin') {
          navigate('/superadmin');
        } else if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
<<<<<<< HEAD
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
=======
      }
    } catch (error) {
>>>>>>> 75787e558a22d02d86ba092c5fe844950f261d8d
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Invalid credentials',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  // Google sign-in handler: redirect to backend OAuth entrypoint.
  // Ensure your backend exposes an OAuth route (example: /api/v1/auth/google)
  const handleGoogleSignIn = () => {
    const base = (import.meta.env.VITE_API_BASE_URL as string) || '';
    // change path if backend uses a different route for Google OAuth
    const googleUrl = `${base.replace(/\/$/, '')}/api/v1/auth/google`;
    // open in same window so backend can redirect back to front-end callback
    window.location.href = googleUrl;
  };

=======
>>>>>>> 75787e558a22d02d86ba092c5fe844950f261d8d
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 gradient-hero rounded-lg flex items-center justify-center mb-4">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue your learning journey</CardDescription>
        </CardHeader>
<<<<<<< HEAD

=======
>>>>>>> 75787e558a22d02d86ba092c5fe844950f261d8d
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
<<<<<<< HEAD

=======
>>>>>>> 75787e558a22d02d86ba092c5fe844950f261d8d
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
<<<<<<< HEAD

            {/* Primary sign-in */}
=======
>>>>>>> 75787e558a22d02d86ba092c5fe844950f261d8d
            <Button type="submit" className="w-full gradient-hero" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

<<<<<<< HEAD
          {/* Divider */}
          <div className="my-3 flex items-center gap-3">
            <hr className="flex-1 border-t border-gray-200" />
            <span className="text-xs text-muted-foreground">or</span>
            <hr className="flex-1 border-t border-gray-200" />
          </div>

          {/* Google sign-in button (white with Google icon) */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="w-5 h-5"
                aria-hidden
              />
              <span className="font-medium">Sign in with Google</span>
            </button>
          </div>

          {/* Create account as colorful button matching sign-in */}
          <div className="mt-4">
            <Link to="/register" className="block text-center w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-teal-400 hover:opacity-95 transition">
              Create Account
            </Link>
=======
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p className="mb-2">Demo Credentials:</p>
            <p>Super Admin: superadmin@edulearndevelop.com / Super@123</p>
            <p>Admin: admin@edulearndevelop.com / Admin@123</p>
            <p>User: user@edulearndevelop.com / User@123</p>
>>>>>>> 75787e558a22d02d86ba092c5fe844950f261d8d
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
