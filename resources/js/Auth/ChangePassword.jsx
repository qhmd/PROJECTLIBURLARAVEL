import React, { useState } from "react";
import { z } from "zod";
import { router } from "@inertiajs/react";
import Spinner from "../../../public/components/Spinner.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AlertError from "../../../public/components/AlertError";
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function changePassword ()  {
    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null); // Untuk menyimpan pesan error
    // Inisialisasi React Hook Form dengan resolver Zod
    const formSchemaPw = z
    .object({
        password: z
        .string()
        .min(8, { message: "Password harus memiliki minimal 8 karakter." })
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
          message: "Password harus memiliki huruf besar, angka, dan karakter khusus.",
        }),
      password_confirmation: z
        .string()
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Password dan konfirmasi password tidak cocok.",
        path: ["password_confirmation"],
      });

    const form = useForm({
      resolver: zodResolver(formSchemaPw),
      mode: "onChange",
      criteriaMode: "all",
      defaultValues: {
        password: "",
        password_confirmation: "",
      },
    });
  
    const onSubmit = (data) => {
      setProcessing(true);
      setErrorMessage(null); // Reset pesan error sebelum mencoba login
      
      // Gunakan Inertia.post untuk mengirim data login
      router.post(
        "/reset-password",data,
        {
          onSuccess: () => {
            onSuccess()
          },
          onError: (errors) => {
            // Jika ada error dari server, tangani di sini
            const errorMessage = errors
              ? Object.values(errors).flat().join(", ")
              : "Terjadi Kesalahan Jaringan";
            setErrorMessage(errorMessage);
          },
          onFinish: () => {
            setProcessing(false)
          }, // Reset state processing
        }
      );
    };
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
         className="space-y-1 max-w-xs w-96">
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan Password" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Konfirmasi Password</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan Password" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
          />
          <button
            type="submit"
            className={`flex rounded-2xl bg-purple-800 text-white items-center justify-center w-full h-14 font-bold !mt-4 ${
              processing ? "cursor-not-allowed" : ""
            } ${!form.formState.isValid ? "opacity-50" : ""}`}
            disabled={!form.formState.isValid || processing}
          >
            {processing ? <Spinner className="animate-spin" /> : "Masuk"}
          </button>
        </form>
      </Form>    
    )
  }