
interface LayoutProps {
  children: React.ReactNode;
}

const Modal: React.FC<LayoutProps> = ({ children }) => {
  return (
<div>
{children}
</div>
  );
};

export default Modal;
