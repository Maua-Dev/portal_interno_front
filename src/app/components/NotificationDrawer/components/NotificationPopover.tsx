import { Bell } from 'lucide-react'
import { HTMLAttributes, useContext, useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { MemberContext } from '../../../contexts/member_context.tsx'
import { ACTIVE } from '../../../../@clean/shared/domain/enums/active_enum.ts'
import { useDarkMode } from '../../../hooks/useDarkMode.ts'

export default function NotificationPopover({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { allMembers } = useContext(MemberContext)
  const { darkMode } = useDarkMode()
  const [displayedCount, setDisplayedCount] = useState(0)

  const notificationCount = useMemo(() => {
    let totalNotification = 0

    if (allMembers) {
      const memberOnHold = allMembers.filter(
        (member) => member.active === ACTIVE.ON_HOLD
      )
      totalNotification += memberOnHold.length
    }

    return totalNotification
  }, [allMembers])

  // Animate the number increasing/decreasing
  useEffect(() => {
    let count = displayedCount

    if (count !== notificationCount) {
      const increment = notificationCount > count ? 1 : -1
      const interval = setInterval(() => {
        count += increment
        setDisplayedCount(count)

        if (count === notificationCount) {
          clearInterval(interval)
        }
      }, 500) // Adjust speed here
    }
  }, [notificationCount, displayedCount])

  return (
    <div
      className={twMerge(
        'relative h-fit w-fit cursor-pointer',
        props.className
      )}
      {...props}
    >
      <Bell
        className={`hover:text-blue-700 ${
          darkMode ? 'text-white' : 'text-black'
        }`}
      />
      <div
        className={
          'absolute -right-1 -top-1 flex h-4 w-4  flex-row items-center justify-center rounded-full bg-red-600 text-sm text-white'
        }
      >
        {displayedCount}
      </div>
    </div>
  )
}
