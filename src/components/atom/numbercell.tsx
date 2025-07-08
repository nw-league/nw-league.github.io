import type React from "react";
import { formatCompact, formatThousands } from "../../utils/format";
import { useMediaQuery } from "react-responsive";

export type DisplayType = 'number' | 'percent' | 'exponential' | 'engineering';

export interface NumberCellPro {
    value: number;
    className?: string
    display?: DisplayType
}

const NumberCell: React.FC<NumberCellPro> = ({ value, className, display }) => {
    const isSmall = useMediaQuery({ maxWidth: 768 })
    return (<span className={className}>{isSmall ? formatCompact(value) : formatThousands(value)}{display === "percent" && "%"}</span>);
};
export default NumberCell
