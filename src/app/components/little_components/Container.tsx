const ContainerMainCards = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-10 flex flex-row">{children}</div>
}

const ContainerActivitiesHistory = ({
  children
}: {
  children: React.ReactNode
}) => {
  return <div className="mr-6 flex flex-col">{children}</div>
}

export { ContainerMainCards, ContainerActivitiesHistory }
