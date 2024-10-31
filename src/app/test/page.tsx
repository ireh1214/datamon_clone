'use client'

import {useRef, useState} from "react";

export default function Test( ){
    const [stateNumber, setStateNumber] = useState(0)
    const refNumber = useRef(0);

    return(
        <div>
            <div>
                state Number : {stateNumber}
                <button type={"button"} onClick={event => (setStateNumber(stateNumber+1))}>state +</button>
            </div>
            <div>
                ref Number : {refNumber.current}
                <button type={"button"} onClick={event => {refNumber.current = refNumber.current+1}}>ref + </button>
            </div>
        </div>
    );
}