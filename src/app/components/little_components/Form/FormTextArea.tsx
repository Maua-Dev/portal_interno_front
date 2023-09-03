import { TextareaHTMLAttributes } from 'react'

interface FormTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function FormTextArea({ ...rest }: FormTextAreaProps) {
  return (
    <div>
      <textarea
        {...rest}
        className="h-32 w-full border border-black p-2"
        placeholder="Digite sobre a ação realizada..."
        name="description"
      />
    </div>
  )
}
