import React from "react";
import { cn } from "@/lib";

interface Props {
    className?: string;
    children: React.ReactNode;
}

const Wrapper = ({ children, className }: Props) => {
    return (
        <div
            className={cn(
                "w-full mx-auto  lg:mx-auto px-4 md:px-14",
                className
            )}
        >
            {children}
        </div>
    )
};

export default Wrapper
