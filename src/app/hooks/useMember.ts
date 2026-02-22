import { useContext } from 'react'
import { MemberContext } from '../contexts/member_context'

export const useMember = () => {
  const {
    getMember,
    getAllMembers,
    memberError,
    createStrike,
    createMember,
    updateMember,
    deleteMember,
    isAdmin,
    allMembers,
    handleAllMembers,
    handleMember,
    handleLogout,
    isRegister,
    isOnHold,
    member,
    getAllStrikes
  } = useContext(MemberContext)

  return {
    isRegister,
    isAdmin,
    handleAllMembers,
    handleMember,
    allMembers,
    getMember,
    createStrike,
    createMember,
    updateMember,
    deleteMember,
    getAllMembers,
    memberError,
    isOnHold,
    handleLogout,
    member,
    getAllStrikes
  }
}
