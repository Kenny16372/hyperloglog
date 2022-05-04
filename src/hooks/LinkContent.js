import { useState, useEffect } from "react"

export default function useLinkContent(link) {
    let [result, setResult] = useState("");

    useEffect(() => {
        let subscribed = true;

        fetch(link)
        .then(response => response.text())
        .then(text => {
            if(subscribed) {
                setResult(text);
            }
        });
        
        return () => {
            subscribed = false;
        }
    }, [link]);
    
    return result;
}