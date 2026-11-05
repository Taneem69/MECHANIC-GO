import { useId, useState, type InputHTMLAttributes, type Ref } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  ref?: Ref<HTMLInputElement>
}

/** Labelled input with accessible error text and an optional show/hide toggle for passwords. */
export default function FormField({ label, error, type = 'text', className = '', ref, ...rest }: FormFieldProps) {
  const id = useId()
  const errorId = `${id}-error`
  const [shown, setShown] = useState(false)
  const isPassword = type === 'password'

  return (
    <div>
      <label htmlFor={id} className="text-mono-sm text-white/50 mb-2 block">
        {label}
      </label>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={isPassword && shown ? 'text' : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-[#F7FF19] transition-colors ${
            error ? 'border-red-500/70' : 'border-white/10'
          } ${isPassword ? 'pr-12' : ''} ${className}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShown((s) => !s)}
            aria-label={shown ? 'Hide password' : 'Show password'}
            aria-pressed={shown}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-colors"
          >
            {shown ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
