'use client';
import React, {useEffect, useRef, useState} from "react";
import restApi from "@/app/resources/js/Axios";
import {getSession} from "@/app/resources/js/Session";
import { useRouter } from 'next/navigation';
import "../../../resources/scss/main/join.scss";

// 1단계 컴포넌트
const Step1: React.FC<{
  nextStep: () => void,
  signUpData: any,
  setSignUpData: any
}> = ({nextStep, signUpData, setSignUpData}) => {

  const handleNextStep = () => {
      if (signUpData.job.trim() === '' || signUpData.name.trim() === '') {
          alert('필수 입력값을 입력해 주세요.');
          return;
      }
   
    nextStep();
  };

  return (
    <div className="fade">
      <div className="content">
        <div className="input_box">
          <label>직무*</label>
          <input
            type="text"
            placeholder="직무를 입력하세요"
            value={signUpData.job}
            onChange={(e) => setSignUpData((signUpData:any) => ({ ...signUpData, job: e.target.value }))}
          />
        </div>
        <div className="input_box">
          <label>이름*</label>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={signUpData.name}
            onChange={(e) => setSignUpData((signUpData:any) => ({ ...signUpData, name: e.target.value }))}
          />
        </div>
        <div className="input_box">
          <label>신청 사유</label>
          <textarea
            placeholder="신청 사유"
            value={signUpData.reason}
            onChange={(e) => setSignUpData((signUpData:any) => ({ ...signUpData, reason: e.target.value }))}
          />
        </div>
      </div>
      <button className="type1" onClick={handleNextStep}>다음</button>
    </div>
  );
};


// 2단계 컴포넌트
const Step2: React.FC<{
  nextStep: () => void,
  prevStep: () => void,
  handlePhoneVerifyClick: () => void,
  isPhoneVerified: boolean,
  signUpData: any,
  setSignUpData: any;
}> = ({
        nextStep,
        prevStep,
        handlePhoneVerifyClick,
        isPhoneVerified,
        signUpData,
        setSignUpData
      }) => {
    const [showVerification, setShowVerification] = useState(false); // 인증 입력 필드를 표시하기 위한 상태
    const [isDuplicate, setIsDuplicate] = useState(true);

    const handleRequestVerification = () => {
      setShowVerification(true); // 인증 요청 버튼 클릭 시 인증번호 입력 필드를 표시
    };


    const duplicateCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
        restApi('post', '/member/checkIdDuplicate', {
            userId: signUpData.username,
            companyId: getSession("companyIdx"),
        }).then(response => {
            // @ts-ignore
            const btn = e.target as HTMLButtonElement;
            if (response.status !== 200) {
                alert(response.data);
                btn.innerText = '중복체크';
                btn.style.backgroundColor = '#727272';
                setIsDuplicate(true);
            } else {
                alert(response.data.message);
                btn.innerText = '체크완료';
                btn.style.backgroundColor = '#2281FF';
                setIsDuplicate(false);
            }
        })


    };

    const handleNextStep = () => {
        if (signUpData.username.trim() === '' || signUpData.password.trim() === '') {
            alert('아이디와 비밀번호는 필수 입력값입니다.');
            return;
        }
        if(isDuplicate){
          alert('아이디 중복체크를 완료하여 주세요.');
          return;
        }
      nextStep();
    };



    return (
      <div className="fade">
        <div className="content">
          <div className="input_box">
            <label>아이디*</label>
              <div>
              <input
              type="text"
              placeholder="영어 소문자 및 숫자"
              value={signUpData.username}
              onChange={(e) => setSignUpData((signUpData:any) => ({ ...signUpData, username: e.target.value }))}
            />
              <button type="button" className="usernameBtn" onClick={duplicateCheck}>중복체크</button>
            </div>

            <p>{signUpData.username ? '' : '아이디를 입력해주세요'}</p>
          </div>
          <div className="input_box">
            <label>비밀번호*</label>
            <input
              type="password"
              placeholder="영어, 숫자, 특수문자"
              value={signUpData.password}
              onChange={(e) => setSignUpData((signUpData:any) => ({ ...signUpData, password: e.target.value }))}
            />
            <p>{signUpData.password.length > 0 ? '사용 가능한 비밀번호입니다' : ''}</p>
          </div>
          <div className="input_box">
            <label>연락처*</label>
            <div>
              <input type="number" placeholder="숫자만 입력하세요"  value={signUpData.phone}
                     onChange={(e) => setSignUpData((signUpData:any) => ({ ...signUpData, phone: e.target.value }))}
              />
              {/* <button type="button" onClick={handleRequestVerification}>인증 요청</button> */}
            </div>
            {/* {showVerification && ( // 인증번호 입력 필드를 조건부로 렌더링
              <div>
                <input type="number" placeholder="인증번호를 입력하세요"/>
                <button type="button" onClick={handlePhoneVerifyClick}>전화번호 확인</button>
              </div>
            )}
            {isPhoneVerified && <p>휴대폰 인증번호가 확인되었습니다</p>} */}
          </div>
        </div>

        <div className="btn_box">
          <button onClick={prevStep}>이전</button>
          <button onClick={handleNextStep}>다음</button>
        </div>
      </div>
    );
  };




