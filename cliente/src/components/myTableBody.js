import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const MyTableBody = props => {
  const { children, color, rows, textWhite, onRowClick, ...attributes } = props;

  const classes = classNames(color, {
    "text-white": textWhite
  });

  return (
    <tbody {...attributes} className={classes}>
      {rows &&
        rows.map((row, index) => (
          <tr key={index} onClick={() => onRowClick(row)}>
            {Object.keys(row).map((key, index, array) => {
              if (key !== "colspan") {
                return array[index + 1] !== "colspan" ? (
                  <td key={key}>{row[key]}</td>
                ) : null;
              } else {
                return (
                  <td key={key} colSpan={row[key]}>
                    {row[array[index - 1]]}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      {children}
    </tbody>
  );
};

MyTableBody.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.object),
  textWhite: PropTypes.bool,
  onRowClick: PropTypes.func
};

MyTableBody.defaultProps = {
  textWhite: false
};

export default MyTableBody;
export { MyTableBody };