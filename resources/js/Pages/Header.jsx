import React, { useState } from 'react';

import logo from '../../../public/images/logo.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

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


function Header({ auth }) {
    const [searchTerm, setSearchTerm] = useState('');

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
