"use client";

import { useForm } from "@/hooks/useForm";
import { loginSchema } from "@/schemas/auth.schema";
import { LoginCredentials } from "@/lib/types";
import { useAuthQueryMutation } from "@/hooks/useAuthQueryMutation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Package, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { mutate, isPending } = useAuthQueryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    schema: loginSchema,
    mode: "onTouched",
  });

  const onSubmit = (data: LoginCredentials) => {
    mutate({ operation: "login", data });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-background via-muted/20 to-background p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md backdrop-blur-sm bg-background/80 border-border/50 shadow-xl scale-100 hover:shadow-2xl transition-all duration-300">
        <CardHeader className="space-y-1 pb-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <Package className="h-8 w-8 text-primary animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Enter your credentials to manage your business
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">
                Email Address
              </Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@business.com"
                  className="bg-muted/30 border-border/50 focus:bg-background transition-all"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-[12px] font-medium text-destructive mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-medium text-primary/80 hover:text-primary transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-muted/30 border-border/50 focus:bg-background transition-all"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-[12px] font-medium text-destructive mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-6 pt-2 pb-8">
            <Button
              className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.01] active:scale-[0.98]"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="font-semibold text-primary/80 hover:text-primary underline-offset-4 hover:underline transition-all"
              >
                Create one now
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
