import React, { Component } from "react";
import PropTypes from "prop-types";
import uuidv4 from "uuid/v4";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.clearItems = this.clearItems.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      // basically pushes new item to end of array
      // also trims the string for convenience's sake
      this.setState({items: [...this.state.items, {
        name: event.target.value.trim(),
        id: uuidv4(),
        checked: false,
      }] });

      // clear the new item entry box
      event.target.value = "";
    }
  }

  checkItem(itemIndex) {
    const newItems = this.state.items;
    // set checked
    newItems[itemIndex].checked = !newItems[itemIndex].checked;
    // refresh state
    this.setState({ items: newItems });
  }

  deleteItem(itemIndex) {
    const newItems = this.state.items;
    // delete item
    newItems.splice(itemIndex, 1);
    // refresh state
    this.setState({ items: newItems });
  }

  updateItem(newName, itemIndex) {
    const newItems = this.state.items;
    // set new name
    newItems[itemIndex].name = newName;
    // refresh state
    this.setState({ items: newItems });
  }

  clearItems() {
    this.setState({ items: [] });
  }

  render() {
    return (
      <div id="app">
        <h1>Shopping List</h1>
        <input type="text" id="newItemEntry" rows="1" placeholder="Type and press Enter to insert."
        onKeyPress={this.handleKeyPress} />

        <ItemDisplay items={this.state.items}
          checkItem={this.checkItem}
          deleteItem={this.deleteItem}
          updateItem={this.updateItem} />

        {/* only displays clear button if there are items in list */}
        {this.state.items.length > 0 &&
        <div id="clear-items" onClick={this.clearItems}>Clear items</div>}
      </div>
    );
  }
}

class ItemDisplay extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    checkItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
  }

  render() {
    return (
      <React.Fragment>
        <h2>Items</h2>

        {(this.props.items.length === 0) ? (
          // if list is empty:
          "Add some items to get started."
        ) : (
          // if list is not empty:
          this.props.items.map((item) => 
            <div className={item.checked ? "item-checked" : "item"}
              key={item.id}>

              <input type="text" className={item.checked ? "item-text-checked" : "item-text"}
                contentEditable={true} defaultValue={item.name}
                onChange={(event) => {
                  // submit new item name and item index to function
                  this.props.updateItem(event.target.value, this.props.items.indexOf(item));
                }} />

              <div className="delete-button item-icon"
                onClick={() => {
                  // submit item index to function
                  this.props.deleteItem(this.props.items.indexOf(item));
                }}>

                <img src={require("./delete.png")} alt="Check" width="18px" height="18px" />
              </div>

              <div className="check-button item-icon"
                onClick={() => {
                  // submit item index to function
                  this.props.checkItem(this.props.items.indexOf(item));
                }}>

                <img src={require("./checked.png")} alt="Check" width="18px" height="18px" />
              </div>
            </div>
          )
        )}
      </React.Fragment>
    );
  }
}
