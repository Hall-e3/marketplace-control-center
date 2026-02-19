"use client";

import {
  useForm as useHookForm,
  UseFormProps,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

interface UseFormOptions<T extends FieldValues> extends UseFormProps<T> {
  schema?: ZodSchema<T>;
}

export function useForm<T extends FieldValues>({
  schema,
  ...props
}: UseFormOptions<T>) {
  return useHookForm<T>({
    ...props,
    resolver: schema ? zodResolver(schema) : undefined,
  });
}
