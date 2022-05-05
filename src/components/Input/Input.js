import { useState } from "react";
import useLinkContent from "../../hooks/LinkContent";
import InputMethodSelection from "../InputMethodSelection/InputMethodSelection";
import LinkInput from "../LinkInput/LinkInput";
import TextInput from "../TextInput/TextInput";
import "./Input.css";

function Input(props) {
    let [text, setText] = useState("");
    let [link, setLink] = useState("");
    let [selectedMethod, setSelected] = useState("text");
    let [linkContent, setLinkContent] = useLinkContent(link);

    function fetchLinkData(link) {
        fetch(link)
        .then(response => response.text())
        .then(text => props.inputChanged(text))
    }

    function formSubmit(e) {
        e.preventDefault();
        switch(selectedMethod) {
            case "text":
                props.inputChanged(text);
                break;
            case "link":
                fetchLinkData(link);
                break;
            default:
                return;
        }
    }

    return (
        <div className="inputArea">
            <form onSubmit={formSubmit}>
                <TextInput
                    disabled={selectedMethod !== "text"}
                    onChange={setText}
                />
                <LinkInput
                    disabled={selectedMethod !== "link"}
                    onChange={setLink}
                />
                <InputMethodSelection
                    onChange={setSelected}
                />
                <button className="updateHll">Update</button>
            </form>
        </div>
    )
}

export default Input;