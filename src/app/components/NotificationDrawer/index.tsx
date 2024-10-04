import { Drawer } from 'vaul'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useContext, useMemo, useState } from 'react'
import RadioItem from '../RadioItem.tsx'
import { useDarkMode } from '../../hooks/useDarkMode.ts'
import { MemberContext } from '../../contexts/member_context.tsx'
import { ACTIVE } from '../../../@clean/shared/domain/enums/active_enum.ts'
import NoticationMemberCard from './components/NoticationMemberCard.tsx'
import { Member } from '../../../@clean/shared/domain/entities/member.ts'
import NotificationMemberCardSkeleton from './components/NotificationMemberCardSkeleton.tsx'
import * as Loader from '../Loader.tsx'
import { motion } from 'framer-motion'

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

  const notificationsContent = useMemo(() => {
    let notifications: any[] = []

    if (allMembers) {
      const memberOnHold = allMembers.filter(
        (member) => member.active === ACTIVE.ON_HOLD
      )
      notifications = memberOnHold
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
      {/*<Drawer.Overlay className="fixed inset-0 z-50 bg-black/20" />*/}
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
        <div>
          {notificationsContent && notificationsContent.length > 0 ? (
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
            <Loader.Notification
              SkeletonComponent={NotificationMemberCardSkeleton}
            />
          )}
        </div>
      </Drawer.Content>
    </Drawer.Root>
  )
}
