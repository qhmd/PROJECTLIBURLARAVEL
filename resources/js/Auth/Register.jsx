import React, { useState } from "react";
import { router } from '@inertiajs/react';  // Mengimpor Inertia
import axios from "axios";
import Spinner from "../../../public/components/Spinner.jsx";
import MiniSpinner from "../../../public/components/MiniSpinner.jsx";
import { Checkmark } from 'react-checkmark'

import {Link} from "@inertiajs/react";
import bigLogo from "../../../public/images/biglogo.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import debounce from 'lodash.debounce';


import { Button } from "@/components/ui/button";
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const emailValid = true;
// Skema validasi menggunakan Zod

const formSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(4, { message: "Nama harus memiliki setidaknya 4 karakter." })
      .regex(/^[a-zA-Z\s]+$/, { message: "Nama hanya boleh menggunakan huruf." })
      .nonempty("First name is required"),
    lastName: z
      .string()
      .regex(/^[a-zA-Z\s]+$/, { message: "Nama hanya boleh menggunakan huruf." })
      .or(z.literal("")), // Mengizinkan lastName kosong
    username: z
      .string()
      .min(5, { message: "Username minimal 5 karakter." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username hanya boleh menggunakan huruf, angka, atau _.",
      })
      .nonempty("Username is required"),
    email: z
      .string()
      .email({ message: "Format email tidak valid." }),
    password: z
      .string()
      .min(8, { message: "Password harus memiliki minimal 8 karakter." })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: "Password harus memiliki huruf besar, angka, dan karakter khusus.",
      }),
    password_confirmation: z
      .string()
  })
  .refine((data) => data.password !== data.username, {
    message: "Password tidak boleh sama dengan username.",
    path: ["password"],
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password dan konfirmasi password tidak cocok.",
    path: ["password_confirmation"],
  })
  .refine((data) => data.email !== emailValid, {
    message: "Email telah digunakan.",
    path: ["email"],
  });

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

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
            class="h-[18px] w-[18px] "/>
            Continue with Google
    </button>
  )
}

export function ProfileForm() {
  const [processing, setProcessing] = useState(false);

  // Inisialisasi React Hook Form dengan resolver Zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode : 'onChange',
    criteriaMode: "all",
    defaultValues: {
      firstName:"",
      lastName:"",
      username:"",
      email: "",
      password:"",
      password_confirmation:"",
    }},
);

// console.log("Errors:", form.formState.errors);
// console.log("Current data:", form.watch());

const waitForClick = () => {
  return new Promise((resolve) => {
    const handleClick = () => {
      resolve();
    };
    document.getElementById("alertDialog").addEventListener("click", handleClick, {once : true});
  })
}

const handleProsess = async (data) => {
  await waitForClick()
  onSubmit(data)
};

const onSubmit = async (data) => {
  console.log("Form data:", data);
  setProcessing(true);

  try {
    // Kirim data menggunakan axios
    const response = await axios.post("/register", data);
    console.log("Success:", response.data);
  } catch (error) {
      if (error.response) {
        // Cek apakah ada errors di data
        const errorMessage = error.response.data.errors 
            ? Object.values(error.response.data.errors).flat().join(", ")
            : error.response.data.message;
        console.error(errorMessage);
    } else {
        console.error("Terjadi Kesalahan Jaringan");
    }
  } finally {
    setProcessing(false); // Nonaktifkan indikator proses
  }
};

const [loadingField, setLoadingField] = useState(null); // Menyimpan field yang sedang divalidasi
const [checkFieldEmail, setCheckFieldEmail] = useState(false); 
const [checkFieldUsername, setCheckFieldUsername] = useState(false); 

