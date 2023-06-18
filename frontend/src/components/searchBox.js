import { React, useCallback, useState } from "react";
const SearchBox = (props) => {
    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    let searchHandler = useCallback(() => {
        props.callback(inputText);
    }, [inputText, props]);

    return (
        <div className="searchBox">
            <input
                type="text"
                placeholder="Search"
                onChange={inputHandler}
                value={inputText}
            />
            <button
                onClick={() => {
                    searchHandler();
                }}
            >
                Buscar
            </button>
        </div>
    );
};

export default SearchBox;