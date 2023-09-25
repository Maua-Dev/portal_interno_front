import { DefaultButton } from './little_components/Buttons'
import { Card } from './little_components/Card'
import { Form } from './little_components/Form'
import { PopUp } from './little_components/PopUp'
import SearchIcon from '@mui/icons-material/Search'

interface MemberPopupProps {
  isOpen: boolean
}

export function MemberPopup({ isOpen }: MemberPopupProps) {
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
              />
              <div className="flex flex-row justify-between gap-3">
                <Card.Title textStyle="blue">MEMBROS</Card.Title>
                {/* <input
                  type="text"
                  placeholder="&#xF002; BUSCAR MEMBRO"
                  className="w-8/12 rounded-sm border border-zinc-500 pl-2 placeholder-shown:pl-10"
                ></input> */}
                <Form.IconTextField
                  text="BUSCAR MEMBROS"
                  icon={<SearchIcon className="text-zinc-500" />}
                />
              </div>
            </Card.Header>
            <Card.Body className="h-60 overflow-y-scroll pr-14">
              <Card.ListCell title="Vitor Soller" subTitle="RA:12.34567-8" />
              <Card.ListCell title="Vitor Soller" subTitle="RA:12.34567-8" />
              <Card.ListCell title="Vitor Soller" subTitle="RA:12.34567-8" />
              <Card.ListCell title="Vitor Soller" subTitle="RA:12.34567-8" />
              <Card.ListCell title="Vitor Soller" subTitle="RA:12.34567-8" />
              <Card.ListCell title="Vitor Soller" subTitle="RA:12.34567-8" />
            </Card.Body>
          </Card.Root>
        </PopUp>
      ) : null}
    </div>
  )
}
