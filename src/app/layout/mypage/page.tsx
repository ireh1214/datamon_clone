
import CommonLayout from "@/app/components/layout/CommonLayout"
import { FaUserCircle } from "react-icons/fa";

export default function Page(){
    return(
        <CommonLayout>
<div className="mypage_wrap">
            <div className="title_box">
                <h2>마이페이지</h2>
            </div>

<div className="name">
<FaUserCircle color="999" size="30" /> <span>드리븐</span> 
</div>

<section className="user_content">
<div>
<p>계정 정보</p>
    <ul>
        <li> 
            <label htmlFor="">이메일</label><input type="text" />
        </li>
        <li> 
            <label htmlFor="">이메일</label><input type="text" />
        </li>
        <li> 
            <label htmlFor="">이메일</label><input type="text" />
        </li>
    </ul>
    <button type="button" className="type1">수정</button>
</div>

<div>
<p>계정 보안</p>
    <ul>
        <li> 
            <label htmlFor="">이메일</label><input type="text" />
        </li>
        <li> 
            <label htmlFor="">이메일</label><input type="text" />
        </li>
        <li> 
            <label htmlFor="">이메일</label><input type="text" />
        </li>
    </ul>
    <button type="button" className="disable">회원탈퇴</button>
</div>
</section>
</div>
        </CommonLayout>
        
    )

}