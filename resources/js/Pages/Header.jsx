import React, { useState } from 'react';

import logo from '../../../public/images/logo.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
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

  import { Label } from "@/components/ui/label"

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

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Link } from '@inertiajs/react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
  

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';

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


function Header({ auth }) {
    const [searchTerm, setSearchTerm] = useState('');

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        criteriaMode: "all",
        defaultValues: {
          product: "",
          price: "",
          explanation: "",
        },
    });

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };



    return (
        <div>
            <div className='flex items-center h-20 font-sans w-full bg-white border border-black-500 z-50 fixed'>
                <img src={logo} draggable="false" className="w-auto h-14 pl-4" alt="Logo" />
                <div class='max-w-xl w-[35rem] ml-4 '>
                    <div class="flex items-center w-full rounded rounded-xl h-12 rounded-lg bg-white overflow-hidden border border-black-500">
                        <div class="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <input
                        class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="Search something.." /> 
                    </div>
                </div>
                <p className='font-semibold font-sans text-sm ml-4'>Kategori</p>
                <div className='flex mx-auto gap-4'>
                    {auth.user && (
                        <>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <StorefrontIcon/>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 ">
                                    <p className='text-center text-slate-800 font-bold border border-black-100 rounded-xl py-2 mb-2'>Marketplace</p>
                                    <div className='flex flex-col items-start '>
                                        <Link className='font-semibold'>Profil</Link>
                                        <Link className='font-semibold'>Kotak Masuk</Link>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className='mt-4 font-semibold'>Tambah Produk</button>
                                            </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                   <Form {...form}>
                                                    <form onSubmit={form.handleSubmit()} className="space-y-2">
                                                    <FormField
                                                        control={form.control}
                                                        name="product"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                               <FormLabel>Apa yang anda jual</FormLabel>
                                                                <FormControl>
                                                                    <Input  className="bg-slate-100" {...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                        />
                                                        <FormField
                                                        control={form.control}
                                                        name="price"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                               <FormLabel>Harga(Rp)</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="0" className="bg-slate-100" {...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                        />
                                                        <FormField
                                                        control={form.control}
                                                        name="explanation"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                               <FormLabel>Keterangan</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="shadcn" className="bg-slate-100" {...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                        />
                                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                                            <Label htmlFor="picture">Picture</Label>
                                                            <Input id="picture" className='bg-slate-100' type="file" />
                                                        </div>
                                                        <div className='!mt-8'>
                                                            <Link type="submit"
                                                                className='bg-purple-500 rounded rounded-[1vw] text-white font-sans py-3 px-5'
                                                            >Kirim</Link>
                                                        </div>
                                                    </form>
                                                    </Form>
                                                </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <FavoriteBorderIcon/>
                            <NotificationsNoneOutlinedIcon />
                            <MailOutlineOutlinedIcon />
                       </>
                    )}
                </div>
                <div
                    style={{
                        width: '1px',
                        height: '30px',
                        backgroundColor: "#D1D5DB",
                    }}
                />
                <div className='mx-auto flex gap-2'>
                    {!auth.user ? (
                        <>
                            <Link href='/login' className='border border-purple-500 rounded rounded-l px-3 py-1 font-bold text-purple-500'>Masuk</Link>
                            <Link href='/register' className='border border-purple-500 rounded rounded-l px-3 py-1 font-bold bg-purple-500 text-white'>Daftar</Link>
                        </>
                    ) : (
                        <div className='flex items-center'>
                            <div className='mr-7'>
                                <ShoppingCartOutlinedIcon />
                            </div>
                            <div className='flex items-center gap-2'>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h1 className='font-semibold '>{auth.user.first_name}</h1>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
