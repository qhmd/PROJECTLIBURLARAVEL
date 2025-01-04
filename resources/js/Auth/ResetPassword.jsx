// ResetPassword.jsx (React)
import React from 'react';
import { usePage } from '@inertiajs/react';

export default function ResetPassword({ token }) {
    const { email } = usePage().props;

    return (
        <div>
            <h1>Reset Password</h1>
            <form method="POST" action="/reset-password">
                @csrf
                <input type="hidden" name="token" value={token} />
                <input type="hidden" name="email" value={email} />
                <div>
                    <label>New Password</label>
                    <input type="password" name="password" required />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" name="password_confirmation" required />
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}
