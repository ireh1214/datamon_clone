"use client";
import {useEffect, useState} from 'react';
import { GrClose } from 'react-icons/gr';
import GetConst from "@/app/resources/js/Const";
import restApi from "@/app/resources/js/Axios";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    typeList: any[];
    dataJson: any;
}

export default function Modal({ isOpen, onClose, typeList, dataJson }: ModalProps) {
    const [currentData, setCurrentData] = useState<any>({
        custInfoIdx: dataJson?.idx,
        dataList: []
    });

    useEffect(() => {
        if(typeList.length > 0 && dataJson) {
            const newDataList = typeList.map((item: any) => {
                const value = dataJson ? dataJson[item?.key] : null;
                if(item?.key === "cdbsCode"){
                    return {
                        key: item?.key,
                        value: GetConst("cdbsCode").find((data:any) => {return data.value === value}).key,
                        columnType: item.columnType,
                        filterType: item.filterType,
                        name: item.name
                    };
                }
                return {
                    key: item?.key,
                    value: value,
                    columnType: item.columnType,
                    filterType: item.filterType,
                    name: item.name
                };
            });
            setCurrentData({
                custInfoIdx: dataJson?.idx,
                dataList: newDataList
            });
        }
    }, [typeList, dataJson]);

    const handleChange = (key: string, value: any) => {
        setCurrentData((prevState: any) => {
            const updatedDataList = prevState.dataList.map((data: any) => {
                if (data.key === key) {
                    return { ...data, value: value };
                }
                return data;
            });
            return { ...prevState, dataList: updatedDataList };
        });
    };

    const handleModify = () => {
        restApi('post', '/custInfo/modify', currentData).then(response => {
            // @ts-ignore
            if(response.status === 200) {
            } else {
                alert(response.data)
            }
            onClose();
        });
    }

    const handleDelete = () => {
        restApi('post', '/custInfo/delete', {
            custInfoIdx: dataJson?.idx,
        }).then(response => {
            // @ts-ignore
            if(response.status === 200) {
            } else {
                alert(response.data)
            }
            onClose();
        });
    }

    if(!dataJson) return null;
    if (!isOpen) return null;

    return (
        <>
            <div className="modal_wrap">
                <div className="modal_header">
                    <span>업체 정보 리스트</span>
                    <GrClose size="22" onClick={(event) => onClose()} />
                </div>
                <div className="modal_body">
                    <ul>
                        {currentData.dataList.map((item: any, index: number) => {
                            let inputComponent;

                            switch (item.filterType) {
                                case "text":
                                    inputComponent = (
                                        <li key={index}>
                                            <label>{item.name}</label>
                                            {item.key === "memo" ? (
                                                <textarea
                                                    value={item.value}
                                                    onChange={(event) => handleChange(item.key, event.target.value)}
                                                    placeholder='메모를 입력하세요'
                                                />
                                            ) : item.key === "ip" ? (
                                                <input
                                                    type="text"
                                                    className='read_only'
                                                    value={item.value}
                                                    readOnly
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={item.value}
                                                    onChange={(event) => handleChange(item.key, event.target.value)}
                                                />
                                            )}
                                        </li>
                                    );
                                    break;
                                case "select":
                                    inputComponent = (
                                        <li key={index}>
                                            <label>{item.name}</label>
                                            <select
                                                defaultValue={item.value}
                                                onChange={(event) => {
                                                    const selectedValue = event.target.value;
                                                    handleChange(item.key, selectedValue);
                                                }}
                                            >
                                                {GetConst("cdbsCode").map((code: any, index2: number) => (
                                                    <option key={index2} value={code.key}>{code.value}</option>
                                                ))}
                                            </select>
                                        </li>
                                    );
                                    break;
                                case "date":
                                    inputComponent = (
                                        <li key={index}>
                                            <label>{item.name}</label>
                                            <div>{item.value.replace("T", " ") || ""}</div>
                                        </li>
                                    );
                                    break;
                                default:
                                    break;
                            }
                            return inputComponent;
                        })}
                    </ul>
                </div>
                <div className="modal_foot">
                    <button type="button" onClick={(event) => handleModify()}>수정</button>
                    <button type="button" className="disable" onClick={(event) => handleDelete()}>삭제</button>
                </div>
            </div>
            <div className="modal_bg" onClick={(event) => onClose()} />
        </>
    );
}