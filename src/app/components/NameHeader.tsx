import { DisplayHours } from './little_components/DisplayHours'
import { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-40 mt-40 flex flex-row items-center justify-between border-b-2 border-gray-500 py-4">
      {children}
    </div>
  )
}

const Components = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row items-center justify-center gap-10">
      {children}
    </div>
  )
}

const ProfileSquare = ({ name }: { name: string }) => {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-t from-red-400 to-pink-500 text-4xl font-bold text-white">
      {name}
    </div>
  )
}

const EditButton = () => {
  return (
    <button className="h-8 rounded-full border-2 border-blue-600 px-8">
      Editar
    </button>
  )
}

const NameComponents = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>
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
          <p className="text-2xl font-bold">{`${name.toUpperCase()} (${stack.toUpperCase()})`}</p>
          <p className="text-lg">{`${year.toUpperCase()} / ${course.toUpperCase()}`}</p>
        </NameComponents>
        <EditButton />
      </Components>
      <DisplayHours hours="00:00" />
    </Container>
  )
}
