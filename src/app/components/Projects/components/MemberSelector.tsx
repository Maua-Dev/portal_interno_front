import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../Historic/components/Popover'
import { CircleOff } from 'lucide-react'
import { ThemeContext } from '../../../contexts/theme_context'
import { Member } from '../../../../@clean/shared/domain/entities/member'
import { MemberContext } from '../../../contexts/member_context'
import Button from '../../Historic/components/Button'
import { STACK } from '../../../../@clean/shared/domain/enums/stack_enum'

interface MemberSelectorProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string
  objectParameter: string
  setValue: any
  getValue: any
}

export default function MemberSelector({
  label,
  objectParameter,
  setValue,
  getValue,
  ...props
}: MemberSelectorProps) {
  const [popUp, setPopUp] = useState<boolean>(false)
  const [inputWidth, setInputWidth] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>('')
  const { darkMode } = useContext(ThemeContext)
  const { allMembers } = useContext(MemberContext)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOpenPopUp = (event: React.MouseEvent<HTMLInputElement>) => {
    setInputValue('')
    setValue(objectParameter, '')
    setPopUp(true)
    event.preventDefault()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    setValue(objectParameter, '')
  }

  const filteredMembers: Member[] | undefined = useMemo(() => {
    const businessMembers = allMembers?.filter(
      (member) => member.stack === STACK.BUSINESS
    )

    if (inputValue === '') {
      return businessMembers
    }

    let filterMembersList: Member[] | undefined = businessMembers

    const searchTextLowerCase = inputValue.toLowerCase()
    filterMembersList = filterMembersList?.filter((member) =>
      member.name.toLowerCase().includes(searchTextLowerCase)
    )

    return filterMembersList
  }, [inputValue])

  useEffect(() => {
    if (popUp && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
        setInputWidth(inputRef.current?.offsetWidth || 0)
      }, 0)
    }
  }, [popUp])

  // useEffect(() => {
  //   console.log(getValue(objectParameter))
  // }, [getValue(objectParameter)])

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label} className="text-xl font-medium">
        {label}
      </label>
      <Popover open={popUp} onOpenChange={setPopUp}>
        <PopoverTrigger asChild>
          <input
            {...props}
            ref={inputRef}
            type="text"
            placeholder="Selecione o membro"
            onChange={handleInputChange}
            value={inputValue}
            onClick={handleOpenPopUp}
            className={`rounded ${
              darkMode ? 'bg-gray-600' : 'bg-gray-300'
            } px-2 py-1 outline-none`}
          />
        </PopoverTrigger>
        <PopoverContent className={`p-1`}>
          {filteredMembers?.length !== 0 ? (
            <div
              style={{ width: `${inputWidth}px` }}
              className={`h-fit max-h-52 overflow-y-scroll`}
            >
              {filteredMembers?.map((member) => {
                return (
                  <Button
                    key={member.userId}
                    onClick={() => {
                      setPopUp(false)
                      setInputValue(member.name)
                      setValue(objectParameter, member.userId)
                    }}
                    variant={'default'}
                    className="justify-start py-1 font-medium"
                  >
                    {member.name.split(' ')[0] +
                      ' ' +
                      (member.name.split(' ')[1] !== undefined
                        ? member.name.split(' ')[
                            member.name.split(' ').length - 1
                          ]
                        : '')}
                  </Button>
                )
              })}
            </div>
          ) : (
            <div
              style={{ width: `${inputWidth}px` }}
              className="flex h-52 flex-col items-center justify-center"
            >
              <CircleOff />
              <p>Membro não encontrado!</p>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
