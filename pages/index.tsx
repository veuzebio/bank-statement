import { useState } from "react";

function Home() {
    return (
        <div>
            <Statement/>
        </div>
    )
}

function Statement() {
    const [account, setAccount] = useState(0);
    const [inputValue, setInputValue] = useState("");

    function setStatementValue() {
        setAccount(account + Number(inputValue));
    }

    return (
        <div>
            <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
            <button type="button" onClick={setStatementValue}>Deposit</button>
            <h1>{account}</h1>
        </div>
    )
}

export default Home;