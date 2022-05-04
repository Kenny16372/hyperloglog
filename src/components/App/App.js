import { useState } from 'react';
import Input from '../Input/Input';
import Output from '../Output/Output';
import './App.css';

var crypto = window.crypto || window.msCrypto;
// if(!crypto.subtle) 
//     console.log("Crypto API not supported!")

const log2Partitions = 8;
const numPartitions = 1 << log2Partitions;

/**
 * Fast hash function with good distribution. At least thats what the guy on StackOverflow who I stole it from says.
 * But it works
 * @param {string} s input
 * @returns {number} hash of input
 */
// eslint-disable-next-line
const TSH=s=>{for(var i=0,h=9;i<s.length;)h=Math.imul(h^s.charCodeAt(i++),9**9);return h^h>>>9}

function App() {
    let [partitions, setPartitions] = useState([]);
    return (
        <div className="app">
            <Input inputChanged={input => hll(input, setPartitions)}></Input>
            <Output partitions={partitions}></Output>
            {javaHash("abcdef", Array(16))}
        </div>
    );
}

function hll(input, setPartitions) {
    const result = Array(numPartitions).fill(0);
    let promises = [];
    // input.split(/[\n ]/).forEach(word => promises.push(hash(word, result)));
    input.split(/[\n ]/).forEach(word => javaHash(word, result));
    Promise.all(promises).then(() => setPartitions(result));
}

/**
 * Slow, but secure hash function. Waaay too slow, and using SHA-1 not even that secure.
 * Using TSH instead (didn't measure, but about 100x speedup)
 * @param {string} word input
 * @param {number[]} partitions The partitions array
 * @returns nothing
 */
// eslint-disable-next-line
function hash(word, partitions) {
    return crypto.subtle.digest("SHA-1", new TextEncoder("utf-8").encode(word))
    .then(buffer => {
        const [partition, leadingZeros] = parseHash(buffer);
        partitions[partition] = Math.max(partitions[partition], leadingZeros);
    })
    .catch(console.log);
}

function parseHash(buffer) {
    const view = new DataView(buffer);

    let offset = 0;
    let value = view.getUint32(offset);
    offset += 4;

    const partition = value >>> (32-log2Partitions);
    let leadingZeros = Math.clz32(value << log2Partitions);

    if(leadingZeros === 32) {
        leadingZeros -= log2Partitions;

        let tmpLeadingZeros = 32;

        while(tmpLeadingZeros === 32 && offset + 4 < buffer.byteLength) {
            value = view.getUint32(offset);
            offset += 4;

            tmpLeadingZeros = Math.clz32(value);
            leadingZeros += tmpLeadingZeros;
        }
    }

    return [log2Partitions ? partition : 0, leadingZeros];
} 

function javaHash(str, partitions) {
    if(!str.length) {
        return;
    }
    let result = TSH(str);

    const partition = result >>> (32-log2Partitions);
    let leadingZeros = Math.clz32(result << log2Partitions);

    partitions[partition] = Math.max(partitions[partition], leadingZeros);
}

export default App;