import React, { useState, useEffect } from "react";
import data from "../data/Data.json";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(data);
  }, []);
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
          {tableData
            .map((saleOne) => saleOne.state)
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort((a, b) => {
              return a.localeCompare(b);
            })
            .map((stateOne) => {
              return <th>{stateOne}</th>;
            })}
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
                    {tableData
                      .map((sale3) => sale3.subCategory)
                      // .filter((item) => item.category === category)
                      .filter(
                        (value, index, self) => self.indexOf(value) === index
                      )
                      .sort((a, b) => {
                        return a.localeCompare(b);
                      })
                      .map((subCat) => {
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
