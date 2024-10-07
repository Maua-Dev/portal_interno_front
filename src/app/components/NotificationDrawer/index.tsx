import { Drawer } from 'vaul'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useContext, useEffect, useMemo, useState } from 'react'
import RadioItem from '../RadioItem.tsx'
import { useDarkMode } from '../../hooks/useDarkMode.ts'
import { MemberContext } from '../../contexts/member_context.tsx'
import { ACTIVE } from '../../../@clean/shared/domain/enums/active_enum.ts'
import NoticationMemberCard from './components/NoticationMemberCard.tsx'
import { Member } from '../../../@clean/shared/domain/entities/member.ts'
import NotificationMemberCardSkeleton from './components/NotificationMemberCardSkeleton.tsx'
import * as Loader from '../Loader.tsx'
import { motion } from 'framer-motion'
import NoNotifications from './components/NoNotifications.tsx'

export interface NotificationDrawerProps {
  open: boolean
  openOnChange: (open: boolean) => void
}
export default function NotificationDrawer({
  open,
  openOnChange
}: NotificationDrawerProps) {
  const [radioValue, setRadioValue] = useState<string>('all')
  const { darkMode } = useDarkMode()
  const { allMembers } = useContext(MemberContext)
  const [loading, setLoading] = useState<boolean>(true)

  // Simulate loading logic
  useEffect(() => {
    if (allMembers) {
      setLoading(false)
    }
  }, [allMembers])

  const notificationsContent = useMemo(() => {
    let notifications: any[] = []

    if (allMembers) {
      const memberOnHold = allMembers.filter(
        (member) => member.active === ACTIVE.ON_HOLD
      )
      notifications = notifications.concat(memberOnHold)
    }

    return notifications
  }, [allMembers])

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

  return (
    <Drawer.Root open={open} onOpenChange={openOnChange}>
      <Drawer.Trigger></Drawer.Trigger>
      <Drawer.Content
        className={`z-60 fixed bottom-0 left-3 right-3 z-50  h-[80%] rounded-t pt-4 shadow-2xl shadow-black outline-none sm:left-auto sm:right-10 sm:w-[400px] ${
          darkMode ? 'bg-[#202020]' : 'bg-skin-secundary'
        }`}
      >
        <div
          className={
            'mx-auto h-2 w-20 rounded-full bg-skin-skeleton-foreground'
          }
        />
        <div
          className={
            'flex flex-col gap-4 border-b border-skin-muted px-8 pb-6 pt-3'
          }
        >
          <Drawer.Title
            className={'text-2xl font-bold text-skin-base sm:text-lg'}
          >
            Notificações
          </Drawer.Title>
          <RadioGroup.Root
            defaultValue={'all'}
            value={radioValue}
            onValueChange={setRadioValue}
            className={'flex flex-row justify-start gap-2'}
          >
            <RadioItem
              radioValue={radioValue}
              value={'all'}
              label={'Todas'}
              number={notificationCount}
            />
            <RadioItem
              radioValue={radioValue}
              value={'members'}
              label={'Membros'}
            />
          </RadioGroup.Root>
        </div>
        <div className={'flex h-full flex-col gap-1 overflow-y-auto p-2 pb-48'}>
          {loading ? (
            // Show loader while loading
            <Loader.Notification
              SkeletonComponent={NotificationMemberCardSkeleton}
            />
          ) : notificationsContent && notificationsContent.length > 0 ? (
            // Display notifications if available
            notificationsContent.map((notificationContent, index) => {
              if (notificationContent instanceof Member) {
                return (
                  <motion.div
                    key={notificationContent.userId}
                    initial={{ marginTop: '50px', opacity: 0 }}
                    animate={{ marginTop: '0px', opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.3 }}
                    className="flex w-full justify-center"
                  >
                    <NoticationMemberCard member={notificationContent} />
                  </motion.div>
                )
              }
            })
          ) : (
            // Show NoNotifications component when no notifications are found
            <NoNotifications />
          )}
        </div>
      </Drawer.Content>
    </Drawer.Root>
  )
}
