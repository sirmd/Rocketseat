import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from "../../services/api";
import "./styles.css";


export default class Main extends Component{

    // Produtos serão armazenados na variável 'state' que será atualizada no setState
    // a cada nova busca na API
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    componentDidMount() {
        // Carrega os produtos ao iniciar
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {

        // Busca dados dos produtos da página passada por parâmetro
        const response = await api.get(`/products?page=${page}`);

        // Grava dados do response da API
        const {docs, ...productInfo} = response.data;
        
        // setState para atualizar dados
        this.setState({ products: response.data.docs, productInfo, page});
    };

    prevPage = () => {
        // Busca a página atual do state
        const { page } = this.state;

        // Se está na primeira página, não faz nada
        if (page === 1) return;

        // Se não está na primeira página, volta uma
        const pageNumber = page - 1;

        // Carrega os produtos da página anterior
        this.loadProducts(pageNumber);
    }
    nextPage = () => {
        // Busca a página atual e o total de páginas que estão no state
        const { page, productInfo } = this.state;

        // Se a página atual for a última, não faz nada
        if (page === productInfo.pages) return;

        // Caso não seja a última página, incrementa a página em 1
        const pageNumber = page + 1;

        // Carrega os produtos da nova página
        this.loadProducts(pageNumber);
    }


    render(){
        // Busca os dados que estão no state
        const { products, page, productInfo } = this.state;

        //Retorna todos produtos dentro de state
        return <div className="product-list">
            {this.state.products.map(product => (
                <article key={product._id}>
                    <strong>{product.title}</strong>
                    <p>{product.description}</p>

                    <Link to={`/products${product._id}`}>Acessar</Link>
                </article>
            ))}
            <div className="actions">
                <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
                <button disabled={page===productInfo.pages} onClick={this.nextPage}>Próxima</button>
            </div>
                
        </div>
    }
}