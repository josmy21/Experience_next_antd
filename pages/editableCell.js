/**
 *  Author  : Josmy Jose(josmyjose21@gmail.com)
 *  Date    : 18-05-2019
 **/

/**Component EditableCell component for rendering editable cell in the table */

import * as React from "react";
import stylesheet from "antd/dist/antd.min.css";
import { Table, Button, Row, Col, Icon, Input, Form, Popconfirm } from "antd";
import Text from "antd/lib/typography/Text";
import EditableContext from "./constants";

export default class EditableCell extends React.Component {
  constructor(props) {
    super(props);
  }

  /**Funtion
   * name     :getInput
   * arguments:none
   * purpose  :If input type is email render Input with type email otherwise text
   * return   :return Input with type email or Normal Input
   */
  getInput = () => {
    if (this.props.inputType === "text") {
      return <Input placeholder="Enter Name"/>;
    }
    return <Input type="email"  placeholder="Enter Email"/>;
  };

  /**Funtion
   * name     :renderCell
   * arguments:getFieldDecorator
   * purpose  :Return Input Type with Decorator in case of no value,value not in formatt
   * return   :tablecell ui component
   */
  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {dataIndex === "name"
              ? getFieldDecorator(dataIndex, {
                  rules: [
                    {
                      required: true,
                      message: `Please Input ${title}!`
                    }
                  ],
                  initialValue: record[dataIndex]
                })(this.getInput())
              : getFieldDecorator(dataIndex, {
                  rules: [
                    {
                      required: true,
                      message: `Please Input ${title}!`,
                      type: "email"
                    }
                  ],
                  initialValue: record[dataIndex]
                })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}
