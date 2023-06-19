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
                style={{ boxShadow: '3px 2px 3px rgba(0, 0, 0, 0.4)' }}
            />
            <button
                onClick={() => {
                    searchHandler();
                }}
                style={{ marginLeft: "10px", backgroundColor: "#f9cb08", boxShadow: '3px 2px 3px rgba(0, 0, 0, 0.4)' }}
            >
                Buscar
            </button>
        </div>
    );
};

export default SearchBox;