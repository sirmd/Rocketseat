import React, {Component} from 'react';
import api from "../../services/api";
import "./styles.css";


export default class Main extends Component{

    // Produtos serão armazenados na variável 'state' para ser utilizado no setState
    state = {
        products: [],
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async () => {
        const response = await api.get('/products');
        
        this.setState({ products: response.data.docs});
    };



    render(){
        const { products } = this.state;
    //Retorna todos produtos dentro de state
    return <div className="product-list">
        {this.state.products.map(product => (
            <article key={product._id}>
                <strong>{product.title}</strong>
                <p>{product.description}</p>

                <a href="">Acessar</a>
            </article>
        ))}
    </div>
    }
}