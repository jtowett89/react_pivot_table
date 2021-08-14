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
    let categories_array = [];
    for (let i = 0; i < data.length; i++) {
      categories_array.push(data[i].category);
    }
    let sorted_categories_array = categories_array
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => {
        return a.toString().localeCompare(b);
      });
    sorted_categories_array.forEach((item, index, data) => {
      let sub_categories_array = [];
      let category = item;
      for (let j = 0; j < data.length; j++) {
        if (data.category === category) {
          sub_categories_array.push(data[j].subCategory);
        }
      }
      let sorted_sub_categories_array = sub_categories_array
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort((a, b) => {
          return a.toString().localeCompare(b);
        });
      sorted_sub_categories_array.forEach((item, index, data) => {
        let states_list_array = [];
        let subCategory = item;
        for (let k = 0; k < data.length; k++) {
          states_list_array.push(data[k].state);
        }
        let sorted_states_list_array = states_list_array
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort((a, b) => {
            return a.toString().localeCompare(b);
          });
        sorted_states_list_array.forEach((item, index, data) => {
          let current_state = item;
          let row_sales_array = [];
          for (let n = 0; n < data.length; n++) {
            if (
              data.category === category &&
              data.subCategory === subCategory &&
              data.state === current_state
            ) {
            }
          }
        });
      });
    });
    // return sorted_categories;
  };

  let getSubCategories = (data) => {
    let sub_categories_array = [];
    for (let i = 0; i < data.length; i++) {
      sub_categories_array.push(data[i].subCategory);
    }
    return sub_categories_array
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => {
        return a.toString().localeCompare(b);
      });
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
          {tableData
            .map((sale2) => sale2.category)
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort((a, b) => {
              return a.localeCompare(b);
            })
            .map((category1) => {
              return (
                <>
                  <tr>
                    <td>{category1}</td>
                    {getSubCategories(tableData).map((subCat) => {
                      return (
                        <>
                          <td>{subCat}</td>
                          {}
                        </>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="grey">{category1} totals</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
