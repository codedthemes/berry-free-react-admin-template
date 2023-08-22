import { FindOperator } from "../FindOperator";
/**
 * FindOptions Operator.
 * Example: { someField: JsonContains({...}) }
 */
export function JsonContains(value) {
    return new FindOperator("jsonContains", value);
}

//# sourceMappingURL=JsonContains.js.map
