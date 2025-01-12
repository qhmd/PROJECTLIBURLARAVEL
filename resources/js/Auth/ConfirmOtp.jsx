import React, { useState, useEffect } from "react";
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
  const validEmail = {
    "email" : sendEmail
  }
  console.log(props)
  console.log(success)
  console.log(validEmail)

  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // Untuk menyimpan pesan error
  const [succesSend, setSuccesSend] = useState(null); // Untuk menyimpan pesan error
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

    const [timeLeft, setTimeLeft] = useState(30); // Set initial time to 30 seconds
    const [isTimeUp, setIsTimeUp] = useState(false); // Track if time is up

    useEffect(() => {
      if (timeLeft > 0) {
        const interval = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1); // Decrease time by 1 second
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on unmount
      } else {
        setIsTimeUp(true); // Time is up
      }
    }, [timeLeft]);
    
      const sendAgainOTP = () => {
        setProcessing(true);
        setSuccesSend(null); 
        setErrorMessage(null); // Reset pesan error sebelum mencoba login
        
        // Gunakan Inertia.post untuk mengirim data login
        router.post(
          "/forgot-password",validEmail,
          {
            onSuccess: () => {
              success(null);
              setSuccesSend("Kode OTP berhasil dikirim ulang.")
            },
            onError: (errors) => {
              // Jika ada error dari server, tangani di sini
              const errorMessage = errors
                ? Object.values(errors).flat().join(", ")
                : "Terjadi Kesalahan Jaringan";
              setErrorMessage(errorMessage);
            },
            onFinish: () => {
              setTimeLeft(30);
              setIsTimeUp(false); // Time is up
              setProcessing(false)
            }, // Reset state processing
          }
        );
      };

    function onSubmit(data) {
      setSuccesSend(null); 
      setErrorMessage(null); // Reset pesan error sebelum mencoba login
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
    }


  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 flex flex-col items-center">
          { success && !succesSend && (
            <AlertSuccess message={success}/>
          )}
          { succesSend && (
            <AlertSuccess message={succesSend}/>
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
                {
                  !isTimeUp? (
                    <p className="text-gray-800">Kirim ulang OTP dalam {timeLeft} detik.</p>
                  ) : (
                    <p className="text-gray-800">Tidak menerima kode ? <button type="button" onClick={sendAgainOTP} className="text-blue-500">Kirim Ulang</button></p>
                  )
                }
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  }