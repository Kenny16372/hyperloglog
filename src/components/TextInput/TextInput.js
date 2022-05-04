export default function TextInput(props) {
    return (
        <textarea
        className="textInput"
        name="textInput"
        placeholder="Insert text"
        disabled={props.disabled}
        onChange={e=>props.onChange(e.target.value)}
        />
    )
}