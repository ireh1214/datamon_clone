"use client";
import CommonLayout from "../../../../components/layout/CommonLayout";
import CommonDataGrid from "@/app/components/CommonDataGrid";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import { GrClose } from 'react-icons/gr';

// PageProps 타입 정의
interface PageProps {
    params: {
        dynamic: string;
    };
}

// 페이지 컴포넌트
const Page: React.FC<PageProps> = ({ params }) => {
    const { dynamic } = params;
    const router = useRouter();
    const [columns, setColumns] = useState<any[]>([]);
    const [rows, setRows] = useState<any[]>([]);

  const handleOnRowDoubleClick = (idx:any) => {
  }

    useEffect(() => {
        if(dynamic !== 'list'){
            router.push('/home');
        }

    }, []);
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

    <div className="custInfo_wrap">
        <div className="title_box">
            <h2>커스텀 DB관리</h2>
           
        </div>

        <section className="table">
            <CommonDataGrid
                columns={columns}
                rows={rows}
                // downLoadFileName={`고객정보목록_${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`}
                handleRowDoubleClick={handleOnRowDoubleClick}
                useExcelDownload={false}
                useTabFilterButton={false}
                useNewContentButton={true}
            />
        </section>
    </ div>
</CommonLayout>
    )
}

export default Page;