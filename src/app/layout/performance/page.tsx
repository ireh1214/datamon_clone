"use client";

import React, { useEffect, useState } from "react";
import BarTypeChart from "../../components/chart/BarTypeChart";
import LineBarTypeChart from "../../components/chart/LineBarTypeChart";
import RadarTypeChart from "../../components/chart/RadarTypeChart"
import AreaTypeChart from "../../components/chart/AreaTypeChart"
import BarBrushTypeChart from "../../components/chart/BarBrushTypeChart";
import CommonLayout from "../../components/layout/CommonLayout";
import restApi from "@/app/resources/js/Axios";
import CommonDatepicker from "@/app/components/CommonDatepicker";
import GetConst from "@/app/resources/js/Const";

export default function Page() {
    const [dbList, setDbList] = useState([]);
    const [selectedDbType, setSelectedDbType] = useState("init");
    const [selectedDb, setSelectedDb] = useState("init");
    
    // const getDataList = () => {
    //     try{
    //         restApi('get', '/custInfo/list', {
    //             custDBType:selectedDbType,
    //             custDBCode:selectedDb,
    //         })
    //     }catch (error){
    //         // @ts-ignore
    //         router.push('/' + getSession("companyName") + '/login');
    //     }
    // }
    
    // useEffect(() => {
    //     if(selectedDb !== "init"){
    //         getDataList()
    //     }
    // }, [selectedDb]);

    const setDate = (startDate: Date | undefined, endDate: Date | undefined) => {
console.log("setDate")
        }
    

    return (
    <CommonLayout>
<div className="performance_wrap">
<div className="title_box">
            <h2>매체별 수집 통계</h2>
            <div>
                <select defaultValue="init" onChange={(event) => {
                    const selectedValue = event.target.value.split('|');
                    setSelectedDbType(selectedValue[0]);
                    setSelectedDb(selectedValue[1]);
                }}>
                    <option value="init" disabled>
                        DB선택
                    </option>
                    {dbList.map((dbType: any) => (
                        <optgroup key={dbType.custDbType} label={GetConst("dbTypeList")[dbType.custDbType]}>
                            {dbType.custDbCodeList.map((db: any) => (
                                <option key={db.key} value={`${dbType.custDbType}|${db.key}`}>
                                    {db[db.key]}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            </div>
        </div>
<section>
{/* <RadarTypeChart /> */}
{/* <BarBrushTypeChart /> */}
<div>
<div className="chart_title">
<h4>월별 실적통계</h4>
<select name="months" id="month-select">
      {Array.from({ length: 12 }, (_, index) => (
        <option key={index} value={index + 1}>
          {index + 1}월
        </option>
      ))}
    </select>
</div>
<BarTypeChart />    
</div>

</section>
<section>
<div>
<div className="chart_title">
<h4>선택형 실적통계(주간)</h4>
<CommonDatepicker setDate={setDate}/>
</div>
<p>초기엔 금주 날짜로 지정됩니다.</p>
<LineBarTypeChart />
</div>
<div>

<AreaTypeChart />

</div>
</section>
</div>
   </CommonLayout>
  );
}
