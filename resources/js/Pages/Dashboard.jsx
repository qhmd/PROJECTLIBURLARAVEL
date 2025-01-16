import React from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import Header from './Header';

import banner1 from '../../../public/images/imgbanner1.webp'
import banner2 from '../../../public/images/imgbanner2.webp'
import ImageSlider from './ImageSlider';

 





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
        <div>

            <Header auth={auth}/>
            {/* <h1>Halo</h1>
            <LogoutButton />
            <h1>Selamat Datang, {auth.user?.first_name}!</h1>
            <p>Email: {auth.user?.email}</p>
            <p>Username: {auth.user?.username}</p> */}
            <div className='flex justify-center mt-4'>
                <ImageSlider />
            </div>
        </div>
    );
}

export default Dashboard;
