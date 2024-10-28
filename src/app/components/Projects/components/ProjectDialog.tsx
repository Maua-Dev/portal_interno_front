import { ProjectType } from '../../../../@clean/shared/infra/repositories/project_repository_http'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import Button from '../../Historic/components/Button'
import { ReactNode, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../../contexts/theme_context'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Selector } from '../../Selector'
import MemberSelector from './MemberSelector'
import {
  dateToMilliseconds,
  timeStampToDate,
  toISOStringWithTimezone
} from '../../../utils/functions/timeStamp'
import { useActionModal } from '../../ActionModal/hooks/useActionModal'
import { ProjectContext } from '../../../contexts/project_context'
import { Upload } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import { toast } from 'react-toastify'
import { makeProjectCode } from '../../../utils/functions/formatters'

interface ProjectDialogProps {
  loadProjects: () => Promise<void>
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  project?: ProjectType
  children?: ReactNode
}

export default function ProjectDialog({
  loadProjects,
  open,
  setOpen,
  project,
  children
}: ProjectDialogProps) {
  const { darkMode } = useContext(ThemeContext)
  const { createProject, updateProject, allProjects } =
    useContext(ProjectContext)
  const [codeError, setCodeError] = useState<string>('')
  const [isPopUpOpen, setPopUpOpen] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const { setCurrentMembers } = useActionModal()

  const projectSchema = z
    .object({
      name: z.string().min(1, { message: 'Título do Projeto é obrigatório!' }),
      poUserId: z.string().min(1, { message: 'PO é obrigatório!' }),
      scrumUserId: z
        .string()
        .min(1, { message: 'Scrum Master é obrigatório!' }),
      startDate: z
        .string()
        .min(1, { message: 'Data de Inicial é obrigatório!' }),
      membersUserIds: z
        .array(z.string().min(1, { message: 'Membros são obrigatórios!' }))
        .min(1, { message: 'Membros são obrigatórios!' }),
      photo: z.string().min(1, { message: 'Foto é obrigatório!' }),
      description: z.string().min(1, { message: 'Descrição é obrigatório!' })
    })
    .refine(
      (data) => {
        const code = makeProjectCode(data.name)

        // If the code is the same as the previus project code, it's ok
        if (code.toUpperCase() === project?.code.toUpperCase()) return true

        if (allProjects) {
          const codeAllreadyExists = allProjects.some(
            (p) => p.code.toUpperCase() === code.toUpperCase()
          )

          setCodeError(code)

          return !codeAllreadyExists
        }
      },
      {
        message: `Mude o nome do projeto, pois o code (${codeError}) dele ja exite!`,
        path: ['name'] // This specifies that the error is related to the 'name' field
      }
    )

  const handleClosePop = (open: boolean) => {
    setValue('name', '')
    setValue('poUserId', '')
    setValue('scrumUserId', '')
    setValue('startDate', '')
    setValue('membersUserIds', [])
    setValue('photo', '')
    setValue('description', '')
    setCurrentMembers([])
    setSelectedFile(undefined)
    setPopUpOpen(open)

    if (setOpen) {
      setOpen(open)
    }
  }

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
        reader.onload = () => {
          const result = reader.result as string
          const base64Content = result.split(',')[1]
          setValue('photo', base64Content)
        }
        reader.readAsDataURL(compressedFile)
      } catch (error) {
        console.error('Error during image compression:', error)
      }
    }
  }

  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || '',
      poUserId: project?.poUserId || '',
      scrumUserId: project?.scrumUserId || '',
      startDate: project?.startDate ? timeStampToDate(project!.startDate) : '',
      membersUserIds: project?.membersUserIds || [],
      photo: project?.photo || '',
      description: project?.description || ''
    }
  })

  const handleOnSubmit: SubmitHandler<z.infer<typeof projectSchema>> = async (
    data?
  ) => {
    const validated = projectSchema.safeParse(data)

    if (validated.success && data) {
      console.log('Form Submitted')

      let newCode
      if (project?.name !== data.name) {
        newCode = makeProjectCode(data.name)
      } else {
        newCode = project.code
      }

      const allMembers = data.membersUserIds.concat([
        data.poUserId,
        data.scrumUserId
      ])

      let projectResponse: ProjectType

      console.log(data.startDate)
      console.log(dateToMilliseconds(data.startDate))
      if (!project) {
        projectResponse = await createProject({
          code: newCode,
          description: data.description,
          membersUserIds: allMembers,
          name: data.name,
          photo: data.photo,
          poUserId: data.poUserId,
          scrumUserId: data.scrumUserId,
          startDate: dateToMilliseconds(data.startDate)
        })

        toast.success('Projeto Criado com sucesso!', {
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
        let photoFinal: string | null = getValues('photo')

        if (!selectedFile) {
          photoFinal = null
        }

        console.log('photoFinal', newCode)

        projectResponse = await updateProject(project.code, {
          code: newCode,
          description: data.description,
          membersUserIds: allMembers,
          name: data.name,
          photo: photoFinal,
          poUserId: data.poUserId,
          scrumUserId: data.scrumUserId,
          startDate: dateToMilliseconds(data.startDate)
        })

        toast.success('Projeto Atualizado com sucesso!', {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      }

      if (projectResponse) {
        await loadProjects()
        handleClosePop(false)
      }
    }
  }

  useEffect(() => {
    if (project) {
      setValue('name', project.name)
      setValue('poUserId', project.poUserId)
      setValue('scrumUserId', project.scrumUserId)
      setValue('description', project.description)
      setValue('membersUserIds', project.membersUserIds)
      setCurrentMembers(
        project.membersUserIds.filter(
          (member) => ![project.poUserId, project.scrumUserId].includes(member)
        )
      )
      setValue('startDate', timeStampToDate(project.startDate))
      setValue('photo', project.photo || '')
    } else {
      setCurrentMembers([])
    }
  }, [project, open, setValue, setCurrentMembers])

  return (
    <div className="static flex w-full justify-center">
      <DialogPrimitive.Root
        open={open ? open : isPopUpOpen}
        onOpenChange={handleClosePop}
      >
        <DialogPrimitive.DialogTrigger disabled={open ? true : false} asChild>
          {children}
        </DialogPrimitive.DialogTrigger>
        <DialogPrimitive.Overlay className="fixed inset-0 z-30 bg-black opacity-50" />
        <DialogPrimitive.DialogContent
          className={`scrollbar-hide-default fixed bottom-0 left-0 right-0 top-0 z-50 mx-auto my-auto flex h-4/5 w-5/6 flex-col gap-16 overflow-x-hidden overflow-y-scroll rounded-md border border-skin-muted px-4 py-10 text-skin-base outline-none sm:w-5/6 md:h-5/6 md:px-10 md:py-20  xl:scrollbar-hide ${
            darkMode ? 'bg-skin-fill' : 'bg-skin-secundary'
          }`}
        >
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="flex h-fit w-full flex-col gap-5 md:flex-row lg:h-full"
          >
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-4">
                {/* Title/Name of Project */}
                <p
                  className={`text-2xl font-medium ${
                    errors.name ? 'text-red' : null // in the future
                  }`}
                >
                  Titulo do Projeto
                </p>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Insira o Titulo do Projeto"
                  className={`rounded ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } px-2 py-1 outline-none`}
                />
                <span className="font-medium text-red-600">
                  {errors.name?.message}
                </span>
              </div>
              <div className="flex h-full w-full flex-col items-start justify-normal gap-5">
                <div className="flex w-full flex-col justify-between gap-8 py-4 lg:h-1/2 lg:flex-row">
                  <div className="flex w-full flex-col-reverse justify-between gap-8 lg:flex-col lg:gap-3">
                    {/* PO Selector */}
                    <div className="flex flex-col gap-3">
                      <MemberSelector
                        objectParameter={'poUserId'}
                        setValue={setValue}
                        getValue={getValues}
                        label="PO"
                      />
                      <span className="font-medium text-red-600">
                        {errors.poUserId?.message}
                      </span>
                    </div>
                    <div>
                      {/* Data */}
                      <p className="text-xl font-medium">Data</p>
                      <div className="flex flex-col gap-3">
                        <input
                          {...register('startDate')}
                          id="startDate"
                          name="startDate"
                          type="datetime-local"
                          placeholder="DD/MM/AAAA"
                          max={toISOStringWithTimezone(new Date()).slice(0, 16)}
                          className={`w-full rounded ${
                            darkMode ? 'bg-gray-600' : 'bg-gray-300'
                          } px-2 py-1 outline-none`}
                        />
                        <span className="font-medium text-red-600">
                          {errors.startDate?.message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-3">
                    {/* SCRUM Selector  */}
                    <MemberSelector
                      label="SCRUM"
                      objectParameter={'scrumUserId'}
                      setValue={setValue}
                      getValue={getValues}
                    />
                    <span className="font-medium text-red-600">
                      {errors.scrumUserId?.message}
                    </span>
                  </div>
                  <div className="w-full">
                    {/* Members Selector */}
                    <Selector
                      objectParameter="membersUserIds"
                      setValue={setValue}
                      getValues={getValues}
                      isLabelBold={false}
                    />
                    <span className="font-medium text-red-600">
                      {errors.membersUserIds?.message}
                    </span>
                  </div>
                </div>
                <div className="flex h-1/2 w-full flex-col gap-3">
                  {/* Description */}
                  <div className="flex flex-row gap-10">
                    <p className="text-xl font-medium">Descrição</p>
                  </div>
                  <span className="font-medium text-red-600">
                    {errors.description?.message}
                  </span>
                  <textarea
                    {...register('description')}
                    name="description"
                    id="description"
                    placeholder="Digite a descrição do projeto..."
                    className={`h-32 w-full rounded px-2 py-1 outline-none lg:h-full ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  />
                </div>
              </div>
            </div>
            <div
              // Separator
              style={{ width: '2px' }}
              className="h-full rounded-lg bg-skin-fill"
            />
            <div className={`flex h-full w-full flex-col gap-4 md:w-3/5`}>
              {/* Picture File  */}
              <div className="h-full gap-2 overflow-x-hidden">
                <h1 className="pb-2 pl-2 text-2xl font-medium">
                  Adicionar Foto
                </h1>
                <label
                  htmlFor="image"
                  className={`flex h-52 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 bg-skin-secundary text-skin-muted opacity-100 delay-100 hover:bg-skin-fill md:h-1/2 ${
                    selectedFile || getValues('photo') !== ''
                      ? 'border-solid border-skin-muted'
                      : 'border-dashed border-gray-200'
                  }`}
                  style={{
                    backgroundImage:
                      selectedFile === undefined
                        ? getValues('photo') !== ''
                          ? `url(${getValues('photo')})`
                          : 'none'
                        : `url(${URL.createObjectURL(selectedFile)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    objectPosition: 'center',
                    transition: 'background 0.3s ease-in-out'
                  }}
                >
                  <Upload
                    className={`flex size-2/12 ${
                      project || selectedFile ? 'hidden' : ''
                    }`}
                  />
                  <p
                    className={`font-medium ${
                      project || selectedFile ? 'hidden' : ''
                    }`}
                  >
                    Clique para adicionar uma foto
                  </p>
                </label>
                <span className="pt-4 font-medium text-red-600">
                  {errors.photo?.message}
                </span>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex h-fit w-full flex-row gap-2">
                <Button
                  onClick={() => {
                    if (confirm('Deseja fechar sem salvar?'))
                      handleClosePop(false)
                  }}
                  buttonType="button"
                  variant="default"
                  className="w-full rounded border border-skin-muted"
                >
                  Cancelar
                </Button>

                <Button
                  buttonType="submit"
                  variant="form"
                  className="w-full rounded border border-skin-muted"
                >
                  Salvar
                </Button>
              </div>
            </div>
          </form>
        </DialogPrimitive.DialogContent>
      </DialogPrimitive.Root>
    </div>
  )
}
