import { useState } from "react";

function InputData() {
    let [input, setInput] = useState("");
    let [link, setLink] = useState("");
    let [data, setData] = useState("");

    function handleLinkUpdate(content) {
        setData(content);
    }

    return (
        <div className="inputArea">
            <textarea id="text" onChange={e=>setInput(e.target.value)}/>
            <input type="text" id="link" onChange={e=>setLink(e.target.value)}/>
            <input type="radio" name="selectInputMethod" id="textRadio"/>
            <label htmlFor="textRadio">Use Textarea</label>
            <input type="radio" name="selectInputMethod" id="linkRadio"/>
            <label htmlFor="linkRadio">Use Link</label>
            <button id="submit" onClick={()=>{}}/>
            <p>{input}</p>
        </div>
    )
}

export default InputData;