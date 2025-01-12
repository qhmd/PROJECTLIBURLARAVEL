import React from "react";
import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold  mb-4">Welcome to ShadCN UI with Inertia.js!</h1>
            <Button variant="secondary">Secondary</Button>
        </div>
    );
}
