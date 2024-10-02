import FilterBar, { FilterProps } from '../FilterBar'
import { memberFilterOptions } from './filterOptions.tsx'
import { Users } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { MemberContext } from '../../contexts/member_context.tsx'
import { Member } from '../../../@clean/shared/domain/entities/member.ts'
import MemberCard from './components/MemberCard.tsx'

export default function Members() {
  const [filterProps, setFilterProps] = useState<FilterProps>({})
  const [members, setMembers] = useState<Member[]>([])
  const { getAllMembers } = useContext(MemberContext)

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
        className={'hover:z-30'}
      />
      <div
        className={`z-10 flex h-fit w-full flex-col items-center gap-2 pb-60`}
      >
        {members.map((member) => {
          return <MemberCard key={member.userId} member={member} />
        })}
      </div>
    </div>
  )
}
