import { ReactNode } from "react";

interface HeaderContentProps {
  children: ReactNode;
  isFrontPage?: boolean;
}

export function HeaderContent({
  children,
  isFrontPage = true,
}: HeaderContentProps) {
  const bottomClass = isFrontPage ? "" : "bottom-16";

  return (
    <div
      className={`absolute ${bottomClass} left-5 right-5 md:left-auto md:right-20 z-10 animate-fade-in-up`}
      style={isFrontPage ? { bottom: "9rem" } : {}}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white/90 p-8 rounded-lg shadow-lg max-w-2xl ml-0 md:ml-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