// 3단계 컴포넌트
const Step3: React.FC<{
    prevStep: () => void,
    submit: () => void,
    handleEmailVerifyClick: () => void,
    isEmailVerified: boolean,
    signUpData: any,
    setSignUpData: any
}> = ({prevStep, submit, handleEmailVerifyClick, isEmailVerified, signUpData, setSignUpData}) => {
  return (
    <div className="fade">
      <div className="content">
        <div className="input_box">
          <label>이메일*</label>
          <div>
            <input type="email" placeholder="이메일 주소를 입력하세요"
            value={signUpData.email}
            onChange={(e) => setSignUpData((signUpData:any) => ({ ...signUpData, email: e.target.value }))}
             />
            {/* <button type="button">인증번호 요청</button> */}

          </div>
          {/* <div>
            <input type="text" placeholder="이메일 인증 키를 입력하세요" />
            <button type="button" onClick={handleEmailVerifyClick}>확인</button>
          </div>
          {isEmailVerified && <p>이메일 인증번호가 확인되었습니다</p>} */}
        </div>
      </div>

      <div className="btn_box">
        <button onClick={prevStep}>이전</button>
        <button onClick={submit}>가입하기</button>
      </div>
    </div>
  );
};

// 회원가입 마스터 컴포넌트
const SignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1); // 현재 스텝 관리
  const [fadeClass, setFadeClass] = useState("fade"); // 페이드 클래스 관리
  const [signUpData, setSignUpData] = useState({ job: '', name: '', reason: '', username:'', password:'', phone:'010', email:'' })
  // 전화번호 인증 상태
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  // 이메일 인증 상태
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const router = useRouter();

  // 다음 스텝으로 이동
  const nextStep = () => {
    setFadeClass(""); // 페이드 아웃 처리 (필요 시)
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setFadeClass("fade");
    }, 50);
  };

  // 이전 스텝으로 이동
  const prevStep = () => {
    setFadeClass("");
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1);
      setFadeClass("fade");
    }, 50);
  };

  // 전화번호 인증 버튼 클릭 핸들러
  const handlePhoneVerifyClick = () => {
    setIsPhoneVerified(true);
  };

  // 이메일 인증 버튼 클릭 핸들러
  const handleEmailVerifyClick = () => {
    setIsEmailVerified(true);
  };

  // 회원가입 제출
  const submit = () => {
    if (signUpData.email.trim() === ''){
      alert('이메일을 입력해 주세요.');
      return;
    }

    try {
        restApi('post', '/member/reqAccount', {
            userId: signUpData.username,
            userPw: signUpData.password,
            companyId: getSession("companyIdx"),
            name: signUpData.name,
            role: signUpData.job,
            contactPhone: signUpData.phone,
            contactMail: signUpData.email,
            requestReason: signUpData.reason
        }).then(response => {
          //  debugger
            // @ts-ignore
            if(response.status === 200){
              router.push(`/join/signup/complete?username=${encodeURIComponent(signUpData.username)}&name=${encodeURIComponent(signUpData.name)}`)

            }else{
                alert(response.data.detailReason)
            }
        })
    } catch (error){
        console.log(error)
    }

    // alert("회원가입 완료!");
  };

  return (
    <div className="signup_wrap">
      <h3 className={`step step${currentStep}`}>회원가입</h3>
      {currentStep === 1 &&
        <Step1 nextStep={nextStep}
         signUpData={signUpData}
         setSignUpData={setSignUpData}
      />}
      {currentStep === 2 && (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          handlePhoneVerifyClick={handlePhoneVerifyClick}
          isPhoneVerified={isPhoneVerified}
          signUpData={signUpData}
          setSignUpData={setSignUpData}
        />
      )}
      {currentStep === 3 && (
        <Step3
          prevStep={prevStep}
          submit={submit}
          handleEmailVerifyClick={handleEmailVerifyClick}
          isEmailVerified={isEmailVerified}
          signUpData={signUpData}
          setSignUpData={setSignUpData}
        />
      )}
    </div>
  );
};

export default SignUp;
