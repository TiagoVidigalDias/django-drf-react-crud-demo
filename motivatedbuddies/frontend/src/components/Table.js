import React, { Component } from "react";
import PropTypes from "prop-types";
import key from "weak-key";

//const Table = ({ data, handleEdit, handleDelete }) =>
class Table extends Component {
    render(){
        return (
            !this.props.data.length ? (
                <p>Nothing to show</p>
            ) : (
                <div className="column">
                  <h2 className="subtitle">
                    Showing <strong>{this.props.data.length} items</strong>
                  </h2>
                  <table className="table is-striped">
                    <thead>
                      <tr>
                        {Object.entries(this.props.data[0]).map(el => <th key={key(el)}>{el[0]}</th>)}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.data.map(el => (
                        <tr key={el.id}>
                          {Object.entries(el).map(el => <td key={key(el)}>{el[1]}</td>)}
                          <td><button onClick={(address_id) => this.props.handleEdit(el.id)}>Edit</button> <button onClick={(address_id) => this.props.handleDelete(el.id)}>Delete</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            ) 
        )
    }
}
  
/*
Table.propTypes = {
  data: PropTypes.array.isRequired
};
*/

export default Table