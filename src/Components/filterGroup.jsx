import React, { Component } from "react";

const FilterGroup = (props) => {
  const {
    currentLocation,
    onLocationChange,
    onCategoryChange,
    onPriceMinChange,
    onPriceMaxChange,
    onDateChange
  } = props;

  return (
    <div className="filterGroup d-flex justify-content-around flex-wrap">
      <div classNme="location">
        <div class="form-group">
          <label for="exampleFormControlSelect1">Location :</label>
          <select
            onChange={({ target: { value } }) => onLocationChange(value)}
            class="form-control"
            id="exampleFormControlSelect1"
          >
            <option value="none">Choose</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="chennai">Chennai</option>
            <option value="jaipur">Jaipur</option>
            <option value="pune">Pune</option>
            <option value="indore">Indore</option>
          </select>
        </div>
      </div>
      <div className="move-in-date">
        <label htmlFor="date">Move in before : </label>
        <input
          onChange={({ target: { value } }) => onDateChange(value)}
          className="d-block"
          type="date"
          name=""
          id="date"
        />
      </div>
      <div className="price-range">
        <label htmlFor="price-range">Price Range :</label>
        <div class="row" id="price-range">
          <div class="col">
            <input
              onChange={({ target: { value } }) =>
                onPriceMinChange(value === "" ? 0 : value)
              }
              type="number"
              class="form-control"
              placeholder="Min (in Lacs)"
            />
          </div>
          <span>to</span>
          <div class="col">
            <input
              onChange={({ target: { value } }) =>
                onPriceMaxChange(value === "" ? 10000 : value)
              }
              type="number"
              class="form-control"
              placeholder="Max (in Lacs)"
            />
          </div>
        </div>
      </div>
      <div className="category">
        <div class="form-group">
          <label for="exampleFormControlSelect1">Category : </label>
          <select
            onChange={({ target: { value } }) => onCategoryChange(value)}
            class="form-control"
            id="exampleFormControlSelect1"
          >
            <option value="none">Choose</option>
            <option value="flat">Flat</option>
            <option value="house">House</option>
            <option value="plot">Plot</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterGroup;
