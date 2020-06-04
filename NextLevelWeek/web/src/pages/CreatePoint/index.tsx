import React, { useEffect, useState, ChangeEvent } from 'react';
import logo from '../../assets/logo.svg';
import './styles.css';
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import api from "../../services/api";
import Axios from 'axios';

interface Item {
    id: number,
    title: string,
    image_url: string;
};
interface IBGEUFResponse {
    sigla: string;

};
interface IBGECityResponse {
    nome: string;

};


const CreatePoint = () => {

    // Busca items cadastrados na tabela de items
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [initialPosition, setinitialPosition] = useState<[number, number]>([0, 0]);

    // Carregar os itens
    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, []);

    // Carregar os UFs
    useEffect(() => {
        Axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const ufInitials = response.data.map(uf => uf.sigla);
                setUfs(ufInitials);
            });
    }, []);

    // Carregar as cidades ao mudar UF
    useEffect(() => {
        Axios
            .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const citiesName = response.data.map(city => city.nome);
                setCities(citiesName);
            });
    }, [selectedUf]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setinitialPosition([
                latitude, longitude
            ])
        })
    }, [])

    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    };
    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        console.log(city);
        setSelectedCity(city);
    };
    function handleMapClick(event: ChangeEvent<LeafletMouseEvent>) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng,
        ]);
    };


    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <form action="">
                <h1>Cadastro do <br /> Ponto de Coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input type="text" name="name" id="name" />
                    </div>

                    <div className="field-group">

                        <div className="field">

                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text" name="whatsapp" id="whatsapp" />

                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectedUf}>
                                <option value="0">Selecione uma UF</option>

                                {ufs.map((uf) => {
                                    return (
                                        <option value={uf} key={uf}>{uf}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectedCity}>
                                <option value="0">Selecione uma Cidade</option>
                                {cities.map((city) => {
                                    return (
                                        <option value={city} key={city}>{city}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    {/* Mapa para selecionar latitude/longitude */}
                    <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={JSON.stringify(selectedPosition) === JSON.stringify([0, 0]) ?
                            initialPosition :
                            selectedPosition} />
                    </Map>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map((item) => {
                            return (<li key={item.id}>
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>);
                        })}
                    </ul>
                </fieldset>
                <button type="submit">
                    Cadastrar Ponto de Coleta
                </button>
            </form>
        </div>
    );
};


export default CreatePoint;