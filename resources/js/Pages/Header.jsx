import React, { useState, useEffect } from 'react';

import logo from '../../../public/images/logo.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "@inertiajs/react";
import { Textarea } from "@/components/ui/textarea"

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


import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
  

const formSchema = z.object({
    product: z.string().min(1, { message: "Kolom ini harus diisi." }), // Validasi string tidak kosong
    price: z
      .string().min(1, { message : "Kolom ini harus diisi." }),
    explanation: z.string().min(1, { message: "Kolom ini harus diisi." }), // Validasi string tidak kosong
    picture: z.array(z.string()) // Validasi sebagai array string (bisa diubah ke File jika perlu)
    .min(1, { message: "Minimal satu gambar harus diunggah." }), // Pastikan array tidak kosong
});

function Header({ auth }) {
    const [errorMessage, setErrorMessage] = useState(null); // Untuk menyimpan pesan error

    const [processing, setProcessing] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleClose = () => {
        setIsVisible(false);
      };
      
      const [saveImages, setSaveImages] = useState([]);

      useEffect(() => {
        form.setValue("picture", images.map(img => img.preview)); 
    }, [images]);
    

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        criteriaMode: "all",
        defaultValues: {
          product: "",
          price: "",
          explanation: "",
          picture: saveImages,
        },
    });


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const base64String = event.target.result;
                const newImage = {
                    preview: base64String,
                    id: Date.now() + Math.random(),
                    name: file.name
                };
                // Add to state
                setImages(prev => [...prev, newImage]);
                
                // Save to localStorage
                const savedImages = JSON.parse(localStorage.getItem('savedImages') || '[]');
                savedImages.push(newImage);
                localStorage.setItem('savedImages', JSON.stringify(savedImages));
            };
            
            reader.readAsDataURL(file);
        });
    };
      const handleRemoveImage = (id) => {
        setImages((prev) => prev.filter((image) => image.id !== id));
      };
    

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const onSubmit = (data) => {
        console.log(data);
        setProcessing(true);
        router.post(
          "/posts/create",data,
          {
            onError: (errors) => {
              const errorMessage = errors
                ? Object.values(errors).flat().join(", ")
                : "Terjadi Kesalahan Jaringan";
                console.error(errorMessage)
              setErrorMessage(errorMessage);
            },
            onSuccess: () => {
                console.log("Success")
            },
            onFinish: () => setProcessing(false), // Reset state processing
          }
        );
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
                                                    <AlertDialogCancel className='absolute p-4 border border-red-500 rounded rounded-none right-1 top-1 rounded rounded-[5px]'>
                                                        X
                                                    </AlertDialogCancel>
                                                   <Form {...form}>
                                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                                    <FormField
                                                        control={form.control}
                                                        name="product"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                               <FormLabel>Apa yang anda jual</FormLabel>
                                                                <FormControl>
                                                                    <Input  className="bg-slate-100" {...field} />
                                                                </FormControl>
                                                                <FormMessage/>
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
                                                                    <Input placeholder="0" className="bg-slate-100 border border-gray-300 rounded-lg text-sm p-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" type='number' min='0' {...field} />
                                                                </FormControl>
                                                                <FormMessage/>
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
                                                                    <Textarea
                                                                        {...field}className='resize-none h-36'
                                                                    />
                                                                </FormControl>
                                                                <FormMessage/>
                                                            </FormItem>
                                                        )}
                                                        />
                                                        <div className="grid w-full max-w-sm items-center gap-1.5">

                                                        <FormField
                                                        control={form.control}
                                                        name="picture"
                                                        render={({ field }) => (
                                                            <FormItem>                                                          
                                                                <FormControl>
                                                                    <div>
                                                                    <Label htmlFor="picture">Picture</Label>
                                                                        <Input 
                                                                            id="picture"
                                                                            className='bg-slate-100'
                                                                            type="file"
                                                                            accept="image/*"
                                                                            multiple
                                                                            onChange={handleImageChange}
                                                                        />
                                                                    <p className='text-slate-500 text-xs'><span className='text-red-500'>*</span>Anda bisa memasukkan lebih dari 1 gambar</p>
                                                                </div>
                                                                    </FormControl>
                                                                <FormMessage/>
                                                            </FormItem>
                                                        )}
                                                        />
                                                            
                                                        </div>
                                                        <div className="flex gap-4 flex-wrap mt-4">
                                                            {images.map((img) => (
                                                            <div key={img.id} className="relative w-24 h-24">
                                                                <img
                                                                src={img.preview}
                                                                alt="preview"
                                                                className="w-full h-full object-cover border rounded"
                                                                />
                                                                {/* Tombol Close */}
                                                                <button
                                                                onClick={() => handleRemoveImage(img.id)}
                                                                className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow"
                                                                >
                                                                ×
                                                                </button>
                                                            </div>
                                                            ))}
                                                        </div>
                                                        <div className='!mt-8'>
                                                            <button type="submit"
                                                                className='bg-purple-500 rounded rounded-[1vw] font-semibold text-white font-sans py-2 px-5'
                                                            >Kirim</button>
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