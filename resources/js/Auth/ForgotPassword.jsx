import React, { useState } from "react";
import { z } from "zod";
import bigLogo from "../../../public/images/biglogo.png";
import { router } from "@inertiajs/react";
import Spinner from "../../../public/components/Spinner.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AlertError from "../../../public/components/AlertError";
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"



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
  InputOTP,
  InputOTPSeparator,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import InputOTPForm from './ConfirmOtp.jsx'
import ChangePassword from './ChangePassword.jsx'

// Skema validasi menggunakan Zod
function SendEmail( {onSuccess} ) {
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // Untuk menyimpan pesan error
  // Inisialisasi React Hook Form dengan resolver Zod
  const formSchemaSendMail = z
  .object({
    email: z.string().email({ message: "Format email tidak valid." }),
  });
  const formSendMail = useForm({
    resolver: zodResolver(formSchemaSendMail),
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
    <Form {...formSendMail}>
      <form onSubmit={formSendMail.handleSubmit(onSubmit)} className="space-y-1 max-w-xs w-96">
        {errorMessage && (
          <AlertError message={errorMessage}/>
        )}
        <FormField
          control={formSendMail.control}
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
            } ${!formSendMail.formState.isValid ? "opacity-50" : ""}`}
            disabled={!formSendMail.formState.isValid || processing}
          >
            {processing ? <Spinner className="animate-spin" /> : "Kirim"}
          </button>
        </div>
      </form>
    </Form>
  );
}


const ForgotPassword = () => {
const [forPage, setForPage] = useState(1);

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
      { forPage == 1 && (
      <div className="border px-8 py-4 mx-4 my-4">
        <h1 className="font-bold mb-2">Masukkan E-mail anda</h1>
        <SendEmail onSuccess={() => setForPage(2)}/>
      </div>
      )}
      { forPage == 2 && (
      <div className="border px-8 py-4 mx-4 my-4">
        <h1 className="font-bold mb-2">Masukkan Otp Anda</h1>
        <p>Silahkan cek pesan di E-mail anda</p>
        <InputOTPForm onSuccess={() => setForPage(3)}/>
      </div>
      )}
      { forPage == 3 && (
      <div className="border px-8 py-4 mx-4 my-4">
        <h1 className="font-bold mb-2">Ganti Password Anda</h1>
        <ChangePassword/>
      </div>
      )}
    </div>
  );
};

export default ForgotPassword;
