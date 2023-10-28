import React from "react";
import { Icons, IconNames } from "./Icons";

interface IconProperties {

    className?: string;
    
    viewBox?: string;

    title?: string;

    style?: any;

    role?: string;
    
    fill?: string;
    
    stroke?: string;

    strokeWidth?: string

    strokeLinecap?: "butt" | "round" | "square" | "inherit" | undefined;

    strokeLinejoin?: "miter" | "round" | "bevel" | "inherit" | undefined;

    size?: string | number;

    name: IconNames;
}

const Icon: React.FC<IconProperties> = ({ viewBox, title, size, name, stroke, strokeWidth, strokeLinecap, strokeLinejoin, ...props }) => (
    <svg width={size} height={size} viewBox={viewBox} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} {...props}>
        {title &&
            <title>{title}</title>
        }
        {Icons[name]()}
    </svg>
);

Icon.defaultProps = {
    viewBox: "0 0 24 24",
    size: "20px",
    role: "img",
    fill: "none",
    strokeWidth: "2px",
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

export default Icon;