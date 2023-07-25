import { DefaultButton } from './little_components/Buttons'
import { DisplayHours } from './little_components/DisplayHours'
import { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-between">{children}</div>
  )
}

const Border = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 border-b-2 border-gray-500 py-4 sm:flex-row md:gap-0">
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
      <Border>
        <Components>
          <ProfileSquare
            name={name.charAt(0) + name.charAt(name.indexOf(' ') + 1)}
          />
          <NameComponents>
            <p className="font-bold md:text-xl xl:text-2xl">{`${name.toUpperCase()} (${stack.toUpperCase()})`}</p>
            <p className="text-sm md:text-base xl:text-lg">{`${year.toUpperCase()} / ${course.toUpperCase()}`}</p>
          </NameComponents>
          <DefaultButton label={'Editar'} color={'blue'} />
        </Components>
        <DisplayHours hours="00:00" />
      </Border>
    </Container>
  )
}
