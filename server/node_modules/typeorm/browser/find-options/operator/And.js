import { FindOperator } from "../FindOperator";
export function And(...values) {
    return new FindOperator("and", values, true, true);
}

//# sourceMappingURL=And.js.map
