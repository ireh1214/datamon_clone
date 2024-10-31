'use client';
import {useEffect, useState} from "react";
import {GrClose} from 'react-icons/gr';
import restApi from "@/app/resources/js/Axios";
import {getSession} from "@/app/resources/js/Session";

interface ModalProps {
    onClose: () => void,
    isOpen?: boolean,
    idx?: any
}

export default function ApprovalCompleteModal({onClose, isOpen, idx}: ModalProps) {
    //onClose는 아직 작동 안합니다 pages에서 꺼내다 closeModal로 이어써야함 

    const [step, setStep] = useState(1);
    const [rejectReason, setRejectReason] = useState("");

    const handleComplete = () => {
        try {
            restApi('post', '/admin/account/approve', {
                idx:idx
            }).then(response => {
                // @ts-ignore
                if(response.status === 200){
                    alert(response.data.message)
                }else{
                    alert(response.data.detailReason)
                }
                onClose();
            })
        }catch (error) {
            // @ts-ignore
            router('/' + getSession("companyName") + '/login');
        }
    };

    const handleReject = () => {
        setStep(2);
    };
    const handleStepEndComplete = () => {

        if (rejectReason.trim() === "") {
            alert("반려 사유를 반드시 입력해야 합니다.");
            return;
        }

        try {
            restApi('post', '/admin/account/reject', {
                idx:idx,
                rejectionReason:rejectReason
            }).then(response => {
                // @ts-ignore
                if(response.status === 200){
                    alert(response.data.message)
                }else{
                    alert(response.data.detailReason)
                }
                onClose();
            })
        }catch (error) {
            // @ts-ignore
            router('/' + getSession("companyName") + '/login');
        }
    }

    useEffect(() => {
        setStep(1)
        setRejectReason("");
    }, [idx]);

    if (!isOpen) return null;
    if (!idx) return null;
    return (
        <>
            <div className="modal_wrap type2">
                <GrClose size="22" onClick={(event) => onClose()}/>
                {step === 1 ? (
                    <div className="step1">
                        <p>승인을 완료하시겠습니까?</p>
                        <div className="btn_box">
                            <button type="button" onClick={handleComplete}>
                                완료
                            </button>
                            <button type="button" onClick={handleReject}>
                                반려
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="step2">
                        <p>* 반려 사유를 입력하여 주세요.</p>
                        <textarea
                            name="rejectReason"
                            id="rejectReason"
                            placeholder="반려 사유"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                        ></textarea>

                        <div className="btn_box">
                            <button type="button" onClick={() => {
                                setStep(1)
                            }}>
                                뒤로
                            </button>
                            <button type="button" onClick={handleStepEndComplete}>
                                반려
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="modal_bg"></div>
        </>
    );
}
