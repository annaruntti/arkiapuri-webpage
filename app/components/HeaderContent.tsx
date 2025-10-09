import { ReactNode } from "react";

interface HeaderContentProps {
  children: ReactNode;
}

export function HeaderContent({ children }: HeaderContentProps) {
  return (
    <div className="absolute bottom-28 right-5 md:right-20 z-10 animate-fade-in-up">
      <div className="bg-white/90 p-8 rounded-lg shadow-lg max-w-2xl ml-5 md:ml-0">
        {children}
      </div>
    </div>
  );
}
