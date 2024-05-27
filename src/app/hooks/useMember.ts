import { useContext, useState } from 'react'
import { MemberContext } from '../contexts/member_context'
import { useNavigate } from 'react-router-dom'

export const useMember = () => {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)

  const {
    getMember,
    getAllMembers,
    memberError,
    createMember,
    updateMember,
    deleteMember,
    isAdmin,
    allMembers,
    handleAllMembers
  } = useContext(MemberContext)

  const handleMember = async () => {
    try {
      await getMember()
    } catch (error: any) {
      if (error.message.toLowerCase().includes('no items found')) {
        setIsRegister(true)
      } else {
        navigate('/login')
      }
    }
  }

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
