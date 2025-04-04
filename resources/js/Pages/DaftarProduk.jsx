import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { usePage } from '@inertiajs/react';
  
  

function DaftarProduk() {
const { posts } = usePage().props;
console.log(posts)
  return (
    <div>
        <h1 className='font-sans font-semibold'>Daftar Produk</h1>
        <div className='flex gap-2 mt-4 flex-wrap justify-center'>
            {
                posts.map((posts) => {
                    return (
                        <Card className='w-48'>
                            <CardHeader className='p-0 h-48'>
                                {JSON.parse(posts.picture).map((pic, index) => (
                                    <div key={index} className="flex justify-center items-center h-96 w-full overflow-hidden">
                                        <img 
                                        src={pic} 
                                        alt="Post" 
                                        className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                ))}
                            </CardHeader>
                            <CardContent className='p-3'>
                            <CardTitle>{posts.name_items}</CardTitle>
                                <CardDescription className='text-lg text-color-black font-bold'>{posts.harga}</CardDescription>
                                <CardDescription>{posts.keterangan}</CardDescription>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </div>
    </div>
  )
}

export default DaftarProduk
