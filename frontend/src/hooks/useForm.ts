/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

interface UseFormSubmitOptions {
  onError?: (error: Error) => void;
}

/**
 * Hook to handle form submission.
 *
 * @param schema The zod schema of the form data.
 * @param mutationFn The function to call when the form is submitted.
 * @param options Options for the hook.
 * @param options.onError The function to call when the mutation fails.
 * @returns An object with the following properties:
 * - `register`: A function to register a form field.
 * - `handleSubmit`: A function to handle form submission.
 * - `errors`: The errors of the form.
 * - `isLoading`: Whether the mutation is in progress.
 * - `onSubmit`: A function to call when the form is submitted.
 */
export function useFormSubmit<T extends z.ZodType<any, any>>(
  schema: T,
  mutationFn: (data: z.infer<T>) => Promise<any>,
  options?: UseFormSubmitOptions
) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      navigate('/');
      reset();
    },
    onError: options?.onError,
  });

  return {
    register,
    handleSubmit,
    errors,
    isLoading: mutation.isPending,
    onSubmit: handleSubmit((data) => mutation.mutate(data)),
  };
}