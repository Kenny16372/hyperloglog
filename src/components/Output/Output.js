import Partitions from "../Partitions/Partitions";
import './Output.css';

function Output(props) {
    console.log(props);
    return (
        <div className="output"
        >
            <Partitions partitions={props.partitions}></Partitions>
            <h3>Approximate number of elements: {approxNumElements(props.partitions)}</h3>
        </div>
    )
}
/**
 * Approximates the number of total elements based on the partitions.
 * For an in-depth explanation, visit {@link https://en.wikipedia.org/wiki/HyperLogLog Wikipedia}
 * @param {number[]} partitions The max number of leading zeros per partition
 * @returns {number} The approximated number of distinct elements
 */
function approxNumElements(partitions) {
    const numPartitions = partitions.length;
    if(!numPartitions) {
        return 0;
    }
    const inverse = partitions.map(p=>Math.pow(2, -p));
    const inverseSum = inverse.reduce((acc, val) => acc + val);
    return Math.round(estimateAlphaM(numPartitions) * numPartitions*numPartitions / inverseSum);
}
/**
 * Estimate alpha_m based on the number of partitions.
 * alpha_m is a constant that is introduced to account for hash collisions.
 * Source: {@link https://en.wikipedia.org/wiki/HyperLogLog#Practical_considerations Wikipedia}
 * @param {number} numPartitions - the number of partitions
 * @returns {number} an approximation for alpha_m
 */
function estimateAlphaM(numPartitions) {
    return 1.;
    const log2Partitions = Math.round(Math.log2(numPartitions));
    if(log2Partitions <= 4)
        return .673;
    if(log2Partitions === 5)
        return .697;
    if(log2Partitions === 6)
        return .709;
    else
        return .7213/(1+1.079/log2Partitions);
}

export default Output;