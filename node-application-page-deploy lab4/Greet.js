const greet = (name) => {
    return `
        <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
        ">
            <h1>Hello ${name}</h1>
        </div>
    `;
};

module.exports = greet;