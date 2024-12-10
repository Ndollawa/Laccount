import { FieldValues, UseFormSetError } from 'react-hook-form';

import { fromCamelCase } from "@utils/stringFormat";
import showToast from "@utils/showToast";

interface FieldError {
field: string;
error: String[];
}

interface ApiError {
  message: string | FieldError[] | Record<string, string[]>;
  errors: string; 
  statusCode: number;
}

const handleApiErrors = <T extends FieldValues>(
  error: any,  // error response from the backend
  setError: UseFormSetError<T>
) => {
  // Check if it's a validation error (status 400)
  if (error.data && error.data.statusCode === 400 || error.status === 400) {
    const apiError:ApiError = error.data.error;

    // Loop over validation errors and set them in the form
    if (typeof apiError.message !== 'string' && apiError.message) {
      apiError.message.forEach(({field, error}) => {
        console.log(field, error)
        setError(fromCamelCase(field,true), {
          type: 'manual',
          message: error.join(',\n '),
        });
      });
    } else {
     showToast('error', apiError.message || 'Validation failed');
    }
  } else {
    // Handle other status codes or errors
   showToast('error', 'An unexpected error occurred');
  }
};

export default handleApiErrors;
