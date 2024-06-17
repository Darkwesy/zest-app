import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function LoginScreen() {
  return (
    <main className="items-center justify-center p-4 dark:bg-gray-950">
      <Card className="max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Fazer Login</CardTitle>
          <CardDescription>
            Entre com o seu nome de usuário e senha para acessar o sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              required
              type="text"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              required
              type="password"
            />
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
