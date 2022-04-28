import Partitions from "../Partitions/Partitions";
import './Output.css';

function Output() {
    const numPartitions = 64;
    const partitions = Array.from(Array(numPartitions)).map(() => ({maxLeadingZeros: Math.floor(Math.random()*10)}));
    
    return (
        <div className="output"
        >
            <Partitions partitions={partitions}></Partitions>
            <h3>Approximate number of elements: {approxNumElements(partitions)}</h3>
        </div>
    )
}

function approxNumElements(partitions) {
    console.log(partitions);
    const inverse = partitions.map(p=>1./Math.pow(2,p.maxLeadingZeros));
    console.log(inverse);
    const inverseSum = inverse.reduce((acc, val) => acc + val);
    console.log(inverseSum);
    return 1./inverseSum;
}

export default Output;