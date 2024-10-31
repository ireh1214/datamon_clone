'use client'
import React, { useState, useEffect } from 'react';
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaMarker } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { TbBeta } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { BsArrowLeftShort } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { MdManageSearch } from "react-icons/md";
import Link from 'next/link'
import "../../resources/scss/main/sidebar.scss";
import { getSession } from '@/app/resources/js/Session';
import { FaDatabase } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

export default function Sidebar(){
    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const [isActive4, setIsActive4] = useState(false);
    const [isActive6, setIsActive6] = useState(false);
    const [custInfoUrl, setCuseInfoUrl] = useState("");
    const [userType, setUserType] = useState("");

    
    useEffect(()=>{
        switch (getSession('userType')) {
            case 'USTY_MAST': //master 어드민 계정
                setCuseInfoUrl("");
                break; 
            case 'USTY_DEVL': // 개발자 계정
                setCuseInfoUrl("/client/custInfo/list");
                break; 
             case 'USTY_INME': // 마스터 직원 계정
                setCuseInfoUrl("");
                break; 
            case 'USTY_CLNT': // 클라이언트 어드민 계정
                setCuseInfoUrl("/client/custInfo/list");
                break; 
            case 'USTY_CLME': // 클라이언트 직원 계정
                setCuseInfoUrl("/client/custInfo/list");
                break; 
             case 'USTY_ADAC': // 광고 에이전시 어드민 계정
                setCuseInfoUrl("/ad/custInfo/list");
                break; 
            case 'USTY_AAME': // 광고 에이전시 직원 계정
                setCuseInfoUrl("/ad/custInfo/list");
                break; 
            case 'USTY_CRAC': // CRM 어드민 계정
                setCuseInfoUrl("/crm/custInfo/list");
                break; 
            case 'USTY_CAME': // CRM 직원 계정
                setCuseInfoUrl("");
                break; 
        }
    },[userType])

    useEffect(()=>{
        if(!!getSession('userType')){
            // @ts-ignore
            setUserType(getSession('userType'));
        }
    },[])

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
          alert("로그아웃되었습니다.");
          // 여기에서 실제 로그아웃 로직 추가해주세요
        }
      };

    return (
<nav className={ isActive1 ? 'min' : ''}>
<h1><Link href="/home">DATAMON</Link></h1>
<i className="right_toggle" onClick={() => setIsActive1(!isActive1)}><BsArrowLeftShort color="fff" size="26" />arrow</i>
<div className="nav_wrap">
    <ul className="gnb">
        <li className="mli" ><Link  href="/mypage"> <FaRegNoteSticky size="20" /> 마이페이지</Link></li>

        {["USTY_INME","USTY_CLME","USTY_CRAC","USTY_CAME"].includes(userType) ? null : (
            <li className={`mli ${isActive3 ? 'on' : ''}`} onClick={() => setIsActive3(!isActive3)}><PiUserListBold
                size="20"/>사용자 관리 <IoIosArrowDown/>
                <ul>
                    {["USTY_MAST","USTY_DEVL"].includes(userType) ? (
                        <li><Link href={"/admin/approval/list"}>admin 계정 신청 목록</Link></li>) : null}
                    <li><Link href={"/user/approval/list"}>사용자 계정 신청 목록</Link></li>
                    {["USTY_MAST","USTY_DEVL"].includes(userType) ? (<li><Link href={"/admin/list"}>admin 계정 목록</Link></li>) : null}
                    <li><Link href={"/user/list"}>사용자 계정 목록</Link></li>
                    {/*<li>고객DB 매핑 요청 승인</li>*/}
                </ul>
            </li>
        )}
       <li className={`mli ${isActive4 ? 'on' : ''}`}     onClick={() => setIsActive4(!isActive4)} > <FaDatabase size="20" /> 고객DB 관리 <IoIosArrowDown  />
            <ul>
                <li><Link href="/customer/landing/list">랜딩페이지 DB관리</Link></li>
                <li><Link href="/customer/custom/list">커스텀 DB관리</Link></li>
            </ul>
        </li>
        {["USTY_MAST", "USTY_INME", "USTY_CAME"].includes(userType) ? null : (
            <li className={`mli ${isActive6 ? 'on' : ''}`} onClick={() => setIsActive6(!isActive6)}>
                <MdManageSearch size="20"/> 고객정보 목록 <IoIosArrowDown/>
                <ul>
                    <li><Link href={custInfoUrl}>고객정보 목록</Link></li>
                    {/* <li>고객DB별 이력</li>
                    {/* <li>고객DB 삭제</li> */}
                </ul>
            </li>
        )}




        <li className={`mli ${isActive2 ? 'on' : ''}`}   onClick={() => setIsActive2(!isActive2)} ><IoStatsChart size="20" /> 실적 통계 <IoIosArrowDown />
           <ul>
               <li> <Link href="/performance">고객정보 수집실적</Link></li>
           </ul>
        </li>
       {/*   <li className="mli"> <RiCustomerService2Fill  size="20" />고객센터</li> */}
    </ul>
    <div className='logout' onClick={handleLogout}> <MdLogout/> <span>로그아웃</span> </div>
</div>
</nav>
    )
}