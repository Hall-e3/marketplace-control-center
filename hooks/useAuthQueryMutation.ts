import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "./useAuth";
import { authService } from "@/services/auth.service";
import { LoginCredentials, RegisterData } from "@/lib/types";

export type AuthOperation = "login" | "register" | "logout";

interface AuthMutationArgs {
  operation: AuthOperation;
  data?: LoginCredentials | RegisterData;
}

export function useAuthQueryMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { getUser, getRole, getToken, authenticate, signOut } = useAuth();

  return useMutation({
    mutationFn: async ({ operation, data }: AuthMutationArgs) => {
      switch (operation) {
        case "login":
          return authService.login(data as LoginCredentials);
        case "register":
          return authService.register(data as RegisterData);
        case "logout":
          return signOut();
        default:
          throw new Error("Invalid operation");
      }
    },
    onSuccess: (data, variables) => {
      if (variables.operation === "login") {
        authService.getCurrentUser().then((user) => {
          getUser(user);
          authenticate(true);
          toast.success("Logged in successfully");
          router.push("/dashboard");
        });

        if (data && "access" in data) {
          getToken(data.access);
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
        }
      } else if (variables.operation === "register") {
        toast.success("Registration successful. Please login.");
        router.push("/auth/login");
      } else if (variables.operation === "logout") {
        // handled in signOut
      }
    },
    onError: (error: any) => {
      console.error(error);
      const message = error.response?.data?.detail || "An error occurred";
      toast.error(message);
    },
  });
}
