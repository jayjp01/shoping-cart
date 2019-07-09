import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem, addQuantity, subtractQuantity } from './actions/cartActions'
import { ReactComponent as Logo } from '../Logo/delete.svg';
class Cart extends Component {

    handleRemove = (id) => {
        this.props.removeItem(id);
    }

    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }

    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    }
    saveCardData = () => {
        console.log(this.props.items)
    }

    render() {
        let newTotal = this.props.items.reduce(function (total, currentValue) {
            return total + currentValue.priceLabel;
        }, 0);
        let addedItems = this.props.items.length ?
            (
                this.props.items.map(item => {
                    return (
                        <li className="collection-item" key={item.id}>
                            <div className="item-desc">
                                <div className="row">
                                    <div className="column-labels ls-reset flex flex-middle flex-center">
                                        <div className="title flex-1 flex flex-center flex-column">
                                            <div>{item.title}</div>
                                            <div>${`${item.price}/mo`}</div>
                                        </div>
                                        <div className="flex flex-middle mr-16 cl-gray">
                                            <Link to="/"><svg onClick={() => { this.handleSubtractQuantity(item.id) }} width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="current-stroke c-blue c-pointer"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path></svg></Link>
                                            <div className="addcart"><input type="text" value={item.quantity} min="1" className="productquantity" /></div>
                                            <Link to="/"><svg onClick={() => { this.handleAddQuantity(item.id) }} width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="current-stroke c-blue c-pointer"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8M8 12h8"></path></svg></Link>
                                        </div>
                                        <b className="mr-16">${item.priceLabel}/mo</b>
                                        <Logo onClick={() => { this.handleRemove(item.id) }} />
                                        <i class="fa fa-trash-o del" ></i>
                                    </div>
                                </div>

                            </div>

                        </li>

                    )
                })
            ) :

            (
                <p className="flex flex-middle flex-center fs-b">Cart Empty</p>
            )
        return (
            <div className="container">
                <div className="cart max-width-700">
                    <h5>Your Cart</h5>
                    <div className="shopping-cart">
                        <div className="column-labels">
                            <label className="product-details mr-16">Product Name & Price</label>
                            <label className="product-price mr-16">Quantity</label>
                            <label className="product-total">Total</label>
                        </div>
                    </div>
                    <ul className="collection">
                        {addedItems}
                        <div className="collection-item number_item">
                            <span>Number of Item:{this.props.items.length}</span>
                            <span className="total">Total ${newTotal}/mo</span>
                        </div>
                    </ul>
                    <button class="button button2" onClick={this.saveCardData}>SAVE</button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => { dispatch(removeItem(id)) },
        addQuantity: (id) => { dispatch(addQuantity(id)) },
        subtractQuantity: (id) => { dispatch(subtractQuantity(id)) }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)