import React, { useState, useEffect } from "react";
import data from "../data/Data.json";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(data);
  }, []);

  let getStates = (data) => {
    let states_array = [];
    for (let i = 0; i < data.length; i++) {
      states_array.push(data[i].state);
    }
    let sorted_states_array = states_array
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => {
        return a.toString().localeCompare(b);
      });
    return sorted_states_array.map((state) => {
      return <th>{state}</th>;
    });
  };

  let getTableData = (data) => {
    let fullData = data;
    // console.log(fullData);
    let categories_array = [];
    for (let i = 0; i < fullData.length; i++) {
      categories_array.push(fullData[i].category);
    }
    let sorted_categories_array = categories_array
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => {
        return a.toString().localeCompare(b);
      });
    // console.log(sorted_categories_array);
    for (const element_cat of sorted_categories_array) {
      let sub_categories_array = [];
      let category = element_cat;
      console.log("Start Category Block for " + category);
      for (let j = 0; j < fullData.length; j++) {
        if (fullData[j].category === category) {
          sub_categories_array.push(fullData[j].subCategory);
        }
      }
      let sorted_sub_categories_array = sub_categories_array
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort((a, b) => {
          return a.toString().localeCompare(b);
        });
      // console.log(sorted_sub_categories_array);
      for (const element_subCat of sorted_sub_categories_array) {
        let states_list_array = [];
        let subCategory = element_subCat;
        console.log("---start subcategory for " + subCategory + "---");
        for (let k = 0; k < fullData.length; k++) {
          states_list_array.push(fullData[k].state);
        }
        let sorted_states_list_array = states_list_array
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort((a, b) => {
            return a.toString().localeCompare(b);
          });
        // console.log(sorted_states_list_array); //from here
        let sorted_state_sales_total = [];
        for (const element_state of sorted_states_list_array) {
          let current_state = element_state;
          // let state_index = sorted_states_list_array.indexOf(current_state);
          let state_sales_total_array = [];
          let state_sales_sub_cat_total = 0;

          for (let n = 0; n < fullData.length; n++) {
            if (
              fullData[n].category === category &&
              fullData[n].subCategory === subCategory &&
              fullData[n].state === current_state
            ) {
              // state_sales_total_array.push(fullData[n].sales);
              //sum
              state_sales_sub_cat_total =
                state_sales_sub_cat_total + Math.round(fullData[n].sales);
            }
          }
          state_sales_total_array.push(state_sales_sub_cat_total);
          sorted_state_sales_total.push(state_sales_total_array[0]);

          // console.log(state_sales_total_array[0]);
          // for (let p = 0; p < state_sales_total_array.length; p++) {
          //   state_sales_sum =
          //     state_sales_total_array[p].sales + state_sales_sum;
          // }
          // state_sales_sum = state_sales_total_array.reduce((a, b) => a + b, 0);
          // return <td>{state_sales_sum}</td>;
        }
        sorted_state_sales_total.map((single_state_sale_per_sub_category) => {
          return <td>{single_state_sale_per_sub_category}</td>;
        });
        console.log(sorted_state_sales_total);
        console.log("---end subcategory for " + subCategory + "---");
      }
      console.log("End Category Block for " + category);
    }
    // return sorted_categories;
  };

  return (
    <div className="container">
      <table>
        <thead>
          <th colSpan="2" className="text-left">
            Products
          </th>
          <th colSpan="50" className="text-left">
            States
          </th>
        </thead>
        <thead>
          <th>Category</th>
          <th>Sub-Category</th>
          {getStates(tableData)}
        </thead>

        <tbody>
          <tr>{getTableData(tableData)}</tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
