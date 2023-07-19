import { DisplayHours } from './little_components/DisplayHours'
import { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-10 mt-40 flex flex-col items-center justify-between gap-4 border-b-2 border-gray-500 py-4 sm:flex-row md:mx-40 md:gap-0">
      {children}
    </div>
  )
}

const Components = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      {children}
    </div>
  )
}

const ProfileSquare = ({ name }: { name: string }) => {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-t from-red-400 to-pink-500 font-bold text-white md:h-12 md:w-12 md:rounded-2xl md:text-xl xl:h-16 xl:w-16 xl:text-4xl">
      {name}
    </div>
  )
}

const EditButton = () => {
  return (
    <button className="hidden h-6 rounded-full border-2 border-blue-600 px-4 text-xs lg:block xl:h-8 xl:px-7 xl:text-base">
      Editar
    </button>
  )
}

const NameComponents = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col">{children}</div>
}

export default function NameHeader({
  name,
  course,
  year,
  stack
}: {
  name: string
  course: string
  year: string
  stack: string
}) {
  return (
    <Container>
      <Components>
        <ProfileSquare
          name={name.charAt(0) + name.charAt(name.indexOf(' ') + 1)}
        />
        <NameComponents>
          <p className="font-bold md:text-xl xl:text-2xl">{`${name.toUpperCase()} (${stack.toUpperCase()})`}</p>
          <p className="text-sm md:text-base xl:text-lg">{`${year.toUpperCase()} / ${course.toUpperCase()}`}</p>
        </NameComponents>
        <EditButton />
      </Components>
      <DisplayHours hours="00:00" />
    </Container>
  )
}
