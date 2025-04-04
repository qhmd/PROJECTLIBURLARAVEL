import React from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import Header from './Header';

import ImageSlider from './ImageSlider';
import OptionMenu from './OptionMenu';
import DaftarProduk from './DaftarProduk';
 





function LogoutButton() {
    const handleLogout = async () => {
        if (confirm('Apakah Anda yakin ingin logout?')) {
            try {
                const response = await axios.post('/logout');
                console.log(response.data); // Tampilkan pesan sukses
                window.location.href = "/login"; // Arahkan ke dashboard
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
            }
            console.log('Logged out')
        }
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">
            Logout
        </button>
    );
}


function Dashboard() {
    const { auth } = usePage().props;
    return (
        <div className='mx-0 my-0 p-0'>
            <Header auth={auth}/>
            <div className='flex justify-center pt-24'>
                <ImageSlider />
            </div>
            <div className='mx-16 my-16'>
                <OptionMenu/>
            </div>
                <hr className='h-2 bg-slate-200'/>
            <div className='mx-16 mt-12'>
                <DaftarProduk/>
            </div>
            <div className='mt-12'>
                <p>Footer</p>
            </div>
    </div>
    );
}

export default Dashboard;
