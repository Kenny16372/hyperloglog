export default function LinkInput(props) {
    return (
        <input type="text"
            placeholder="Paste any link here"
            disabled={props.disabled}
            onChange={e=>props.onChange(e.target.value)}
        />
    );
}