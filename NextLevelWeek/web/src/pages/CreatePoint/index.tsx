// import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
// import logo from '../../assets/logo.svg';
// import './styles.css';
// import { Link, useHistory } from "react-router-dom";
// import { FiArrowLeft } from "react-icons/fi";
// import { Map, TileLayer, Marker } from "react-leaflet";
// import { LeafletMouseEvent } from "leaflet";
// import { FiCheckCircle } from 'react-icons/fi';

// import api from "../../services/api";
// import Axios from 'axios';

// // import Success from "../Success";

// interface Item {
//     id: number,
//     title: string,
//     image_url: string;
// };
// interface IBGEUFResponse {
//     sigla: string;

// };
// interface IBGECityResponse {
//     nome: string;

// };


// const CreatePoint = () => {

//     // Busca items cadastrados na tabela de items
//     const [items, setItems] = useState<Item[]>([]);
//     const [ufs, setUfs] = useState<string[]>([]);
//     const [cities, setCities] = useState<string[]>([]);

//     const [selectedUf, setSelectedUf] = useState('0');
//     const [selectedCity, setSelectedCity] = useState('0');
//     const [selectedItems, setSelectedItems] = useState<[number, number]>([]);
//     const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
//     const [initialPosition, setinitialPosition] = useState<[number, number]>([0, 0]);

//     const [formSubmitted, setFormSubmitted] = useState(false);

//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         whatsapp: '',
//     })

//     const history = useHistory();

//     // Carregar os itens
//     useEffect(() => {
//         api.get('items').then(response => {
//             setItems(response.data);
//         })
//     }, []);

//     // Carregar os UFs
//     useEffect(() => {
//         Axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
//             .then(response => {
//                 const ufInitials = response.data.map(uf => uf.sigla);
//                 setUfs(ufInitials);
//             });
//     }, []);

//     // Carregar as cidades ao mudar UF
//     useEffect(() => {
//         Axios
//             .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
//             .then(response => {
//                 const citiesName = response.data.map(city => city.nome);
//                 setCities(citiesName);
//             });
//     }, [selectedUf]);

//     // Carrega a posição atual na initialPosition e na selectedPosition
//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(position => {
//             const { latitude, longitude } = position.coords;
//             setinitialPosition([
//                 latitude, longitude
//             ]);
//             setSelectedPosition([
//                 latitude, longitude
//             ])

//         })
//     }, [])

//     function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
//         const uf = event.target.value;
//         setSelectedUf(uf);
//     };
//     function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
//         const city = event.target.value;
//         console.log(city);
//         setSelectedCity(city);
//     };
//     function handleMapClick(event: ChangeEvent<LeafletMouseEvent>) {
//         setSelectedPosition([
//             event.latlng.lat,
//             event.latlng.lng,
//         ]);
//     };

//     function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     }

//     function handleSelectedItem(id: number) {
//         // Se o item passado já está no array de itens selecionados, remove ele
//         // Se não, adiciona
//         const alreadySelected = selectedItems.includes(id);
//         if (alreadySelected) {
//             const filteredItems = selectedItems.filter((item) => item !== id);
//             setSelectedItems(filteredItems);
//         }
//         else {
//             setSelectedItems([...selectedItems, id]);
//         }

//     }

//     async function handleSubmit(event: FormEvent) {

//         event.preventDefault();
//         const { name, email, whatsapp } = formData;
//         const uf = selectedUf;
//         const city = selectedCity;
//         const [latitude, longitude] = selectedPosition;
//         const items = selectedItems;

//         const data = {
//             name,
//             email,
//             whatsapp,
//             uf,
//             city,
//             latitude,
//             longitude,
//             items
//         };

//         await api.post('points', data);


//         // console.log(formSubmitted);

//         // Marca o estado do Form como enviado
//         setFormSubmitted(true);

//         // // Adiciona um delay de 2000ms para poder mostrar a mensagem de Sucesso
//         // setTimeout(() => {
//         //     // Redireciona para a home
//         //     history.push('/');
//         // }, 2000);


//         // console.log(formSubmitted);

//     }

//     return (
//         <div id="page-create-point">
//             {formSubmitted ? <div id="modal">
//                 <FiCheckCircle size={40} color={"#00FF00"} />
//                 <span>Cadastro Concluído!</span>
//                 <button type='submit' onClick={() => history.push('/')}>Ok!</button>
//             </div> : false}

//             <header>
//                 <img src={logo} alt="Ecoleta" />
//                 <Link to="/">
//                     <FiArrowLeft />
//                     Voltar para home
//                 </Link>
//             </header>
//             <form onSubmit={handleSubmit}>
//                 <h1>Cadastro do <br /> Ponto de Coleta</h1>
//                 <fieldset>
//                     <legend>
//                         <h2>Dados</h2>
//                     </legend>
//                     <div className="field">
//                         <label htmlFor="name">Nome da Entidade</label>
//                         <input
//                             type="text"
//                             name="name"
//                             id="name"
//                             onChange={handleInputChange}
//                         />
//                     </div>

