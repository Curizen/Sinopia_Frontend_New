import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, UserPlus, Briefcase, User } from 'lucide-react';
import type { UserRole } from '@/lib/utils/constants';

export default function SignUpPage() {
  const { register } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'skill_giver' as UserRole,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(formData.email, formData.password, formData.role, formData.firstName, formData.lastName);
      toast({
        title: 'Account created!',
        description: 'Welcome to Sinopia. Let\'s set up your profile.',
      });
      setLocation('/dashboard');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-xl">S</span>
            </div>
            <CardTitle className="font-display text-2xl">Create Your Account</CardTitle>
            <CardDescription>Join Sinopia and start your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <Label>I want to</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as UserRole }))}
                  className="grid grid-cols-2 gap-4"
                >
                  <Label
                    htmlFor="skill_giver"
                    className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.role === 'skill_giver' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <RadioGroupItem value="skill_giver" id="skill_giver" className="sr-only" />
                    <User className={`w-6 h-6 ${formData.role === 'skill_giver' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-sm font-medium ${formData.role === 'skill_giver' ? 'text-primary' : ''}`}>
                      Find Work
                    </span>
                    <span className="text-xs text-muted-foreground text-center">
                      I'm a professional
                    </span>
                  </Label>
                  <Label
                    htmlFor="skill_searcher"
                    className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.role === 'skill_searcher' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <RadioGroupItem value="skill_searcher" id="skill_searcher" className="sr-only" />
                    <Briefcase className={`w-6 h-6 ${formData.role === 'skill_searcher' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-sm font-medium ${formData.role === 'skill_searcher' ? 'text-primary' : ''}`}>
                      Hire Talent
                    </span>
                    <span className="text-xs text-muted-foreground text-center">
                      I'm a company
                    </span>
                  </Label>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                    data-testid="input-signup-firstname"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                    data-testid="input-signup-lastname"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  data-testid="input-signup-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    data-testid="input-signup-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  At least 8 characters with uppercase, lowercase, and a number
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-signup-submit">
                {isLoading ? 'Creating account...' : 'Create Account'}
                <UserPlus className="ml-2 w-4 h-4" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-primary hover:underline">Terms</Link> and{' '}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </p>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/sign-in" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
