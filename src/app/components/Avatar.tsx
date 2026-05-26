import { twMerge } from 'tailwind-merge'
import { useDarkMode } from '../hooks/useDarkMode.ts'
import { Member } from '../../@clean/shared/domain/entities/member.ts'
import { useContext, useMemo, useState } from 'react'
import imageCompression from 'browser-image-compression'
import { MemberContext } from '../contexts/member_context.tsx'
import { toast } from 'react-toastify'

type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  isEditable?: boolean
  member: Member | undefined
}

export function Avatar({ isEditable, member, ...props }: AvatarProps) {
  const { darkMode } = useDarkMode()
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const { changeMemberProfilePicture } = useContext(MemberContext)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setSelectedFile(file)

      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          initialQuality: 0.8
        }

        const compressedFile = await imageCompression(file, options)

        const reader = new FileReader()
        reader.onload = async () => {
          const result = reader.result as string
          const base64Content = result.split(',')[1]

          if (confirm('Deseja salvar a imagem?')) {
            await changeMemberProfilePicture(base64Content)

            toast.success('Foto de Perfil Atualizada com Sucesso!', {
              position: 'top-right',
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored'
            })
          } else {
            setSelectedFile(undefined)
          }
        }
        reader.readAsDataURL(compressedFile)
      } catch (error) {
        console.error('Error during image compression:', error)
      }
    }
  }

  const splitName = member ? member.name.trim().split(' ') : []
  const firstName = splitName[0] || ''
  const lastName = splitName.length > 1 ? splitName[splitName.length - 1] : ''

  const styleJson = useMemo(() => {
    if (!member || (!member.photo && !selectedFile)) {
      return undefined
    }

    return {
      backgroundImage:
        selectedFile === undefined
          ? member.photo !== null
            ? `url(${member.photo})`
            : 'none'
          : `url(${URL.createObjectURL(selectedFile)})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      objectPosition: 'center',
      transition: 'background 0.3s ease-in-out'
    }
  }, [member?.photo, selectedFile])

  if (member) {
    return (
      <div
        {...props}
        className={twMerge(
          `relative flex aspect-square flex-col items-center justify-end overflow-hidden text-skin-muted ${
            darkMode ? 'bg-skin-secundary' : 'bg-skin-fill'
          } `,
          props.className
        )}
        style={styleJson}
      >
        <p
          className={`absolute inset-0 flex items-center justify-center text-sm font-medium ${
            member.photo || selectedFile ? 'hidden' : 'block'
          }`}
        >
          {lastName ? `${firstName[0]}${lastName[0]}` : `${firstName[0]}`}
        </p>
        {isEditable ? (
          <>
            <label
              htmlFor="profile-img"
              className={`w-full cursor-pointer rounded-b-lg border-t border-black/30 bg-black/20 py-1 text-center text-sm font-medium backdrop-blur-sm hover:border-black/40 hover:bg-black/30 ${
                isEditable ? 'block' : 'hidden'
              }`}
            >
              Editar
            </label>
            <input
              id="profile-img"
              type="file"
              accept="image/*"
              className={`${isEditable ? 'sr-only' : 'hidden'}`}
              onChange={handleFileChange}
            />
          </>
        ) : null}
      </div>
    )
  } else {
    // Member is undefined
    return <MemberNotDefined {...props} />
  }
}

const MemberNotDefined = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { darkMode } = useDarkMode()

  return (
    <div
      className={twMerge(
        `flex aspect-[1/1] h-8 w-8 items-center justify-center rounded-full text-skin-muted hover:text-skin-base ${
          darkMode ? 'bg-skin-secundary' : 'bg-skin-fill'
        }`,
        props.className
      )}
      {...props}
    >
      <p className="text-sm font-medium">?</p>
    </div>
  )
}
