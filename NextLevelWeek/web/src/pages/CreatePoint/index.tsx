import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import logo from '../../assets/logo.svg';
import './styles.css';
import { Link, useHistory } from "react-router-dom";
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
    const [selectedItems, setSelectedItems] = useState<[number, number]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [initialPosition, setinitialPosition] = useState<[number, number]>([0, 0]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    })

    const history = useHistory();

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

    // Carrega a posição atual na initialPosition e na selectedPosition
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setinitialPosition([
                latitude, longitude
            ]);
            setSelectedPosition([
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

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSelectedItem(id: number) {
        // Se o item passado já está no array de itens selecionados, remove ele
        // Se não, adiciona
        const alreadySelected = selectedItems.includes(id);
        if (alreadySelected) {
            const filteredItems = selectedItems.filter((item) => item !== id);
            setSelectedItems(filteredItems);
        }
        else {
            setSelectedItems([...selectedItems, id]);
        }

    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        };
        
        await api.post('points', data);

        // Redireciona para a home
        history.push('/');
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br /> Ponto de Coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">

                        <div className="field">

                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />

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
                            <select
                                name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={handleSelectedUf}>
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
                            <select
                                name="city"
                                id="city"
                                value={selectedCity}
                                onChange={handleSelectedCity}>
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
                            return (<li
                                key={item.id}
                                onClick={() => handleSelectedItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}>
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