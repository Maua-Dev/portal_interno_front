import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { DefaultButton } from './little_components/Buttons'
import { Card } from './little_components/Card'
import { Form } from './little_components/Form'
import { PopUp } from './little_components/PopUp'
import SearchIcon from '@mui/icons-material/Search'
import { Member } from '../../@clean/shared/domain/entities/member'
import { ActionContext } from '../contexts/action_context'

interface MemberPopupProps {
  isOpen: boolean
  closePopUp: () => void
  setMembers: Dispatch<SetStateAction<string[] | undefined>>
}

export function MemberPopup({
  isOpen,
  closePopUp,
  setMembers
}: MemberPopupProps) {
  const [allMembers, setAllMembers] = useState<Member[] | undefined>()

  const { getAllMembers, setRaMembersSelected } = useContext(ActionContext)

  const raSelectedArray: string[] = []

  const handleMembersChange = (e: any) => {
    raSelectedArray.push(e.target.value)
  }

  const handleSumbitMembers = () => {
    console.log(raSelectedArray)
    setRaMembersSelected(raSelectedArray)
    closePopUp()
  }

  async function fetchData() {
    try {
      const response = await getAllMembers()
      if (response) {
        setAllMembers(response)
      }
    } catch (error: any) {
      console.log('Error getting all members: ' + error)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {isOpen ? (
        <PopUp closePopUp={closePopUp}>
          <Card.Root size="base" isPopUp>
            <Card.Header columns="single" className="space-y-3 border-none">
              <DefaultButton
                label="SALVAR"
                color="blue"
                className="ml-auto px-5"
                onClick={handleSumbitMembers}
              />
              <div className="flex flex-row justify-between gap-3">
                <Card.Title textStyle="blue">MEMBROS</Card.Title>
                <Form.IconTextField
                  text="BUSCAR MEMBROS"
                  icon={<SearchIcon className="text-zinc-500" />}
                />
              </div>
            </Card.Header>
            <Card.Body className="h-60 overflow-y-scroll pr-14">
              {allMembers?.map((member, index) => {
                return (
                  <Card.ListCell
                    key={index}
                    title={member.name}
                    subTitle={member.ra}
                    value={member.ra}
                    onChange={handleMembersChange}
                    // checked={raMembersSelected?.includes(member.ra)}
                  />
                )
              })}
            </Card.Body>
          </Card.Root>
        </PopUp>
      ) : null}
    </div>
  )
}
