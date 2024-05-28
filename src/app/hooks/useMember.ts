import { useContext } from 'react'
import { MemberContext } from '../contexts/member_context'

export const useMember = () => {
  const {
    getMember,
    getAllMembers,
    memberError,
    createMember,
    updateMember,
    deleteMember,
    isAdmin,
    allMembers,
    handleAllMembers,
    isRegister,
    handleMember
  } = useContext(MemberContext)

  return {
    isRegister,
    isAdmin,
    handleMember,
    handleAllMembers,
    allMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember,
    getAllMembers,
    memberError
  }
}
