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
import { motion } from 'framer-motion'
import {
  dateToMilliseconds,
  timeStampToDate,
  toISOStringWithTimezone
} from '../../../utils/functions/timeStamp'
import { useActionModal } from '../../ActionModal/hooks/useActionModal'
import { ProjectContext } from '../../../contexts/project_context'
import { ImBlocked } from 'react-icons/im'

// const MAX_FILE_SIZE = 5000000
// const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/webp'
// ]

const projectSchema = z.object({
  name: z.string().min(1, { message: 'Título do Projeto é obrigatório!' }),
  poUserId: z.string().min(1, { message: 'PO é obrigatório!' }),
  scrumUserId: z.string().min(1, { message: 'Scrum Master é obrigatório!' }),
  startDate: z.string().min(1, { message: 'Data de Inicial é obrigatório!' }),
  membersUserIds: z
    .array(z.string().min(1, { message: 'Membros são obrigatórios!' }))
    .min(1, { message: 'Membros são obrigatórios!' }),
  photo: z.string().min(1, { message: 'Foto é obrigatório!' }),
  // .refine((file) => file?.size <= MAX_FILE_SIZE, {
  //   message: 'Só é suportado imagens de até 5MB'
  // })
  // .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
  //   message:
  //     'Só é suportado arquivos nos formatos: .jpg, .jpeg, .png and .webp'
  // })
  description: z.string().min(1, { message: 'Descrição é obrigatório!' })
})

interface ProjectDialogProps {
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  project?: ProjectType
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[] | undefined>>
  children?: ReactNode
}

export default function ProjectDialog({
  open,
  setOpen,
  project,
  setProjects,
  children
}: ProjectDialogProps) {
  const { darkMode } = useContext(ThemeContext)
  const { createProject, updateProject } = useContext(ProjectContext)
  const [isPopUpOpen, setPopUpOpen] = useState<boolean>(false)
  const [selectedFiles, setSelectedFiles] = useState<
    Array<{ name: string } | File>
  >([])
  const { setCurrentMembers } = useActionModal()

  const handleClosePop = (open: boolean) => {
    setValue('name', '')
    setValue('poUserId', '')
    setValue('scrumUserId', '')
    setValue('startDate', '')
    setValue('membersUserIds', [])
    setValue('photo', '')
    setValue('description', '')
    setCurrentMembers([])
    setSelectedFiles([])
    setPopUpOpen(open)

    if (setOpen) {
      setOpen(open)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        name: file.name,
        file
      }))
      // setSelectedFiles((prev) => prev.concat(Array.from(e.target.files)))
      setValue(
        'photo',
        // filesArray.map((fileObj) => fileObj.file)
        '' // VOU RESOLVER DEPOIS @BRN POKAS
      )
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
        const nameParts = data?.name.split(' ')
        if (nameParts.length > 1) {
          // Se houver mais de uma palavra, usa a primeira e a última inicial
          newCode =
            nameParts[0].charAt(0).toUpperCase() +
            nameParts[nameParts.length - 1].charAt(0).toUpperCase()
        } else {
          // Se houver apenas uma palavra, usa a primeira letra duas vezes
          newCode =
            nameParts[0].charAt(0).toUpperCase() +
            nameParts[0].charAt(1).toUpperCase()
        }
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
      } else {
        projectResponse = await updateProject(project.code, {
          code: newCode,
          description: data.description,
          membersUserIds: allMembers,
          name: data.name,
          photo: data.photo,
          poUserId: data.poUserId,
          scrumUserId: data.scrumUserId,
          startDate: dateToMilliseconds(data.startDate)
        })
      }

      if (projectResponse) {
        if (project) {
          setProjects((prev) =>
            prev?.filter((projectUnit) => projectUnit.code !== project.code)
          )
        }

        setProjects((prev) => {
          if (prev) {
            return [...prev, projectResponse]
          } else {
            return [projectResponse]
          }
        })

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
      setValue('photo', project.photo)

      // const photoFiles = project.photos.map((photoUrl) => ({ name: photoUrl }))
      // setSelectedFiles(photoFiles)
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
            <div className="flex h-full w-full flex-col gap-4  md:w-3/5">
              {/* Picture File  */}
              <div className="h-full gap-2 overflow-x-hidden">
                <h1 className="pb-2 pl-2 text-2xl font-medium">
                  Adicionar Foto
                </h1>
                <label
                  htmlFor="image"
                  className={`flex h-52 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-gray-200 bg-skin-secundary text-skin-muted opacity-100 delay-100 hover:bg-skin-fill md:h-1/2 ${
                    selectedFiles.length !== 0
                      ? 'rounded-b-none border-b-0'
                      : null
                  }`}
                >
                  <ImBlocked className="flex size-2/12" />
                  <p className="font-medium">Área Indisponivel no momento</p>
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                  multiple
                  disabled
                />
                <div className="relative">
                  {selectedFiles.length > 0 ? (
                    <motion.div
                      initial={{ y: '-100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '-100%' }}
                      transition={{ duration: 1, type: 'spring', delay: 0.5 }}
                      className={`relative -z-10 flex h-fit max-h-44 w-[calc(100%)] flex-col gap-3 overflow-y-scroll rounded-b-lg border-2 border-t-0 border-dashed p-4 ${
                        darkMode
                          ? 'bg-skin-skeleton-foreground'
                          : 'border-gray-200 bg-neutral-100'
                      }`}
                    >
                      {selectedFiles.map((file, index) => (
                        <motion.div
                          key={file.name}
                          initial={{ marginLeft: '50px', opacity: 0 }}
                          animate={{ marginLeft: '0px', opacity: 1 }}
                          exit={{ marginLeft: '50px', opacity: 0 }}
                          transition={{
                            duration: 1,
                            delay: 1 + index * 0.2
                          }}
                          className="flex flex-row items-center gap-2 "
                        >
                          <img
                            src={
                              file instanceof File
                                ? URL.createObjectURL(file)
                                : file.name
                            }
                            alt={`Uploaded preview ${index}`}
                            className="max-w-8 rounded"
                          />
                          <p>
                            {file.name.split('.')[0] + '.'}
                            <strong className="text-skin-muted">
                              {file.name.split('.')[1]}
                            </strong>
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : null}
                </div>
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
