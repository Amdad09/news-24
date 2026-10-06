import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}
const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`max-w-7xl px-6 mx-auto ${className}`}>
        {children}
    </div>
  );
};

export default Container;