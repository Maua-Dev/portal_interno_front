import { useContext, useEffect, useState } from 'react'
import { DefaultButton } from './little_components/Buttons'
import { Card } from './little_components/Card'
import { Form } from './little_components/Form'
import { PopUp } from './little_components/PopUp'
import SearchIcon from '@mui/icons-material/Search'
import { Member } from '../../@clean/shared/domain/entities/member'
import { ActionContext } from '../contexts/action_context'

interface MemberPopupProps {
  isOpen: boolean
}

export function MemberPopup({ isOpen }: MemberPopupProps) {
  const [allMembers, setAllMembers] = useState<Member[] | undefined>()

  const { getAllMembers } = useContext(ActionContext)

  async function fetchData() {
    try {
      const response = await getAllMembers()
      if (response) {
        console.log(response)
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
        <PopUp>
          <Card.Root size="base" isPopUp>
            <Card.Header columns="single" className="space-y-3 border-none">
              <DefaultButton
                label="SALVAR"
                color="blue"
                className="ml-auto px-5"
                onClick={fetchData}
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
