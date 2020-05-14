import React, {Component} from 'react';
import api from "../../services/api";


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
    //Retorna todos produtos dentro de state
    return <div className="productList">
        {this.state.products.map(product => (
            <h2 key={product._id}>{product.title}</h2>
        ))}
    </div>
    }
}