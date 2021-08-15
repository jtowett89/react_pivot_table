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
    let categories_array = [];
    for (let i = 0; i < fullData.length; i++) {
      categories_array.push(fullData[i].category);
    }
    let sorted_categories_array = categories_array
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => {
        return a.toString().localeCompare(b);
      });
    let display_data = [];
    let number_of_states = [];
    for (const element_cat of sorted_categories_array) {
      let num = 0;
      let sub_categories_array = [];
      let category = element_cat;
      let sorted_category_total_per_state = [];

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

      for (const element_subCat of sorted_sub_categories_array) {
        let states_list_array = [];
        let subCategory = element_subCat;
        let sub_cat_row_total = 0;

        console.log("---start subcategory for " + subCategory + "---");
        for (let k = 0; k < fullData.length; k++) {
          states_list_array.push(fullData[k].state);
        }
        let sorted_states_list_array = states_list_array
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort((a, b) => {
            return a.toString().localeCompare(b);
          });
        number_of_states = sorted_states_list_array;
        for (let x = 0; x < fullData.length; x++) {
          if (
            fullData[x].category === category &&
            fullData[x].subCategory === subCategory
          ) {
            //sum
            sub_cat_row_total =
              sub_cat_row_total + Math.round(fullData[x].sales);
          }
        }

        let sorted_state_sales_total = [];

        for (const element_state of sorted_states_list_array) {
          let current_state = element_state;
          // let state_index = sorted_states_list_array.indexOf(current_state);
          let state_sales_total_array = [];
          let state_sales_sub_cat_total = 0;
          let cat_total_per_state_array = [];
          let cat_total_per_state = 0;

          for (let n = 0; n < fullData.length; n++) {
            if (
              fullData[n].category === category &&
              fullData[n].subCategory === subCategory &&
              fullData[n].state === current_state
            ) {
              //sum of sales per state in category
              state_sales_sub_cat_total =
                state_sales_sub_cat_total + Math.round(fullData[n].sales);
            }
          }
          for (let y = 0; y < fullData.length; y++) {
            if (
              fullData[y].category === category &&
              fullData[y].state === current_state
            ) {
              //sum of category totals per state
              cat_total_per_state =
                cat_total_per_state + Math.round(fullData[y].sales);
            }
          }
          cat_total_per_state_array.push(cat_total_per_state);
          sorted_category_total_per_state.push(cat_total_per_state_array[0]);

          state_sales_total_array.push(state_sales_sub_cat_total);
          sorted_state_sales_total.push(state_sales_total_array[0]);
        }

        sorted_state_sales_total.unshift(category, subCategory);
        sorted_state_sales_total.push(sub_cat_row_total);
        let subCatRow = sorted_state_sales_total.map(
          (single_state_sale_per_sub_category) => {
            return <td>{single_state_sale_per_sub_category}</td>;
          }
        );

        console.log("---end subcategory for " + subCategory + "---");
        display_data.push(<tr>{subCatRow}</tr>);
      }

      ////////////////////////
      let grand_cat_total = sorted_category_total_per_state.slice(
        0,
        number_of_states.length + 1
      );
      if (num == 0) {
        let category_grand_total = 0;
        for (let e = 0; e < grand_cat_total.length - 1; e++) {
          category_grand_total = category_grand_total + grand_cat_total[e];
        }
        grand_cat_total.splice(
          number_of_states.length,
          1,
          category_grand_total
        );
        num = 1;
      }
      //////////////////////////////////////////////////////////////////////////

      let catTotalRow = grand_cat_total
        // .splice(0, number_of_states.length + 1)
        .map((cat_total_per_state) => {
          return <td>{cat_total_per_state}</td>;
        });
      display_data.push(
        <tr className="cat-totals">
          <td>{category} Totals</td>
          <td></td>
          {catTotalRow}
        </tr>
      ); //state totals per category
      num = 0;
      console.log("End Category Block for " + category); ///////////////////
    }

    let final_state_array = [];
    let final_grand_total = [];
    for (let b = 0; b < fullData.length; b++) {
      final_state_array.push(fullData[b].state);
    }
    let sorted_final_states_list_array = final_state_array
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => {
        return a.toString().localeCompare(b);
      });

    for (const state of sorted_final_states_list_array) {
      let new_state = state;
      let state_grand_total = 0;
      for (let a = 0; a < fullData.length; a++) {
        if (fullData[a].state === new_state) {
          state_grand_total = state_grand_total + Math.round(fullData[a].sales);
        }
      }

      final_grand_total.push(state_grand_total);
      console.log(final_grand_total);
    }
    let grand_total_sum = 0;

    for (let d = 0; d < final_grand_total.length; d++) {
      grand_total_sum = grand_total_sum + final_grand_total[d];
    }

    final_grand_total.push(grand_total_sum);
    let grandTotalRow = final_grand_total.map((grand_total_per_state) => {
      return <td>{grand_total_per_state}</td>;
    });

    display_data.push(
      <tr className="top-border">
        <td>Grand Totals</td>
        <td></td>
        {grandTotalRow}
      </tr>
    ); //

    return display_data;
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th colSpan="2" className="text-left text-upper">
              Products
            </th>
            <th colSpan="51" className="text-left text-upper">
              States
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Category</th>
            <th>Sub-Category</th>
            {getStates(tableData)}
            <th className="text-left text-upper">Grand Total</th>
          </tr>
        </thead>

        <tbody>{getTableData(tableData)}</tbody>
      </table>
    </div>
  );
};

export default Table;
