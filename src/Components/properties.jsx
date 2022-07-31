import React, { Component } from "react";
import { getProperties } from "../services/fakePropertyService";
import Like from "./common/like";
import Pagination from "./common/Pagination";
import { Paginate } from "../utils/paginate";
import "./Properties.css";
import PropertiesTable from "./propertiesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import FilterGroup from "./filterGroup";

class Properties extends React.Component {
  state = {
    properties: getProperties(),
    pageSize: 8,
    currentPage: 1,
    currentLocation: "none",
    currentCategory: "none",
    currentPriceRange: { min: "none", max: "none" },
    sortColumn: { path: undefined, order: "asc" },
    currentMoveInDate: "none",
  };

  render() {
    const filteredProperties = this.propertiesFilterHandler(
      this.state.properties,
      this.state.currentLocation,
      this.state.currentCategory
    );

    const priceMinFilteredProperties = this.priceMinFilterHandler(
      filteredProperties,
      this.state.currentPriceRange.min
    );

    const priceMaxFilteredProperties = this.priceMaxFilterHandler(
      priceMinFilteredProperties,
      this.state.currentPriceRange.max
    );

    const moveInDateFilteredProperties = this.moveInDateFilterHandler(
      priceMaxFilteredProperties,
      this.state.currentMoveInDate
    );

    const paginatedProperties = Paginate(
      moveInDateFilteredProperties,
      this.state.currentPage,
      this.state.pageSize
    );

    // const addNumbersInAString = (str) => {
    //   const strArr = str.split("");
    //   let sum = 0;
    //   for (let i = 0; i < strArr.length; i++) {
    //     if (+strArr[i]) {
    //       sum += +strArr[i];
    //     }
    //   }
    //   return sum;
    // };

    return (
      <React.Fragment>
        <div className="wrapper">
          <FilterGroup
            currentLocation={this.state.currentLocation}
            onLocationChange={this.locationChangeHandler}
            onCategoryChange={this.categoryChangeHandler}
            onPriceMinChange={this.priceMinChangeHandler}
            onPriceMaxChange={this.priceMaxChangeHandler}
            onDateChange={this.moveInDateChangeHandler}
          />
          <div className="list">
            <PropertiesTable
              filteredProperties={paginatedProperties}
              properties={moveInDateFilteredProperties}
              Like={Like}
              onRemove={this.removeHandler}
              isFav={this.isFavHandler}
              onSort={this.handleSort}
              sortColumn={this.state.sortColumn}
              onFocus={this.inputFocusHandler}
              onChange={this.inputChangeHandler}
            />
            <div className="pagination-wrapper">
              <Pagination
                itemsCount={priceMaxFilteredProperties.length}
                pageSize={this.state.pageSize}
                onPageChange={this.pageChangeHandler}
                currentPage={this.state.currentPage}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  inputChangeHandler = (e) => {
    const properties = getProperties();
    const searchResults = properties.filter((property) =>
      property.title.toUpperCase().includes(e.target.value.toUpperCase())
    );
    this.setState({ properties: searchResults });
  };

  inputFocusHandler = () => {
    const { currentLocation, currentPage } = this.state;
    this.setState({ currentPage: 1 });
  };

  getNoOfProperties = () => {
    return this.state.properties.length === 0
      ? "There are no properties in this list"
      : this.state.properties.length === 1
      ? "There is 1 property in this list"
      : `There are ${this.state.properties.length} properties in this list`;
  };

  isFavHandler = (property) => {
    const properties = [...this.state.properties];
    const index = properties.indexOf(property);
    properties[index] = { ...property };
    property.liked
      ? (properties[index].liked = false)
      : (properties[index].liked = true);
    this.setState({ properties });
  };

  pageChangeHandler = (newCurrentPage) => {
    let currentPage = this.state.currentPage;
    this.setState({ currentPage: newCurrentPage });
  };

  locationChangeHandler = (newLocation) => {
    let currentLocation = this.state.currentLocation;
    this.setState({ currentLocation: newLocation, currentPage: 1 });
  };

  categoryChangeHandler = (newCategory) => {
    let currentCategory = this.state.currentCategory;
    this.setState({ currentCategory: newCategory, currentPage: 1 });
  };

  propertiesFilterHandler = (properties, currentLocation, currentCategory) => {
    if (currentLocation === "none" && currentCategory === "none") {
      return properties;
    } else if (currentLocation !== "none" && currentCategory === "none") {
      return properties.filter(
        (property) => property.location === currentLocation
      );
    } else if (currentLocation === "none" && currentCategory !== "none") {
      return properties.filter(
        (property) => property.category === currentCategory
      );
    } else if (currentLocation !== "none" && currentCategory !== "none") {
      return properties
        .filter((property) => property.location === currentLocation)
        .filter((property) => property.category === currentCategory);
    }
  };

  priceMinChangeHandler = (newMin) => {
    let currentMin = this.state.currentPriceRange.currentMin;
    this.setState({
      currentPriceRange: { min: newMin, max: this.state.currentPriceRange.max },
      currentPage: 1,
    });
  };

  priceMinFilterHandler = (properties, currentMin) => {
    if (currentMin == "none") {
      return properties;
    } else {
      return properties.filter((property) => property.price >= currentMin);
    }
  };

  priceMaxChangeHandler = (newMax) => {
    let currentMax = this.state.currentPriceRange.currentMax;
    this.setState({
      currentPriceRange: { min: this.state.currentPriceRange.min, max: newMax },
      currentPage: 1,
    });
  };

  priceMaxFilterHandler = (properties, currentMax) => {
    if (currentMax == "none") {
      return properties;
    } else {
      return properties.filter((property) => property.price <= currentMax);
    }
  };

  moveInDateChangeHandler = (date) => {
    this.setState({ currentMoveInDate: date });
  };

  moveInDateFilterHandler = (properties, currentMoveInDate) => {
    if (currentMoveInDate === "none") {
      return properties;
    } else {
      return properties.filter((property) => {
        let a = new Date(currentMoveInDate);
        let b = new Date(property.moveInDate);
        return a > b;
      });
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
}

export default Properties;
