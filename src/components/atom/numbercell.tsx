import type React from "react";
import { formatCompact, formatThousands } from "../../utils/format";
import { useMediaQuery } from "react-responsive";

export interface NumberCellPro {
    value: number;
    className?: string
}

const NumberCell: React.FC<NumberCellPro> = ({ value, className }) => {
    const isSmall = useMediaQuery({ maxWidth: 768 })
    return (<span className={className}>{isSmall ? formatCompact(value) : formatThousands(value)}</span>);
};
export default NumberCell
