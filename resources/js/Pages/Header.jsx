import React, { useState } from 'react'



import logo from '../../../public/images/logo.png'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Link } from '@inertiajs/react';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"

function Header({auth}) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    return (
        <div>
            <div className='flex items-center h-20 w-full bg-white border border-black-500 relative'>
                <img src={logo} draggable="false" className="w-auto h-14 pl-4" alt="Logo" />
                <Command className='ml-24 max-w-2xl border border-black-500 rounded rounded-xl'>
                    <CommandInput
                        placeholder="Type a command or search..."
                        // value={searchTerm}
                        // onChange={handleSearchChange}
                    />
                    {searchTerm && (
                        <CommandList className="absolute mt-12 border border-black-500 min-w-[675px]">
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Silahkan melakukan pencarian barang yang anda inginkan">
                                <CommandItem>Calendar</CommandItem>
                                <CommandItem>Search Emoji</CommandItem>
                                <CommandItem>Calculator</CommandItem>
                                <CommandItem>Profile</CommandItem>
                                <CommandItem>Billing</CommandItem>
                                <CommandItem>Settings</CommandItem>
                            </CommandGroup>
                        </CommandList>
                    )}
                </Command>
                <div className='mx-auto flex gap-3'>
                    <ShoppingCartOutlinedIcon />
                    { auth.user && (
                        <>
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
                    { !auth.user ? (
                        <>
                            <Link href='/login' className='border border-purple-500 rounded rounded-l px-3 py-1 font-bold text-purple-500'>Masuk</Link>
                            <Link href='/register' className='border border-purple-500 rounded rounded-l px-3 py-1 font-bold bg-purple-500 text-white'>Daftar</Link>
                        </>
                    ) : 
                        <div className='flex items-center gap-2'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h1 className='font-bold'>{auth.user.first_name}</h1>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Header
