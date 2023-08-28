const UnfocusedBG = ({
  handleLeave,
  z_number
}: {
  handleLeave: () => void
  z_number: string
}) => {
  return (
    <div
      onClick={handleLeave}
      className={
        'fixed bottom-0 left-0 right-0 top-0 h-full w-screen bg-black opacity-50 min-[950px]:hidden ' +
        z_number
      }
    />
  )
}

export { UnfocusedBG }
