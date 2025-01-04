import React, { useState } from "react";
import { z } from "zod";
import bigLogo from "../../../public/images/biglogo.png";
import { Link, router } from "@inertiajs/react";
import Spinner from "../../../public/components/Spinner.jsx";
import MiniSpinner from "../../../public/components/MiniSpinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AlertError from "../../../public/components/AllertError";
import debounce from 'lodash.debounce';
import axios from "axios";
import { Checkmark } from 'react-checkmark'


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Skema validasi menggunakan Zod
const formSchema = z
  .object({
    email: z.string().email({ message: "Format email tidak valid." }),
  });


export function SendEmail() {
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // Untuk menyimpan pesan error

  // Inisialisasi React Hook Form dengan resolver Zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      email: "",
    },
  });


  const onSubmit = (data) => {
    setProcessing(true);
    setErrorMessage(null); // Reset pesan error sebelum mencoba login

    // Gunakan Inertia.post untuk mengirim data login
    router.post(
      "/forgot-password",data,
      {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 max-w-xs w-96">
        {errorMessage && (
          <AlertError message={errorMessage}/>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <div className="relative w-full flex items-center justify-center">
                  <Input placeholder='Masukkan E-mail' {...field}/>
                </div>
              </FormControl>
              <FormMessage />
          </FormItem>
          )}
        />
        <div>
          <button
            type="submit"
            className={`flex rounded-2xl bg-purple-800 text-white items-center justify-center w-full h-14 font-bold !mt-4 ${
              processing ? "cursor-not-allowed" : ""
            } ${!form.formState.isValid ? "opacity-50" : ""}`}
            disabled={!form.formState.isValid || processing}
          >
            {processing ? <Spinner className="animate-spin" /> : "Kirim"}
          </button>
        </div>
      </form>
    </Form>
  );
}




const ForgotPassword = () => {
  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      {/* Bagian Kiri */}
      <div className="p-8 mx-4">
        <img src={bigLogo} draggable="false" className="w-80 mx-auto" alt="" />
        <h1 className="font-bold text-xl my-4">
          Jual Beli Anda Lebih Mudah di AmbaShop
        </h1>
        <p className="text-gray-500">
          Gabung dan rasakan kemudahaan bertransaksi di AmbaShop
        </p>
      </div>

      {/* Bagian Form */}
      <div className="border px-8 py-4 mx-4 my-4">
        <h1 className="font-bold mb-2">Masukkan E-mail anda</h1>
        <SendEmail/>
      </div>
    </div>
  );
};

export default ForgotPassword;
