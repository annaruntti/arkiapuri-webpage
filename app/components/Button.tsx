import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-block font-medium text-center transition-colors duration-200";

  const variantStyles = {
    primary:
      "bg-primary text-black hover:bg-primary-dark shadow-md rounded-[25px] py-[10px] px-[16px] my-[10px]",
    secondary:
      "bg-secondary text-black hover:bg-secondary-dark shadow-md rounded-[25px] py-[10px] px-[16px] my-[10px]",
    tertiary:
      "bg-tertiary text-black hover:bg-tertiary-dark shadow-md rounded-[25px] py-[10px] px-[16px] my-[10px]",
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
