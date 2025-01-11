import { AlertCircle, X } from "lucide-react";
import React, { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export function AlertDestructive({message}) {

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // Jangan render apa pun jika alert sudah ditutup
  }

  return (
    <Alert variant="destructive">
      <div className="flex justify-between">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <button
            onClick={handleClose}
            className=" text-red-500 border border-red-500 rounded rounded-sm"
            >
            <X className="h-5 w-5" />
            </button>
      </div>
          <div>
            <AlertDescription>
              {message}
            </AlertDescription>
          </div>
    </Alert>
  );
}
