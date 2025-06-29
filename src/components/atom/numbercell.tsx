import type React from "react";
import { formatCompact, formatThousands } from "../../utils/format";
import { useMediaQuery } from "react-responsive";

export interface NumberCellPro {
    value: number;
}

const NumberCell: React.FC<NumberCellPro> = ({ value }) => {
    const isSmall = useMediaQuery({ maxWidth: 768 })
    return (<span>{isSmall ? formatCompact(value) : formatThousands(value)}</span>);
};
export default NumberCell
