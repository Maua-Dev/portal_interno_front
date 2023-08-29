const ContainerMainCards = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-10 flex w-full flex-col lg:w-auto xl:flex-row">
      {children}
    </div>
  )
}

const ContainerActivitiesHistory = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="mb-8 flex w-full flex-col xl:mb-0 xl:mr-6 xl:w-auto">
      {children}
    </div>
  )
}

export { ContainerMainCards, ContainerActivitiesHistory }
