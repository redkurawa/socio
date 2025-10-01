import { Input } from '../ui/input';
import { Label } from '../ui/label';
import type { FieldError } from 'react-hook-form';

interface FormFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  register: any;
  error?: FieldError;
  type?: string;
  className?: string;
}

export const FormField = ({
  id,
  label,
  placeholder,
  register,
  error,
  type = 'text',
  className = '',
}: FormFieldProps) => {
  return (
    <div className='mb-4'>
      <Label className='text-sm text-white' htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        {...register(id)}
        className={`custom-input ${className}`}
        placeholder={placeholder}
      />
      {error && <p className='text-sm text-red-500'>{error.message}</p>}
    </div>
  );
};
