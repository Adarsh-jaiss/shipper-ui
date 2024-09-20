import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const BuildStatus = ({ status, message }) => {
  const [timer, setTimer] = useState(300);

  useEffect(() => {
    let interval;
    if (status === 'loading') {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  if (status === 'loading') {
    return (
      <Alert className="mt-4 bg-blue-100 text-blue-800">
        <AlertDescription>
          Hang on, container building is in progress...
          <div className="mt-2 font-mono">
            Time remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'success') {
    return (
      <Alert className="mt-4 bg-green-100 text-green-800">
        <CheckCircle className="h-4 w-4 mr-2" />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  }

  if (status === 'error') {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default BuildStatus;