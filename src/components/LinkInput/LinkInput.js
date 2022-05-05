import "./LinkInput.css";

export default function LinkInput(props) {
    return (
        <input type="text"
            className="linkInput"
            placeholder="Paste any link here"
            disabled={props.disabled}
            onChange={e=>props.onChange(e.target.value)}
        />
    );
}