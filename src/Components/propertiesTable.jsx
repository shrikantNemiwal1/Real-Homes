import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import bathtubImg from "../img/bathtub.png";
import bedImg from "../img/bed.png";
import areaImg from "../img/area.png";

class PropertiesTable extends React.Component {
  render() {
    const {
      filteredProperties,
      properties,
      Like,
      onRemove,
      isFav,
      onSort,
      sortColumn,
      onFocus,
      onChange,
    } = this.props;

    return (
      <div>
        <div className="my-2 result-count">Showing {properties.length} results</div>
        <input
          onFocus={onFocus}
          onChange={onChange}
          type="text"
          className="form-control input-search"
          placeholder="Search..."
        ></input>
        <div className="propertyGroup d-flex justify-content-around flex-wrap p-2">
          {filteredProperties.map((property) => (
            <div className="card m-1" style={{ width: 300 }}>
              <img src={property.img} className="card-img-top" alt="view" />
              <div className="icon-container">
                <Like property={property} favHandler={isFav} />
              </div>
              <div className="card-body pb-1 pt-3">
                <h5 className="card-title mb-0">
                  <span>&#8377; </span>
                  {property.price}L
                </h5>
                <h5 className="card-title mb-0">{property.title}</h5>
                <p className="card-text mb-0">Category : {property.category}</p>
                <p className="card-text address mb-2">
                  Move in Date : {property.moveInDate}
                </p>
                <p className="card-text address mb-2">
                  Address : {property.address}
                </p>
                <div className="border-top pt-2 pb-2 d-flex justify-content-around">
                  <span className="area form-check-inline">
                    <img src={areaImg} className="areaImg" alt="area" />
                    <p className="area-size">{property.area} sqft</p>
                  </span>
                  <span className="bed form-check-inline">
                    <img src={bedImg} className="bedImg" alt="bedroom" />
                    <p className="bed-quantity">{property.bed}</p>
                  </span>
                  <span className="bathroom form-check-inline">
                    <img
                      src={bathtubImg}
                      className="bathtubImg"
                      alt="bathroom"
                    />
                    <p className="bathroom-quantity">{property.bathroom}</p>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <table className="table">
          <thead>
            <tr>
              <th onClick={() => this.onSortList("title")} scope="col">
                Title
              </th>
              <th onClick={() => this.onSortList("genre.name")} scope="col">
                Genre
              </th>
              <th onClick={() => this.onSortList("numberInStock")} scope="col">
                Stock
              </th>
              <th
                onClick={() => this.onSortList("dailyRentalRate")}
                scope="col"
              >
                Rate
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id}>
                <Link to={`/properties/${property._id}`}>{property.title}</Link>
                <td>{property.genre.name}</td>
                <td>{property.numberInStock}</td>
                <td>{property.dailyRentalRate}</td>
                <td>
                  <Like property={property} favHandler={isFav} />
                  <button
                    onClick={() => onRemove(property._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    );
  }
  onSortList = (path) => {
    const sortColumnData = this.props.sortColumn;
    this.props.onSort({
      path: path,
      order: sortColumnData.order === "asc" ? "desc" : "asc",
    });
  };
}

export default PropertiesTable;
