import FilterBar, { FilterProps } from '../FilterBar'
import { memberFilterOptions } from './filterOptions.tsx'
import { Users } from 'lucide-react'
import { useContext, useEffect, useMemo, useState } from 'react'
import { MemberContext } from '../../contexts/member_context.tsx'
import { Member } from '../../../@clean/shared/domain/entities/member.ts'
import MemberCard from './components/MemberCard.tsx'
import { stackToEnum } from '../../../@clean/shared/domain/enums/stack_enum.ts'
import { motion } from 'framer-motion'
import { NoActionsFoundComponent } from '../NoDataFoundCard.tsx'
import * as Loader from '../Loader.tsx'
import MemberActionCardSkeleton from './components/MemberCardSkeleton.tsx'
import { millisecondsToHours } from '../../utils/functions/timeStamp.ts'
import { ACTIVE } from '../../../@clean/shared/domain/enums/active_enum.ts'

export default function Members() {
  const [filterProps, setFilterProps] = useState<FilterProps>({})
  const [members, setMembers] = useState<Member[] | undefined>(undefined)
  const [hoursOfTheUserWithMoreHours, setHoursOfTheUserWithMoreHours] =
    useState<number>(0)
  const { getAllMembers } = useContext(MemberContext)

  // Filter Logic
  const filteredMembers = useMemo(() => {
    const membersThatAreNotOnHold = members?.filter(
      (member) => member.active !== ACTIVE.ON_HOLD
    )

    if (
      filterProps.searchText === '' &&
      filterProps.project === '' &&
      filterProps.year === '' &&
      filterProps.role === '' &&
      filterProps.stack === '' &&
      filterProps.orderBy === '' &&
      filterProps.situation === ''
    ) {
      return membersThatAreNotOnHold || []
    }

    let currentMembers: Member[] = membersThatAreNotOnHold || []

    // Search Text Logic
    if (filterProps.searchText !== '' && filterProps.searchText !== undefined) {
      const searchTextLowerCase = filterProps.searchText.toLowerCase()
      currentMembers = currentMembers.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTextLowerCase) ||
          member.ra.toLowerCase().includes(searchTextLowerCase)
      )
    }

    // Projects Filter Logic
    if (filterProps.project) {
      return []
    }

    // Year Filter Logic
    if (filterProps.year) {
      currentMembers = currentMembers.filter(
        (member) => member.year.toString() === filterProps.year
      )
    }

    // Role Filter Logic
    if (filterProps.role) {
      currentMembers = currentMembers.filter(
        (member) => member.role === filterProps.role
      )
    }

    // Area Filter Logic
    if (filterProps.stack) {
      currentMembers = currentMembers.filter(
        (member) => member.stack === stackToEnum(filterProps.stack)
      )
    }

    // OrderBy MORE Filter Logic
    if (filterProps.orderBy === 'MORE') {
      currentMembers.sort((a, b) => (b.hoursWorked || 0) - (a.hoursWorked || 0))
    }

    // OrderBy LESS Filter Logic
    if (filterProps.orderBy === 'LESS') {
      currentMembers.sort((a, b) => (a.hoursWorked || 0) - (b.hoursWorked || 0))
    }

    // Situation Filter Logic
    if (filterProps.situation) {
      currentMembers = currentMembers.filter(
        (member) => member.active === filterProps.situation
      )
    }

    // Set the bigger hours based on the current filter
    const maxHoursWorked = currentMembers.reduce((max, member) => {
      return member.hoursWorked && member.hoursWorked > max
        ? member.hoursWorked
        : max
    }, 0)
    setHoursOfTheUserWithMoreHours(millisecondsToHours(maxHoursWorked))

    return currentMembers
  }, [filterProps, members])

  async function loadMembers() {
    const response = await getAllMembers()
    setMembers(response)
  }

  useEffect(() => {
    loadMembers()
  }, [])

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-2 py-20 pl-0 md:pl-14 lg:py-10">
      <FilterBar
        label={'Membros'}
        icon={Users}
        setFilterProps={setFilterProps}
        filterProps={filterProps}
        filterOptions={memberFilterOptions}
        className={'z-30'}
      />
      <div
        className={`flex h-fit w-10/12 flex-col items-center gap-2  ${
          filteredMembers.length < 10 ? 'h-screen pb-60' : ''
        } `}
      >
        {filteredMembers.length !== 0 ? ( // Determine if the filtered members is empty or not
          filteredMembers.map((member, index) => {
            return (
              <motion.div
                key={index + '' + member.userId}
                initial={{ marginLeft: '50px', opacity: 0 }}
                animate={{ marginLeft: '0px', opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className="w-full"
              >
                <MemberCard
                  key={member.userId}
                  member={member}
                  isWithMostHours={
                    hoursOfTheUserWithMoreHours ===
                    millisecondsToHours(member.hoursWorked || 0) // Compare in hours
                  }
                />
              </motion.div>
            )
          })
        ) : members ? (
          <NoActionsFoundComponent
            message={'Membros não encontrados.'}
            className={'w-full'}
          />
        ) : (
          <Loader.List SkeletonComponent={MemberActionCardSkeleton} />
        )}
      </div>
    </div>
  )
}
