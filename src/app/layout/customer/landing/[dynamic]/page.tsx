"use client";
import CommonLayout from "../../../../components/layout/CommonLayout";
import CommonDataGrid from "@/app/components/CommonDataGrid";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";


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
    <div className="custInfo_wrap">
        <div className="title_box">
            <h2>랜딩페이지 DB 관리</h2>
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