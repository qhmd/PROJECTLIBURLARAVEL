import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";
import bigLogo from "../../../public/images/biglogo.png";
import { Link, usePage } from "@inertiajs/react";
import Spinner from "../../../public/components/Spinner.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
    password: z
      .string()
      .min(8, { message: "Password harus memiliki minimal 8 karakter." })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "Password harus memiliki huruf besar, angka, dan karakter khusus.",
      }),
  });

export function ProfileLogin() {
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // Untuk menyimpan pesan error

  // Inisialisasi React Hook Form dengan resolver Zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setProcessing(true);
    setErrorMessage(null); // Reset pesan error sebelum mencoba login
    try {
      await axios.post("/login", data);
      window.location.href = "/dashboard"; // Redirect ke dashboard
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.errors
          ? Object.values(error.response.data.errors).flat().join(", ")
          : error.response.data.message;
        setErrorMessage(errorMessage); // Tampilkan pesan error
        console.error(errorMessage);
      } else {
        console.log(error)
        setErrorMessage("Terjadi Kesalahan Jaringan");
        console.error("Terjadi Kesalahan Jaringan");
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 max-w-xs w-96">
        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
            {errorMessage}
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan Password" type="password" {...field} />
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
            {processing ? <Spinner className="animate-spin" /> : "Masuk"}
          </button>
        </div>
      </form>
    </Form>
  );
}

const Login = () => {
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
        <h1 className="font-bold text-2xl">Masuk Sekarang</h1>
        <p>
          Belum punya aku Ambashop?{" "}
          <Link href="/register" className="text-blue-800">
            Buat Akun
          </Link>
        </p>
        <div className="flex w-full items-center gap-2 py-2 text-sm text-slate-600">
          <div className="h-px w-full bg-slate-200"></div>
          OR
          <div className="h-px w-full bg-slate-200"></div>
        </div>
        <ProfileLogin />
      </div>
    </div>
  );
};

export default Login;
