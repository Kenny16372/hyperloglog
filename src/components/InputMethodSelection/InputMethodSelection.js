import "./InputMethodSelection.css";

export default function InputMethodSelection(props) {
    return (
        <div className="selectInputMethod">
            <input type="radio"
                id="textRadio"
                value="text"
                name="selectInputMethod"
                defaultChecked
                onChange={e=>props.onChange(e.target.value)}
            />
            <label htmlFor="textRadio">Use Textarea</label>
            <input type="radio"
                id="linkRadio"
                name="selectInputMethod"
                value="link"
                onChange={e=>props.onChange(e.target.value)}
            />
            <label htmlFor="linkRadio">Use Link</label>
        </div>
    );
}