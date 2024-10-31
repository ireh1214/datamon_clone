'use client';
import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import "./resources/scss/main/join.scss";
import Loading from "@/app/components/Loading";
import Modal from "./components/layout/user/approval/Modal";
import restApi from "@/app/resources/js/Axios";
import {getSession} from "@/app/resources/js/Session";
import GetConst from "@/app/resources/js/Const";



// 1단계 컴포넌트
const Step1: React.FC<{
  nextStep: () => void,
  signUpData: any,
  setSignUpData: any
}> = ({nextStep, signUpData, setSignUpData}) => {
  const handleNextStep = () => {
    // 모든 필수 입력값을 배열로 관리
    const requiredFields = [
      signUpData.job || "", // 기본값을 빈 문자열로 설정
      signUpData.companyType || "",
      signUpData.representative || "",
      signUpData.location || "",
    ];


    // 모든 필드가 비어 있지 않은지 확인
    // if (requiredFields.some(field => field.trim() === '')) {
    //     alert('필수 입력값을 입력해 주세요.');
    //     return;
    // }
   
    nextStep();
  };

  return (
    <div className="fade">
      <div className="content">
        <div className="input_box">
          <label>업체명*</label>
          <input
            type="text"
            placeholder="업체명을 입력하세요"
            value={signUpData.job}
            onChange={(e) => setSignUpData((signUpData: any) => ({ ...signUpData, job: e.target.value }))}
          />
        </div>
        <div className="input_box">
          <label htmlFor="companyType">업체유형*</label>
          <select
            id="companyType"
            name="companyType"
            value={signUpData.companyType}
            onChange={(e) => setSignUpData((signUpData: any) => ({ ...signUpData, companyType: e.target.value }))}
          >
            <option value="">업체유형을 선택해주세요</option>
              {GetConst("ustyCode").map((code:any) => {
                  let result = null;
                  if(code.key !== 'USTY_MAST') {
                      result = <option value={code.key}>{code.value}</option>;
                  }
                  return result;
              })}
          </select>
        </div>
        <div className="input_box">
          <label>대표자*</label>
          <input
            type="text"
            placeholder="대표자명을 입력하세요"
            value={signUpData.representative}
            onChange={(e) => setSignUpData((signUpData: any) => ({ ...signUpData, representative: e.target.value }))}
          />
        </div>
        <div className="input_box">
          <label>소재지*</label>
          <input
            type="text"
            placeholder="소재지를 입력하세요"
            value={signUpData.location}
            onChange={(e) => setSignUpData((signUpData: any) => ({ ...signUpData, location: e.target.value }))}
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
  //handlePhoneVerifyClick: () => void,
  //isPhoneVerified: boolean,
  signUpData: any,
  setSignUpData: any;
}> = ({
        nextStep,
        prevStep,
        signUpData,
        setSignUpData
      }) => {

        //  handlePhoneVerifyClick,isPhoneVerified,

    const [showVerification, setShowVerification] = useState(false); // 인증 입력 필드를 표시하기 위한 상태
    const [isDuplicate, setIsDuplicate] = useState(true);

    const handleRequestVerification = () => {
      setShowVerification(true); // 인증 요청 버튼 클릭 시 인증번호 입력 필드를 표시
    };

    const duplicateCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
        restApi('post', '/admin/checkIdDuplicate', {
            userId: signUpData.username,
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
      const requiredFields = [
        signUpData.username || "", 
        signUpData.password || "",
        signUpData.email || "",
        signUpData.businessType || "",
        signUpData.industry || "",
      ];
  
  //    모든 필드가 비어 있지 않은지 확인
      if (requiredFields.some(field => field.trim() === '')) {
          alert('필수 입력값을 입력해 주세요.');
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
            <label>이메일*</label>
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              value={signUpData.email}
              onChange={(e) => setSignUpData((signUpData:any) => ({ ...signUpData, email: e.target.value }))}
            />
          </div>
          <div className="input_box">
            <label>업태*</label>
            <input
              type="text"
              placeholder="업태를 입력해주세요"
              value={signUpData.businessType}
              onChange={(e) => setSignUpData((signUpData:any) => ({ ...signUpData, businessType: e.target.value }))}
            />
          </div>
          <div className="input_box">
            <label>업종*</label>
            <input
              type="text"
              placeholder="업종을 입력해주세요"
              value={signUpData.industry}
              onChange={(e) => setSignUpData((signUpData:any) => ({ ...signUpData, industry: e.target.value }))}
            />
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
  //  handleEmailVerifyClick: () => void,
 //   isEmailVerified: boolean,
    signUpData: any,
    setSignUpData: any
}> = ({prevStep, submit, signUpData, setSignUpData}) => {
  // handleEmailVerifyClick, isEmailVerified

  return (
    <div className="fade">
        <div className="content">
            <div className="input_box">
                <label>사업자등록번호*</label>
                <input
                    type="text"
                    placeholder="사업자등록번호를 입력하세요"
                    value={signUpData.BusinessRegistrationNum}
                    onChange={(e) => setSignUpData((signUpData: any) => ({
                        ...signUpData,
                        BusinessRegistrationNum: e.target.value
                    }))}
                />
            </div>
            <div className="input_box">
                <label>신청 사유</label>
                <textarea
                    placeholder="신청 사유"
                    value={signUpData.reason}
                    onChange={(e) => setSignUpData((signUpData: any) => ({...signUpData, reason: e.target.value}))}
                />
            </div>
            {/* <div className="input_box">
          <label>사업자등록증*</label>
          <input
            type="file"
            value={}
          />
        </div> */}
        </div>

        <div className="btn_box">
            <button onClick={prevStep}>이전</button>
            <button onClick={submit}>가입하기</button>
        </div>
    </div>
  );
};

const Page: React.FC = () => {
    const [brn, setBrn] = useState<string>("");  // 입력된 사업자등록번호를 관리
    const [outputMessage, setOutputMessage] = useState<string | null>(null);  // 검색 결과 메시지를 관리, 초기값은 null
    const [showSignUp, setShowSignUp] = useState(false);

    // ------ admin 계정 신청 state
    const [currentStep, setCurrentStep] = useState(1); // 현재 스텝 관리
    const [fadeClass, setFadeClass] = useState("fade"); // 페이드 클래스 관리
    const [signUpData, setSignUpData] = useState({ 
       job: "",
      companyType: "",
      representative: "",
      location: "",
      username:"", 
      password:"",
      email:"",
      businessType:"",
      industry:"",
      BusinessRegistrationNum:"",
      reason:""
 })

 
    const router = useRouter();

    const handleSearch = () => {
        try {
            restApi('get', '/admin/search/brm', {
                corporateNumber:brn
            }).then(response => {
                if(response.status === 200){
                    let tampOutputMessage = process.env.NEXT_PUBLIC_VIEW_BASE_URL+"/"+response.data.companyId+"/login";
                    setOutputMessage(tampOutputMessage);
                }else{
                    setOutputMessage("검색 내용이 없습니다");
                }
            })
        }catch (error) {
            setOutputMessage("검색 내용이 없습니다");
        }
  };

    // ------ admin 계정 신청 start
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

  // // 전화번호 인증 버튼 클릭 핸들러
  // const handlePhoneVerifyClick = () => {
  //   setIsPhoneVerified(true);
  // };

  // // 이메일 인증 버튼 클릭 핸들러
  // const handleEmailVerifyClick = () => {
  //   setIsEmailVerified(true);
  // };

  // 회원가입 제출
  const submit = () => {
      console.log(signUpData)
    if (signUpData.BusinessRegistrationNum.trim() === ''){
      alert('필수값을 입력해 주세요.');
      return;
    }

    try {
        restApi('post', '/admin/reqAccount', {
            userId: signUpData.username,
            userPw: signUpData.password,
            name: signUpData.job,
            userType: signUpData.companyType,
            ceo: signUpData.representative,
            corporateNumber: signUpData.BusinessRegistrationNum,
            corporateAddress: signUpData.location,
            corporateMail: signUpData.email,
            businessStatus: signUpData.businessType,
            businessItem: signUpData.industry,
            requestReason: signUpData.reason,
        }).then(response => {
            // @ts-ignore
            if(response.status === 200){
              router.push(`/complete?username=${encodeURIComponent(signUpData.username)}&name=${encodeURIComponent(signUpData.job)}`)
            }else{
                alert(response.data.detailReason)
            }
        })
    } catch (error){
        console.log(error)
    }
  };


    return (
      <>
      {/* <Modal /> */}
      {!showSignUp ? (
          <div className="admin_search_wrap">
              <div className="title_box">
                  <h3>유효하지 않은 페이지입니다.</h3>
                  <p>사업자등록번호를 통해 올바른 URL을 검색할 수 있습니다.</p>
              </div>

              <div className="search_form">
                  <input
                      type="text"
                      placeholder="사업자등록번호를 입력해주세요"
                      value={brn}
                      onChange={(e) => setBrn(e.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleSearch();
                        }
                    }}
                  />
                  <button type="button" className="type1 search" onClick={handleSearch}>
                      검색
                  </button>
              </div>

              {outputMessage && (
                  <div className="output">
                      {outputMessage === "검색 내용이 없습니다" ? (
                          <>
                          <p style={{ color: "red" }}>{outputMessage}</p>
                          <button type="button" className="type1" onClick={()=>{setShowSignUp(true)}}>admin 가입 요청</button>
                          </>
                      ) : (
                          <Link href={outputMessage}>
                              {outputMessage}
                          </Link>
                      )}
                  </div>
              )}
          </div>
      ) : (
          <div className="signup_wrap">
              <h3 className={`step step${currentStep}`}>회원가입(admin)</h3>
              {currentStep === 1 && (
               <Step1 nextStep={nextStep}
               signUpData={signUpData}
               setSignUpData={setSignUpData}
            />
              )}
              {currentStep === 2 && (
                <Step2
                nextStep={nextStep}
                prevStep={prevStep}
              //  handlePhoneVerifyClick={handlePhoneVerifyClick}
               // isPhoneVerified={isPhoneVerified}
                signUpData={signUpData}
                setSignUpData={setSignUpData}
              />
              )}
              {currentStep === 3 && (
             <Step3
             prevStep={prevStep}
             submit={submit}
           //  handleEmailVerifyClick={handleEmailVerifyClick}
           //  isEmailVerified={isEmailVerified}
             signUpData={signUpData}
             setSignUpData={setSignUpData}
           />
              )}
          </div>
      )}
  </>
    );
};

export default Page;
