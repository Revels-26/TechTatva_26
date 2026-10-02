import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: never;
  type?: never;
}

interface ClickButtonProps extends BaseProps {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  target?: never;
  rel?: never;
}

type ButtonProps = LinkButtonProps | ClickButtonProps;

const sizeClasses: Record<Size, string> = {
  sm: "px-5 py-3 text-[10px] tracking-[1.2px] gap-2",
  md: "px-6 py-4 text-[11px] tracking-[1.32px] gap-2.5",
  lg: "px-8 py-5 text-[12px] tracking-[1.44px] gap-3",
};

const variantClasses: Record<Variant, string> = {
  primary: "bg-[#f0f7ff] text-[#022554] shadow-[0_4px_16px_rgba(2,37,84,0.15)] hover:bg-white",
  secondary:
    "bg-[rgba(240,247,255,0.04)] text-[#f0f7ff] border border-[rgba(181,240,255,0.6)] hover:bg-[rgba(240,247,255,0.08)]",
  ghost: "text-[#b5f0ff] hover:text-white",
};

const Button = ({
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
  href,
  target,
  rel,
  onClick,
  type = "button",
}: ButtonProps) => {
  const classes = `inline-flex items-center justify-center rounded-full font-label font-normal uppercase transition-all duration-300 hover:scale-[1.03] ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
      {icon}
    </button>
  );
};

export default Button;
