'use client';
import { useState } from "react";
import CommonLayout from "@/app/components/layout/CommonLayout";
import { GrClose } from 'react-icons/gr';

export default function Page() {
    const [activeTab, setActiveTab] = useState("중복제거 칼럼 설정");

    const renderTabContent = () => {
        switch (activeTab) {
            case "중복제거 칼럼 설정":
                return (
                    <div className="duplication">
                        <h4>중복제거 칼럼 설정</h4>
                        <ul className="duplication_list">
                            <li> <span>255.000.000.0</span></li>
                            <li> <span>255.000.000.0</span></li>
                        </ul>
                    </div>
                );
            case "IP차단":
                return (
                    <div className="ip">
                        <h4>IP차단 목록</h4>
                    <div className="input_box">
                    <input type="text" placeholder="ip" /><button type="button" className="type1">생성</button><button type="button" className="type2">일괄복사</button>
                    </div>
                        <ul className="ip_list">
                            <li> <span>255.000.000.0</span> <GrClose size="10" /> </li>
                            <li> <span>255.000.000.0</span> <GrClose size="10" /> </li>
                        </ul>
                    </div>
                );
            case "키워드차단":
                return (
                    <div className="keyword">
                        <h4>키워드 차단 목록</h4>
                    <div className="input_box">
                    <input type="text" placeholder="키워드를 입력하세요" /><button type="button" className="type1">생성</button>
                    </div>
                        <ul className="keyword_list">
                            <li> <span>안녕</span> <GrClose size="10" /> </li>
                            <li> <span>test</span> <GrClose size="10" /> </li>
                        </ul>
                    </div>
                );
            case "페이지설정":
            return(
                <div className="pagesetting">
                        <h4>페이지 설정</h4>
                      <ul className="pagesetting_list">
                        <li>
                            <p>title</p>
                            <input type="text" placeholder="title" />
                        </li>
                        <li>
                            <p>description</p>
                            <textarea name="" id=""></textarea>
                        </li>
                        <li>
                            <p>head</p>
                            <textarea name="" id=""></textarea>
                        </li>
                        <li>
                            <p>body</p>
                            <textarea name="" id=""></textarea>
                        </li>

                      </ul>
                      <div className="btn_box">
                <button type="button" className="type1">저장</button>
    </div>
                </div>
            )
           
                default:
                return null;
        }
    };

    return (
        <CommonLayout>

{/* <div className="modal">
<div className="modal_wrap copy_ver">
<div className="modal_header">
                    <span>IP차단 목록 복사</span>
                    <GrClose size="22" />
                </div>
<div>
<select name="" id="">
    <option value="">ddd</option>
    <option value="">dddd</option>
</select>
<button type="button" className="type1">확인</button>
</div>
</div>
<div className="modal_bg"></div>
</div> */}


{/* <div className="modal">
<div className="modal_wrap copy_ver2">
<div className="modal_header">
                    <span>중복제거 정보</span>
                    <GrClose size="22" />
                </div>
    <div className="modal_body">
    <div className="left">
        <p>컬럼정보</p>
    <ul>
        <li>    
        <input type="checkbox" />
        <p>text</p>
        </li>
        <li>    
        <input type="checkbox" />
        <p>text</p>
        </li>
    </ul>
    </div>
    <div className="right">
    <p>처리 프로세스</p>
    <ul>
        <li>    
        <input type="checkbox" />
        <p>전처리</p>
        </li>
        <li>    
        <input type="checkbox" />
        <p>후처리</p>
        </li>
    </ul>
    </div>
    </div>
<div className="modal_foot">
    <div className="btn_box">
        <button type="button" className="type1">수정</button>
        <button type="button" className="type3">삭제</button>
        <button type="button" className="type1">생성</button>
    </div>
</div>
</div>
<div className="modal_bg"></div>
</div> */}

            {/* modal end */}
            <div className="landing_detail_wrap">
                <div className="title_box">
                    <h2>랜딩 페이지 - detail</h2>
                </div>
        <section className="tab_wrap">
        <ul className="tab_menu">
                    {["중복제거 칼럼 설정", "IP차단", "키워드차단", "페이지설정"].map((tab) => (
                        <li 
                            key={tab} 
                            onClick={() => setActiveTab(tab)}
                            className={activeTab === tab ? "on" : ""}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            <div className="tab_value">
            {renderTabContent()}
            </div>
        </section>
        </div>
        </CommonLayout>
    );
}
