"use client";
import CommonLayout from "../../../components/layout/CommonLayout";
import Modal from "../../../components/layout/user/Modal";
import CommonDataGrid from "@/app/components/CommonDataGrid";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getSession} from "@/app/resources/js/Session";
import restApi from "@/app/resources/js/Axios";


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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectRow, setSelectRow] = useState();
    const [openMode, setOpenMode] = useState("C");

  // 모달 열기 함수
    const openModal = (mode:String) => {
        // @ts-ignore
        setOpenMode(mode)
        setIsModalOpen(true);
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setIsModalOpen(false);
        getDataList()
    };

    const handleOnRowDoubleClick = (idx:any) => {
        setSelectRow(rows.find((row:any) => row.idx===idx));
        openModal("M")
    }

    const handleNewContentButtonClick = () => {
        openModal("C")
    }


    const getDataList = () => {
        try {
            restApi('get', '/member/list', {}).then(response => {
                // @ts-ignore
                if(response.status === 200){
                    setColumns(response.data.columnInfoList)
                    setRows(response.data.dataList)
                }else{
                    alert(response.data)
                }
            })
        }catch (error) {
            // @ts-ignore
            router('/' + getSession("companyName") + '/login');
        }
    }

    useEffect(() => {
        if(dynamic !== 'list'){
            router.push('/home');
        }

        if(!["USTY_DEVL", "USTY_MAST", "USTY_CLNT", "USTY_ADAC", "USTY_CRAC"].includes(getSession("userType") as string)){
            router.push('/home');
        }

        getDataList()
    }, []);
    return (
<CommonLayout>
 <Modal isOpen={isModalOpen} onClose={closeModal} typeList={columns} dataJson={selectRow} openMode={openMode}/>

{/* ---- */}

    <div className="custInfo_wrap">
        <div className="title_box">
            <h2>사용자 계정 목록</h2>
           
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
                handleNewContentButtonClick={handleNewContentButtonClick}
            />
        </section>
    </ div>
</CommonLayout>
    )
}

export default Page;