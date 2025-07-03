import type { DataType } from "../services/googlesheets";

export type QueryOperator = "=" | "<" | ">" | "<=" | ">=" | "<>" | 'IS NOT';
export const Qop: Record<string, QueryOperator> = {
    Eq: '=',
    Neq: '<>',
    Lt: '<',
    Lte: '<=',
    Gt: '>',
    Gte: '>=',
    Not: 'IS NOT',
}
export interface QueryParameter {
    column: string;
    fn: QueryOperator;
    value: DataType;
}
