import styled from "styled-components"
import { Colors } from "../../style/colors"
import { useState } from "react"
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri"

interface props {
    label?: string
    placeholder?: string
    type?: string
    max?: number
    width?: number
    id?: string
    value?: string | number | undefined
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({
    label,
    placeholder,
    type = "text",
    max,
    width = 250,
    id,
    value,
    onChange,
}: props) {
    const [show, setShow] = useState<Boolean>(false)

    const toggleHandler = () => {
        setShow(!show)
    }

    const formattedValue =
        type === "date" && value && isDate(value)
            ? value.toISOString().slice(0, 10) // 'YYYY-MM-DD' 형식
            : value

    // Date 객체인지 확인하는 함수
    function isDate(value: unknown): value is Date {
        return (
            Object.prototype.toString.call(value) === "[object Date]" &&
            !isNaN(Number(value))
        )
    }

    return (
        <>
            <Container>
                <Label htmlFor={id}>{label}</Label>
                <InputWrapper>
                    <CustomInput
                        type={
                            type == "password"
                                ? show
                                    ? "text"
                                    : "password"
                                : type
                        }
                        placeholder={placeholder}
                        width={width}
                        max={max}
                        min={0}
                        maxLength={max}
                        value={formattedValue}
                        name={id}
                        id={id}
                        onChange={onChange}
                    />

                    {type == "password" && (
                        <IconContainer>
                            <IconWrapper onClick={toggleHandler}>
                                {show ? <RiEyeFill /> : <RiEyeOffFill />}
                            </IconWrapper>
                        </IconContainer>
                    )}
                </InputWrapper>
            </Container>
        </>
    )
}

export default Input

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 10px;
`

const Label = styled.label`
    margin-top: 2px;
    font-size: 14px;
    font-weight: 550;
    color: ${Colors.Gray700};
`

const InputWrapper = styled.div`
    padding: 0 5px;
    border: 1px solid ${Colors.Gray200};
    background: ${Colors.Gray50};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
`

const CustomInput = styled.input`
    width: ${({ width }) => `${width}px`};
    height: 40px;
    background: none;
    border: none;
    outline: none;
    font-size: 14px;

    &::placeholder {
        color: ${Colors.Gray400};
    }

    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`

const IconContainer = styled.div`
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: ceter;
    align-items: center;
`

const IconWrapper = styled.div`
    margin-left: auto;
    margin-right: 5px;
    cursor: pointer;
    display: flex;
    justify-content: end;
    align-items: center;
    font-size: 20px;
    color: ${Colors.Gray500};
    user-select: none;
`

const DateInput = styled.input`
    width: ${({ width }) => `${width}px`};
    height: 40px;
    background: none;
    border: none;
    outline: none;
    font-size: 14px;

    &::placeholder {
        color: ${Colors.Gray400};
    }

    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`
