'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import "../../../../resources/scss/main/join.scss";

export default function Page() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const usernameParam = queryParams.get('username');
        const nameParam = queryParams.get('name');

        if (usernameParam) setUsername(usernameParam);
        if (nameParam) setName(nameParam);
    }, []);

    return (
        <div className='signup_complete_wrap'>
            <div>
                <h3>회원가입이 완료되었습니다!</h3>
                <p>모든 회원가입 절차가 완료되었습니다.</p>
                <p>담당자의 승인 후 로그인이 가능합니다.</p>
            </div>

            <ul>
                <li><span>이름</span><span>{name}</span></li>
                <li><span>아이디</span><span>{username}</span></li>
            </ul>
            {/* <button type="button" onClick={()=>{router.push('/login')}}>로그인 화면으로</button> */}
        </div>
    );
}