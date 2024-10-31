"use client";
import {useEffect, useState} from 'react';
import {GrClose} from 'react-icons/gr';
import GetConst from "@/app/resources/js/Const";
import restApi from "@/app/resources/js/Axios";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    typeList: any[],
    dataJson: any,
    openMode?: string
}

export default function Modal({isOpen, onClose, typeList, dataJson, openMode}: ModalProps) {
    const [data, setData] = useState({
        corporateAddress: "",
        businessItem: "",
        corporateNumber: "",
        corporateMail: "",
        name: "",
        businessStatus: "",
        userType: "USTY_CLNT",
        idx : 0,
        ceo: "",
        userId: "",
        createDate: "",
        password:""
    });

    const handleCreate = () => {
        restApi('post', '/admin/create', {
            userId: data.userId,
            userPw: data.password,
            userType: data.userType,
            name: data.name,
            ceo: data.ceo,
            corporateNumber: data.corporateNumber,
            corporateAddress: data.corporateAddress,
            corporateMail: data.corporateMail,
            businessStatus: data.businessStatus,
            businessItem: data.businessItem,
        }).then(response => {
            // @ts-ignore
            if(response.status === 200) {
                onClose();
            } else {
                alert(response.data)
            }
        });
    }

    const handleModify = () => {
        restApi('post', '/admin/modify', {
            idx: data.idx,
            userType: data.userType,
            name: data.name,
            ceo: data.ceo,
            corporateNumber: data.corporateNumber,
            corporateAddress: data.corporateAddress,
            corporateMail: data.corporateMail,
            businessStatus: data.businessStatus,
            businessItem: data.businessItem,
        }).then(response => {
            // @ts-ignore
            if(response.status === 200) {
                onClose();
            } else {
                alert(response.data)
            }
        });
    }

    const handleDelete = () => {
        restApi('post', '/admin/delete', {
            idx: data.idx,
        }).then(response => {
            // @ts-ignore
            if(response.status === 200) {
                onClose();
            } else {
                alert(response.data)
            }
        });
    }

    useEffect(() => {
        if("M" === openMode){
            if (typeList.length > 0 && dataJson) {
                setData({
                    ...dataJson,
                    userType: GetConst("ustyCode").find((code: any) => code.value === dataJson.userType).key
                })
            }
        }else{
            setData({
                corporateAddress: "",
                businessItem: "",
                corporateNumber: "",
                corporateMail: "",
                name: "",
                businessStatus: "",
                userType: "USTY_CLNT",
                idx : 0,
                ceo: "",
                userId: "",
                createDate: "",
                password:""
            });
        }
    }, [typeList, dataJson, openMode]);

    if (Object.keys(data).length === 0) return null;
    if (!isOpen) return null;

    return (
        <>
            <div className="modal_wrap">
                <div className="modal_header">
                    <span>업체 정보 리스트</span>
                    <GrClose size="22" onClick={(event) => onClose()}/>
                </div>
                <div className="modal_body">
                    <ul>
                        {openMode==="C"?(
                            <>
                                <li>
                                    <label>계정</label>
                                    <input type={"text"} value={data?.userId}
                                           onChange={(event) => setData({...data, userId: event.target.value})}/>
                                </li>
                                <li>
                                    <label>패스워드</label>
                                    <input type={"password"} value={data?.password}
                                           onChange={(event) => setData({...data, password: event.target.value})}/>
                                </li>
                            </>
                        ) : null}
                        {openMode === "M" ? (
                            <li>
                                <label>계정</label>
                                <input type={"text"} className={"read_only"} readOnly value={data?.userId}/>
                            </li>
                        ) : null}
                        <li>
                            <label>업체명</label>
                            <input type={"text"} value={data?.name}
                                   onChange={(event) => setData({...data, name: event.target.value})}/>
                        </li>
                        <li>
                            <label>업체유형</label>
                            <select
                                value={data?.userType}
                                onChange={(event) => {
                                    const newData = {...data, userType: event.target.value};
                                    setData(newData);
                                    console.log(newData);
                                    debugger;
                                }}
                            >
                                {GetConst("ustyCode").map((code: any, index2: number) => (
                                    <option key={index2} value={code.key}>{code.value}</option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <label>대표자</label>
                            <input type={"text"} value={data?.ceo}
                                   onChange={(event) => setData({...data, ceo: event.target.value})}/>
                        </li>
                        <li>
                            <label>사업자등록번호</label>
                            <input type={"text"} value={data?.corporateNumber}
                                   onChange={(event) => setData({...data, corporateNumber: event.target.value})}/>
                        </li>
                        <li>
                            <label>소재지</label>
                            <input type={"text"} value={data?.corporateAddress}
                                   onChange={(event) => setData({...data, corporateAddress: event.target.value})}/>
                        </li>
                        <li>
                            <label>이메일</label>
                            <input type={"text"} value={data?.corporateMail}
                                   onChange={(event) => setData({...data, corporateMail: event.target.value})}/>
                        </li>
                        <li>
                            <label>업태</label>
                            <input type={"text"} value={data?.businessStatus}
                                   onChange={(event) => setData({...data, businessStatus: event.target.value})}/>
                        </li>
                        <li>
                            <label>업종</label>
                            <input type={"text"} value={data?.businessItem}
                                   onChange={(event) => setData({...data, businessItem: event.target.value})}/>
                        </li>
                    </ul>
                </div>
                <div className="modal_foot">
                    {openMode==="C"?(
                        <button type="button" onClick={(event) => handleCreate()}>생성</button>
                    ):null}
                    {openMode==="M"?(
                        <>
                            <button type="button" onClick={(event) => handleModify()}>수정</button>
                            <button type="button" className="disable" onClick={(event) => handleDelete()}>삭제</button>
                        </>
                    ) : null}
                </div>
            </div>
            <div className="modal_bg" onClick={(event) => onClose()}/>
        </>
    );
}