//                     <div className="field-group">

//                         <div className="field">

//                             <label htmlFor="email">Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 id="email"
//                                 onChange={handleInputChange}
//                             />
//                         </div>

//                         <div className="field">
//                             <label htmlFor="whatsapp">Whatsapp</label>
//                             <input
//                                 type="text"
//                                 name="whatsapp"
//                                 id="whatsapp"
//                                 onChange={handleInputChange}
//                             />

//                         </div>
//                     </div>
//                 </fieldset>

//                 <fieldset>
//                     <legend>
//                         <h2>Endereço</h2>
//                         <span>Selecione o endereço no mapa</span>
//                     </legend>

//                     <div className="field-group">
//                         <div className="field">
//                             <label htmlFor="uf">Estado (UF)</label>
//                             <select
//                                 name="uf"
//                                 id="uf"
//                                 value={selectedUf}
//                                 onChange={handleSelectedUf}>
//                                 <option value="0">Selecione uma UF</option>

//                                 {ufs.map((uf) => {
//                                     return (
//                                         <option value={uf} key={uf}>{uf}</option>
//                                     );
//                                 })}
//                             </select>
//                         </div>
//                         <div className="field">
//                             <label htmlFor="city">Cidade</label>
//                             <select
//                                 name="city"
//                                 id="city"
//                                 value={selectedCity}
//                                 onChange={handleSelectedCity}>
//                                 <option value="0">Selecione uma Cidade</option>
//                                 {cities.map((city) => {
//                                     return (
//                                         <option value={city} key={city}>{city}</option>
//                                     );
//                                 })}
//                             </select>
//                         </div>
//                     </div>

//                     {/* Mapa para selecionar latitude/longitude */}
//                     <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
//                         <TileLayer
//                             attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         />
//                         <Marker position={JSON.stringify(selectedPosition) === JSON.stringify([0, 0]) ?
//                             initialPosition :
//                             selectedPosition} />
//                     </Map>
//                 </fieldset>

//                 <fieldset>
//                     <legend>
//                         <h2>Itens de Coleta</h2>
//                         <span>Selecione um ou mais itens abaixo</span>
//                     </legend>
//                     <ul className="items-grid">
//                         {items.map((item) => {
//                             return (<li
//                                 key={item.id}
//                                 onClick={() => handleSelectedItem(item.id)}
//                                 className={selectedItems.includes(item.id) ? 'selected' : ''}>
//                                 <img src={item.image_url} alt={item.title} />
//                                 <span>{item.title}</span>
//                             </li>);
//                         })}
//                     </ul>
//                 </fieldset>

//                 <button type="submit">
//                     Cadastrar Ponto de Coleta
//                 </button>
//             </form>
//         </div>
//     );
// };


// export default CreatePoint;



import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';
import api from '../../services/api';

import './styles.css'

import logo from '../../assets/logo.svg'
import Success from '../Success';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface UF {
    id: number;
    nome: string;
    sigla: string;
}

interface City {
    id: number;
    nome: string;
    sigla: string;
}

const CreatePoint = () => {
    const [registerCompleted, setRegisterCompleted] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [uf, setUF] = useState<UF[]>([]);
    const [city, setCity] = useState<City[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    // const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
            setSelectedPosition([latitude, longitude]);
        })
    }, [])


    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, []);

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then(response => {
                setUF(response.data);
            })
    }, []);

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }
        axios
            .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                setCity(response.data);
            })
    }, [selectedUf]);

    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedUf(event.target.value);
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedCity(event.target.value);
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItem = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItem);
        } else {
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

        await api.post('/points', data);

        setRegisterCompleted(true);

    }

    return (
        <div id="page-create-point">

            {registerCompleted ?
                <Success
                    message="Cadastro Concluído"
                    page="/" />
                : false}

            <header>
                <img src={logo} alt="Ecoleta-logo" />
                <Link to='/'>
                    <FiArrowLeft />
          Voltar para home
        </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br /> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">

                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type='text'
                                name='whatsapp'
                                id='whatsapp'
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

                    <Map
                        center={initialPosition}
                        zoom={15}
                        onClick={handleMapClick}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select
                                name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={handleSelectedUf}
                            >
                                <option value="0">Selecione uma UF</option>
                                {
                                    uf.map(item => (
                                        <option key={item.sigla} value={item.sigla}>{`${item.sigla} - ${item.nome}`}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select
                                name="city"
                                id="city"
                                value={selectedCity}
                                onChange={handleSelectedCity}
                            >>
                <option value="0">Selecione uma Cidade</option>
                                {
                                    city.map(item => (
                                        <option key={item.nome} value={item.nome}>{item.nome}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itema abaixo</span>
                    </legend>

                    <ul className='items-grid'>
                        {items.map(item => (
                            <li
                                key={item.id}
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>

                </fieldset>

                <button type='submit'>Cadastrar ponto de coleta</button>
            </form>
        </div>
    );
};

export default CreatePoint;