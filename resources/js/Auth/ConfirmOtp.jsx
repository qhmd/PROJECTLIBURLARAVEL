import React, { useState } from "react";
import { z } from "zod";
import { router, usePage } from "@inertiajs/react";
import Spinner from "../../../public/components/Spinner.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {AlertDestructive} from "../../../public/components/AlertDestructive.jsx";
import { AlertSuccess } from "../../../public/components/AlertSuccess.jsx";
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


export default function InputOTPForm({onSuccess}) {
  const {props} = usePage()
  const {success, sendEmail} = props;
  console.log(props)
  console.log(success)
  console.log(sendEmail)
  const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null); // Untuk menyimpan pesan error
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
    
      const sendAgainOTP = () => {
        setProcessing(true);
        setErrorMessage(null); // Reset pesan error sebelum mencoba login
        
        // Gunakan Inertia.post untuk mengirim data login
        router.post(
          "/forgot-password",sendEmail,
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

    function onSubmit(data) {
      router.post("/input-otp", data, {
        onSuccess: () => {
          onSuccess()
        },
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 flex flex-col items-center">
          { success && (
            <AlertSuccess message={success}/>
          )}
          {errorMessage && (
            <AlertDestructive message={errorMessage}/>
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
                <p>Tidak menerima kode ? <button type="button" onClick={sendAgainOTP} className="text-blue-500">Kirim Ulang</button></p>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  }