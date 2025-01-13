import React, { useState } from "react";
import { z } from "zod";
import bigLogo from "../../../public/images/biglogo.png";
import { Link, router } from "@inertiajs/react";
import Spinner from "../../../public/components/Spinner.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AlertError from "../../../public/components/AlertError.jsx";
import {AlertDestructive} from "../../../public/components/AlertDestructive.jsx";


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

export function SignUpWithGoogle() {
  const handleGoogleLogin = () => {
    const width = 500;
    const height = 500;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const uniqueUrl = `/auth/google/redirect?rand=${Date.now()}`;

    const loginPopup = window.open(
        uniqueUrl, // URL endpoint Laravel untuk login Google
        'Google Login',
        `width=${width},height=${height},top=${top},left=${left}`
    );

    // Monitor jika popup ditutup
    setTimeout(() => {
      const width = 600;
      const height = 600;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;

      const uniqueUrl = `/auth/google/redirect?rand=${Date.now()}`; // Tambahkan query string acak
      console.log(Date.now)
      const loginPopup = window.open(
          uniqueUrl, // URL endpoint untuk login Google
          'Google Login',
          `width=${width},height=${height},top=${top},left=${left}`
      );

      const interval = setInterval(() => {
          if (loginPopup.closed) {
              clearInterval(interval);
              window.location.href = '/dashboard' //  Reload halaman utama setelah popup ditutup
            }
        }, 500);
    }, 1000); 
    // window.location.href = '/auth/google/redirect';
  }

  return (
    <button
          onClick={handleGoogleLogin}
          className=" my-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
            className="h-[18px] w-[18px] "/>
            Continue with Google
    </button>
  )
}

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

  const onSubmit = (data) => {
    setProcessing(true);
    setErrorMessage(null); // Reset pesan error sebelum mencoba login

    // Gunakan Inertia.post untuk mengirim data login
    router.post(
      "/login",data,
      {
        onError: (errors) => {
          // Jika ada error dari server, tangani di sini
          const errorMessage = errors
            ? Object.values(errors).flat().join(", ")
            : "Terjadi Kesalahan Jaringan";
          setErrorMessage(errorMessage);
        },
        onFinish: () => setProcessing(false), // Reset state processing
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 max-w-xs w-96">
        {errorMessage && (
          <AlertDestructive message={errorMessage}/>
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex justify-between items-center">
                <FormLabel>Password</FormLabel>
                <Link href="/forgot-password" className="font-sans text-blue-500">Lupa katasandi ?</Link>
              </div>
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
        <SignUpWithGoogle/>
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
