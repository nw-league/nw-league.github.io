type Operator = 'AND' | 'OR'

export function joinCondition(values: string[], operator: Operator, column: string): string {
    return values.map(val => `${column}='${val}'`).join(` ${operator} `);
}
