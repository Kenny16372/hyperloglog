import './Partitions.css';

function Partitions(props) {
    return (
        <div className="partitions"
        >
            {props.partitions?.map((partition, idx) => {
                return (
                <div
                    key={idx}
                    className="partition"
                    title={Math.pow(2, partition)}
                    style={{height: partition + 'em'}}
                >
                </div>
                );
            })}
        </div>
    )
}

export default Partitions;