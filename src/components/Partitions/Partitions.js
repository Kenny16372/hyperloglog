import './Partitions.css';

function Partitions(props) {
    return (
        <div className="partitions"
        >
            {props.partitions?.filter(p => !!p).map((partition, idx) => {
                return (
                <div
                    key={idx}
                    className="partition"
                    title={Math.pow(2, partition.maxLeadingZeros)}
                    style={{height: partition.maxLeadingZeros + 'em'}}
                >
                </div>
                );
            })}
        </div>
    )
}

export default Partitions;