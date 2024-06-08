import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "styled-components";

import Button from "~/components/common/Button";
import ChatBubble from "~/components/Auth/ChatBubble";
import Input from "~/components/Auth/Input";

import KidImage from "~/assets/img/Auth/kid.png";
import ParentImage from "~/assets/img/Auth/parent.png";
import CompleteImage from "~/assets/img/Auth/complete.png";

const Signup = () => {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    phoneNum: "",
    accountInfo: "",
    birthDate: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (role) => {
    setUserData({
      ...userData,
      role: role,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    // TODO: 폼 제출 로직 추가
    setStep(5);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Container>
      <FormWrapper>
        {step === 0 && (
          <StepWrapper>
            <ChatBubble text="안녕! 이름이 뭐예요?" />
            <RightAlignedDiv>
              <Input type="text" name="name" value={userData.name} onChange={handleChange} />
            </RightAlignedDiv>
          </StepWrapper>
        )}
        {step === 1 && (
          <StepWrapper>
            <ChatBubble text="전화번호를 알려주세요!" />
            <RightAlignedDiv>
              <Input type="text" name="phoneNum" value={userData.phoneNum} onChange={handleChange} />
            </RightAlignedDiv>
          </StepWrapper>
        )}
        {step === 2 && (
          <StepWrapper>
            <ChatBubble text="비밀번호를 알려주세요!" />
            <RightAlignedDiv>
              <Input type="password" name="accountInfo" value={userData.accountInfo} onChange={handleChange} />
            </RightAlignedDiv>
          </StepWrapper>
        )}
        {step === 3 && (
          <StepWrapper>
            <ChatBubble text="생년월일을 알려주세요!" />
            <RightAlignedDiv>
              <Input type="date" name="birthDate" value={userData.birthDate} onChange={handleChange} width="100px" />
            </RightAlignedDiv>
          </StepWrapper>
        )}
        {step === 4 && (
          <StepWrapper tw="justify-center mb-40">
            <Label>어떤 서비스를 이용하고 싶으신가요?</Label>
            <ButtonGroup>
              <RoleWrapper>
                <RoleButton role="아이" onClick={() => handleRoleChange("아이")}>
                  <img src={KidImage} alt="아이" />
                </RoleButton>
                아이
              </RoleWrapper>
              <RoleWrapper>
                <RoleButton role="부모" onClick={() => handleRoleChange("부모")}>
                  <img src={ParentImage} alt="부모" />
                </RoleButton>
                부모
              </RoleWrapper>
            </ButtonGroup>
          </StepWrapper>
        )}
        {step === 5 && (
          <StepWrapper tw="justify-center mb-40">
            <CompleteWrapper>
              <img src={CompleteImage} alt="완료" />
              <Label>가입 완료!</Label>
            </CompleteWrapper>
          </StepWrapper>
        )}

        <ButtonWrapper>
          {step < 4 ? (
            <Button onClick={handleNext} text="다음">
              다음
            </Button>
          ) : step === 4 ? (
            <Button onClick={handleSubmit} text="제출">
              제출
            </Button>
          ) : (
            step === 5 && (
              <Button onClick={handleLoginRedirect} text="로그인 하러 가기">
                로그인 하러 가기
              </Button>
            )
          )}
        </ButtonWrapper>
      </FormWrapper>
    </Container>
  );
};

export default Signup;

const Container = tw.div`
  flex
  justify-center
  h-screen
`;

const FormWrapper = styled.div`
  ${tw`flex
  flex-col
  w-80
  gap-5
  rounded-[15px]
  h-full
  relative`}
  height: calc(100% - 60px);
`;

const StepWrapper = styled.div`
  ${tw`flex flex-col flex-grow`}
`;

const RightAlignedDiv = styled.div`
  ${tw`self-end`}
`;

const Label = tw.label`
  flex
  text-lg
  font-bold
  justify-center
  m-5
`;

const ButtonWrapper = styled.div`
  ${`flex
  justify-between
  mt-4`}
`;

const ButtonGroup = tw.div`
  flex
  gap-9
  
  justify-center
`;

const RoleWrapper = tw.div`
  flex
  flex-col
  gap-2
  items-center
  justify-center
`;

const RoleButton = styled.button`
  ${tw`w-28 h-[120px] rounded-[15px]`}
  ${({ role }) => (role === "아이" ? tw`bg-[#FFCE70] opacity-50` : tw`bg-[#70D4FF] opacity-50`)}
  &:hover {
    ${tw`opacity-80`}
  }
`;

const CompleteWrapper = tw.div`
  flex
  flex-col
  gap-2
  items-center
  justify-center
`;