const checkAvailability = debounce(async (field, value) => {
  if(field === 'email') {
    setCheckFieldEmail(false);
  }
  if(field === 'username') {
    setCheckFieldUsername(false);
  }
  if (!value) return

  if (value.length < 5 && field === 'username') {
    form.setError(field, {
      type: 'manual',
      message: `Username minimal 5 karakter.`,
    });
    return;
  }

  if (/\s/.test(value) && field === 'username') {
    form.setError(field, {
      type: 'manual',
      message: `Username tidak boleh mengandung spasi.`,
    });
    return;
  }

  if (/[^a-zA-Z0-9_]/.test(value) && field === 'username') {
    form.setError(field, {
      type: 'manual',
      message: `Username hanya boleh menggunakan huruf, angka, atau _.`,
    });
    return;
  }

  
  if (field === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      form.setError(field, {
        type: 'manual',
        message: 'Format email tidak valid.',
      });
      return;
    }
  }

  setLoadingField(field);

  try {
    const response = await axios.post('/validuseremail', { field, value });
    if (!response.data.available) {
      form.setError(field, {
        type: 'manual',
        message: `${field === 'email' ? 'Email' : 'Username'} telah digunakan.`,
      });
      if (field === 'email') {
          setCheckFieldEmail(false);
        }
      if (field === 'username') {
          setCheckFieldUsername(false);
        }
      } else {
      form.clearErrors(field);

    }
    if (response.data.available && field === 'email') {
      setCheckFieldEmail(true);
    }
    if (response.data.available && field === 'username') {
      setCheckFieldUsername(true);
    }
  } catch (error) {
    console.error("Error validating field:", error);
  } finally {
    setLoadingField(null); // Hapus field dari state loading
  }
}, 300);





  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleProsess)}
       className="space-y-1 max-w-xs w-96">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Nama Depan</FormLabel>
              <FormControl>
                <Input placeholder="Nama Depan" {...field} />
              </FormControl>
              <FormMessage/>
          </FormItem>
          )}
        />
      <hr />
        <FormField
          control={form.control}
          name="lastName" 
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Nama Belakang</FormLabel>
              <FormControl>
                <Input placeholder="Nama Belakang (Optional)" {...field} />
              </FormControl>
              <FormDescription>
                Ini adalah nama yang akan terlihat secara publik.
              </FormDescription>
              <FormMessage/>
          </FormItem>
          )}
        />
        <hr />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="relative w-full flex items-center">
                  <Input
                    className={`${checkFieldUsername ? 'outline outline-green-500 outline-2' : ''}`}
                    placeholder="Masukkan username"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e); // Update form state
                      checkAvailability("username", e.target.value); // Panggil validasi real-time
                    }}
                  />
                  <div className="absolute right-0 px-2">
                    {loadingField === "username" && (
                        <MiniSpinner className="animate-spin" />
                    )}
                    {checkFieldUsername === true && (
                      <Checkmark size='small'/>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage/>
          </FormItem>
          )}
          />
        <hr />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <div className="relative w-full flex items-center justify-center">
                  <Input
                    className={`${checkFieldEmail ? 'outline outline-green-500 outline-2' : ''}`}
                    placeholder="Masukkan Email"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e); // Update form state
                      checkAvailability("email", e.target.value); // Panggil validasi real-time
                    }}
                  />
                  <div className="absolute right-0 px-2">
                    {loadingField === "email" && (
                        <MiniSpinner className="animate-spin" />
                    )}
                    {checkFieldEmail === true && (
                      <Checkmark size='small'/>
                    )}
                  </div>
                </div>
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
                <Input placeholder="Masukkan Password" {...field} />
              </FormControl>
              <FormMessage />
          </FormItem>
          )}
          />
        <hr />
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
          <AlertDialog>
            <AlertDialogTrigger asChild className="flex">
              <button type="submit" className={`rounded-2xl bg-purple-800 text-white items-center justify-center w-full h-14 font-bold !mt-4 ${ processing ? 'cursor-not-allowed' : ''} ${!form.formState.isValid ? 'opacity-50' : ''}`} disabled={!form.formState.isValid}>{processing ?  <Spinner className='animate-spin'/> : "Daftar"}</button>
            </AlertDialogTrigger>
              <AlertDialogContent className='flex justify-center items-center flex-col'>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-center font-bold text-xl'>Data akan dikirim</AlertDialogTitle>
                  <AlertDialogDescription className='text-center'>
                    Pastikan data-data yang kamu isi <br/> sudah benar untuk diverifikasi 
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex font-bold gap-4'>
                  <AlertDialogCancel>Ubah</AlertDialogCancel>
                  <AlertDialogAction id='alertDialog'>Ya, Benar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog>
        <p className="text-gray-500 leading-tight">Dengan mendaftar, saya menyetujui <br />
        Syarat & Ketentuan serta Kebijakan Privasi AmbaShop.</p>
      </form>
    </Form>
  );
}

function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      {/* Bagian Kiri */}
      <div className="p-8 mx-4">
        <img src={bigLogo} draggable="false" onDrag={false} className="w-80 mx-auto" alt="" />
        <h1 className="font-bold text-xl my-4">
          Jual Beli Anda Lebih Mudah di AmbaShop
        </h1>
        <p className="text-gray-500">
          Gabung dan rasakan kemudahaan bertransaksi di AmbaShop
        </p>
      </div>

      {/* Bagian Form */}
      <div className="border px-8 py-4 mx-4 my-4">
        <h1 className="font-bold text-2xl">Daftar Sekarang</h1>
        <p>Sudah punya akun AmbaShop ? <Link href='/login' className="text-blue-800">Masuk</Link></p>
        <SignUpWithGoogle/>
          <div class="flex w-full items-center gap-2 py-2 text-sm text-slate-600">
            <div class="h-px w-full bg-slate-200"></div>
              OR
            <div class="h-px w-full bg-slate-200"></div>
          </div>
        <ProfileForm />
      </div>
    </div>
  );
}

export default Register;