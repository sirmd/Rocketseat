import React, { useState, FormEvent } from 'react';
import logo from '../../assets/logo.svg';
import './styles.css';
import { FiLogIn, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import SearchPoints from '../SearchPointInput';

const Home = () => {

    const [openSearch, setOpenSearch] = useState(false);

    function handleSearch(event: FormEvent) {
        event.preventDefault();
        setOpenSearch(true);
    }

    return (
        <div id="page-home">
            {openSearch ?
                <SearchPoints />
                : null}
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta" />
                </header>

                <main>
                    <h1>
                        Seu marketplace
                        de coleta de resíduos.
                    </h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
                    <form onSubmit={handleSearch}>
                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastro um ponto de coleta</strong>
                    </Link>
                        <button type="submit" >
                            <span>
                                <FiSearch />
                            </span>
                            <strong>Pesquisar um ponto de coleta</strong>
                        </button>
                    </form>
                </main>
            </div>
        </div>
    )
};


export default Home;