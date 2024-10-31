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
        contactMail: "",
        name: "",
        contactPhone: "",
        idx : 0,
        role: "",
        userId: "",
        createDate: "",
        password:""
    });

    const handleCreate = () => {
        restApi('post', '/member/create', {
            userId: data.userId,
            pw: data.password,
            name : data.name,
            role : data.role,
            contactPhone : data.contactPhone,
            mail : data.contactMail
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
        restApi('post', '/member/modify', {
            idx: data.idx,
            userId: data.userId,
            pw: data.password,
            name : data.name,
            role : data.role,
            contactPhone : data.contactPhone,
            mail : data.contactMail
        }).then(response => {
            onClose();
            // @ts-ignore
            if(response.status === 200) {
            } else {
                alert(response.data)
            }
        });
    }

    const handleDelete = () => {
        restApi('post', '/member/delete', {
            idx: data.idx,
        }).then(response => {
            onClose();
            // @ts-ignore
            if(response.status === 200) {
            } else {
                alert(response.data)
            }
        });
    }

    useEffect(() => {
        if("M" === openMode){
            if (typeList.length > 0 && dataJson) {
                setData(dataJson)
            }
        }else{
            setData({
                contactMail: "",
                name: "",
                contactPhone: "",
                idx : 0,
                role: "",
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
                            <label>담당자 명</label>
                            <input type={"text"} value={data?.name}
                                   onChange={(event) => setData({...data, name: event.target.value})}/>
                        </li>
                        <li>
                            <label>역할</label>
                            <input type={"text"} value={data?.role}
                                   onChange={(event) => setData({...data, role: event.target.value})}/>
                        </li>
                        <li>
                            <label>연락처</label>
                            <input type={"text"} value={data?.contactPhone}
                                   onChange={(event) => setData({...data, contactPhone: event.target.value})}/>
                        </li>
                        <li>
                            <label>이메일</label>
                            <input type={"text"} value={data?.contactMail}
                                   onChange={(event) => setData({...data, contactMail: event.target.value})}/>
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