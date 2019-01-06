import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import styles from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={styles.BuildControls}>
    <p className={styles.price}>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        add={() => props.ingredientAdd(ctrl.type)}
        remove={() => props.ingredientRemove(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <div className={styles.ButtonAlign}>
    <button className={styles.OrderButton} 
    disabled={!props.purchasable}
    onClick={props.ordered}
    >ORDER NOW</button>
    </div>
  </div>
);

export default buildControls;
