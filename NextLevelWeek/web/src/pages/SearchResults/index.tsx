import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from "react-icons/fi";
import './styles.css';
import api from '../../services/api';
import toTitleCase from '../../lib/index';


interface Items {
    id: number,
    title: string,
}

interface Points {
    id: number,
    name: string,
    city: string,
    uf: string,
    image_url: string,
    items: Items[],

}

interface Data {
    history: {
        location: {
            state: {
                filteredPoints: Points[]
            }
        }
    }
}

const SearchResults: React.FC<Data> = (data) => {

    const points = data.history.location.state.filteredPoints;
    const [pointsWithItems, setPointsWithItems] = useState<Points[]>([]);


    // Busca os items dos pontos que foram passados por parâmetro
    useEffect(() => {
        const fetchPointsWithItems = async (id: number) => {
            await api.get(`points/${id}`).then(response => {
                setPointsWithItems(prevPoints => ([...prevPoints,
                response.data.serializedPoints]))
            })
        };
        points.forEach(point => {
            fetchPointsWithItems(point.id);
        })

    }, [points]);

    return (
        <div id="page-search-points">

            <header>
                <div id="header">

                    <img src={logo} alt="Ecoleta" />
                    <Link to='/'><FiArrowLeft />Voltar para home</Link>
                </div>
                <div id="points">
                    <strong>{pointsWithItems.length} pontos</strong> encontrados
            </div>
            </header>
            <div id="search-background">
                <div id="search-content">
                    {pointsWithItems.map((points) => {
                        return (

                            <div key={points.id} id="point">
                                <img src={points.image_url} alt="" />
                                <h1>{toTitleCase(points.name)}</h1>
                                <strong>{points.items.map(item => item.title).join(', ')}</strong>
                                <span>{toTitleCase(points.city)}, {points.uf.toUpperCase()}</span>
                            </div>
                        )
                    })}
                </div>
            </div>


        </div>
    )
};


export default SearchResults;