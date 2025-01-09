"use client"
import React, {useState} from "react";
import bigLogo from "../../../public/images/biglogo.png";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import AlertError from "../../../public/components/AlertError.jsx";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPSeparator,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { router } from "@inertiajs/react";



const OtpForget = () => {
  const [errorMessage, setErrorMessage] = useState(null); // Untuk menyimpan pesan error
  function InputOTPForm() {
    const FormSchema = z.object({
      otp: z.string().min(6, { 
        message: "Your one-time password must be 6 characters.",
      }),
    })
    const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        otp: "",
      },
    })

    function onSubmit(data) {
      router.post("/input-otp", data, {
        onError: (errors) => {
          const errorMessage = errors
          ? Object.values(errors).flat().join(", ")
          : "Terjadi Kesalahan Jaringan";
        setErrorMessage(errorMessage);
        },
        onFinish : () => {console.log(data)}
      })
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-center">
        {errorMessage && (
            <AlertError message={errorMessage}/>
          )}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem >
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className='mx-auto'> 
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSeparator />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Masukkan kode otp anda yang kami kirim melalui E-mail.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  }
  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      <div className="p-8 mx-4">
        <img src={bigLogo} draggable="false" className="w-80 mx-auto" alt="Logo AmbaShop" />
        <h1 className="font-bold text-xl my-4">
          Jual Beli Anda Lebih Mudah di AmbaShop
        </h1>
        <p className="text-gray-500">
          Gabung dan rasakan kemudahaan bertransaksi di AmbaShop
        </p>
      </div>

      <div className="border px-8 py-4 mx-4 my-4 bg-white rounded shadow-lg">
        <h1 className="font-bold mb-2">Masukkan Kode OTP Anda</h1>
        <InputOTPForm/>
      </div>
    </div>
  );
};

export default OtpForget;
