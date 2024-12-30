import React from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';


function LogoutButton() {
    const handleLogout = () => {
        if (confirm('Apakah Anda yakin ingin logout?')) {
            axios.post('/logout');
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
            {/* <h1>Halo</h1> */}
            {/* <LogoutButton /> */}
            <h1>Selamat Datang, {auth.user?.first_name}!</h1>
            <p>Email: {auth.user?.email}</p>
            <p>Username: {auth.user?.username}</p>
        </div>
    );
}

export default Dashboard;
