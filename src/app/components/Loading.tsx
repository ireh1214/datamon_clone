import { RingLoader } from "react-spinners";

export default function Loading(){
    return(
        <div className="loading_wrap">
            <RingLoader
                color="#2281FF"
                loading
                size={70}
                speedMultiplier={1}
            />
            <div className="loading_bg" />
        </div>
    )
}