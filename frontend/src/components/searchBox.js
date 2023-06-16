import { React, useState } from "react";

const [inputText, setInputText] = useState("");

let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
};