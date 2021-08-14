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
    for (const element of sorted_categories_array) {
      let sub_categories_array = [];
      let category = element;
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
      for (const element of sorted_sub_categories_array) {
        let states_list_array = [];
        let subCategory = element;
        for (let k = 0; k < fullData.length; k++) {
          states_list_array.push(fullData[k].state);
        }
        let sorted_states_list_array = states_list_array
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort((a, b) => {
            return a.toString().localeCompare(b);
          });
        for (const element of sorted_states_list_array) {
          let current_state = element;
          let state_sales_total_array = [];

          for (let n = 0; n < fullData.length; n++) {
            if (
              fullData[n].category === category &&
              fullData[n].subCategory === subCategory &&
              fullData[n].state === current_state
            ) {
              state_sales_total_array.push(fullData[n].sales);
            }
            // console.log(state_sales_total_array[0]);
            // let state_sales_sum = state_sales_total_array.reduce(
            //   (a, b) => a + b,
            //   0
            // );
            // return <td>{state_sales_sum}</td>;
          }
        }
      }
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
