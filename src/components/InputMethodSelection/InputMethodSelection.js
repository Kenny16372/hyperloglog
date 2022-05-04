export default function InputMethodSelection(props) {
    return (
        <div className="selectInputMethod">
            <label>
                <input type="radio"
                    value="text"
                    name="selectInputMethod"
                    defaultChecked
                    onChange={e=>props.onChange(e.target.value)}
                />Use Textarea
            </label>
            <br/>
            <label>
                <input type="radio"
                    name="selectInputMethod"
                    value="link"
                    onChange={e=>props.onChange(e.target.value)}
                />Use Link
            </label>
        </div>
    );
}