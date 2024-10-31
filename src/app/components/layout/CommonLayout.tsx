import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode; // children의 타입을 지정 (React.ReactNode는 렌더링 가능한 모든 타입)
}

const CommonLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="wrap">
    <Sidebar />
<div className='content'>
{children}
</div>
    </div>
  );
};

export default CommonLayout;