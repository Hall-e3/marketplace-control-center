"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useAuthQueryMutation } from "@/hooks/useAuthQueryMutation";
import { registerSchema } from "@/schemas/auth.schema";
import { RegisterData } from "@/lib/types";

export default function RegisterPage() {
  const { mutate, isPending } = useAuthQueryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterData) => {
    mutate({ operation: "register", data });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-background via-muted/20 to-background p-4">
      <Card className="w-full max-w-md backdrop-blur-sm bg-background/80 border-border/50 shadow-xl">
        <CardHeader className="space-y-1 pb-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <Package className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center tracking-tight">
            Create an account
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Join the Baisoft Marketplace today
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  placeholder="John"
                  {...register("first_name")}
                />
                {errors.first_name && (
                  <p className="text-xs text-destructive">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  placeholder="Doe"
                  {...register("last_name")}
                />
                {errors.last_name && (
                  <p className="text-xs text-destructive">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="re_password">Confirm Password</Label>
                <Input
                  id="re_password"
                  type="password"
                  {...register("re_password")}
                />
                {errors.re_password && (
                  <p className="text-xs text-destructive">
                    {errors.re_password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="business_name">Business Name</Label>
              <Input
                id="business_name"
                placeholder="Acme Inc."
                {...register("business_name")}
              />
              {errors.business_name && (
                <p className="text-xs text-destructive">
                  {errors.business_name.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 mt-8">
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign Up"
              )}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-primary/80 hover:underline"
              >
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
