import React, { Component } from "react";
import axios from "../../axios-orders";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Model from "../../components/UI/Model/Model";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.6,
  meat: 1.3,
  cheese: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error:false
  };

  componentDidMount() {
    axios
      .get("https://react-burger-builder-cf7f0.firebaseio.com/ingredients.json")
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(
        error => {
          this.setState({error:true});
        }
      );
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = {
      ...this.state.ingredients
    };
    updatedIngredient[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
    this.updatePurchaseState(updatedIngredient);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredient = {
        ...this.state.ingredients
      };
      updatedIngredient[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
      this.updatePurchaseState(updatedIngredient);
    } else {
      console.log("No ingredient");
    }
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinuewHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredient: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Luke",
        address: {
          street: "1 test Rd",
          suburb: "Test",
          postcode: "1000"
        },
        email: "test@example.com",
        deliverMethod: "fast"
      }
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <h3 style={{textAlign:"center"}}>Ingredients can't be loaded!</h3> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdd={this.addIngredientHandler}
            ingredientRemove={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinuewHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Model
          show={this.state.purchasing}
          modelClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Model>
        {burger}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
