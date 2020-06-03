import React from 'react';

// Interface irá definir os campos do Header
// campo? = campo não obrigatório
interface HeaderProps {
    title?: string
}

// Para passar parâmetros ao Header é necessário criar a interface e utilizar o React.FC<interface>
const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    );
}

export default Header;