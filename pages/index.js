/**
 *  Author  : Josmy Jose(josmyjose21@gmail.com)
 *  Date    : 18-05-2019
 **/

import * as React from "react";
import stylesheet from "antd/dist/antd.min.css";
import { Table, Button, Row, Col, Icon, Input, Form } from "antd";
import Text from "antd/lib/typography/Text";
import EditableContext from "./constants";
import EditableCell from "./editableCell";
import Styles from "./style";

/**Creating App Component for rendering the complete layout including table */
class App extends React.Component {
  constructor(props) {
    super(props);
    /**  Intializing the State variables  */
    this.state = {
      count: 0,
      editingKey: "",
      disableButton:false,
      dataSource: [
      ]
    };
    /**Setting  the Columns for the table with properties title,dataIndex,key,editable and
     * render function for rendering components inside columns*/

    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        editable: true
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        editable: true
      },
      {
        title: "Edit",
        dataIndex: "edit",
        key: "edit",
        align: "center",
        render: (text, record) => {
          const editable = this.isEditing(record);
          const { dataSource, editingKey } = this.state;
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    href="javascript:;"
                    onClick={() => this.save(form, record.key)}
                    style={Styles.save}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>

              <a href="javascript:;" onClick={() => this.cancel(record.key)}>
                Cancel
              </a>
            </span>
          ) : (
            <a href="javascript:;" onClick={() => this.handleEdit(record.key)}>
              <Icon type="edit" style={Styles.icon} />
            </a>
          );
        }
      },
      {
        title: "Delete",
        dataIndex: "delete",
        key: "delete",
        align: "center",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <a
              href="javascript:;"
              onClick={() => {
                this.handleDelete(record.key);
              }}
            >
              <Icon type="delete" style={Styles.icon} />
            </a>
          ) : null
      }
    ];
  }

  /**Seting State to local Storage on ComponentDidUpdate  */
  componentDidUpdate() {
  
    localStorage.setItem('states', JSON.stringify(this.state))  
  }

  /**Getting the state from local Storage on ComponentDidMount */
  componentDidMount() {
    const data = localStorage.getItem('states')
    if(data) {
     
      this.setState(prevState => {
        return JSON.parse(data)
      })
    }
  }


  /**Funtion
   * name     :handleAdd
   * arguments:none
   * purpose  :updating the data source and incrementing count.
   * return   :none
   */

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name:"",
      email: "",
    };
    
      this.setState({
        dataSource: [...dataSource, newData],
        count: count + 1,
        editingKey:count,
        disableButton:true
      });
    
  
  };

  /**Funtion
   * name     :handleDelete
   * arguments:key(unique key of the row to be deleted)
   * purpose  :updating the data source and decrementing count.
   * return   :none
   */

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    const { count } = this.state;
   
    this.setState({
      count: count,
      dataSource: dataSource.filter(item => item.key !== key),
      disableButton:false
    });
  };

  /**Funtion
   * name     :handleEdit
   * arguments:key(unique key of the row to be Edited)
   * purpose  :setting the editing key to the current key value of the row.
   * return   :none
   */

  handleEdit = key => {
    this.setState({ editingKey: key });
  };

  /**Funtion
   * name     :isEditing
   * arguments:record( row to be Checked)
   * purpose  :checking whether editingKey and key of the current record same, return 
               true if same.Otherwise return false
   * return   :boolean value
   */

  isEditing = record => {
    const { editingKey } = this.state;
    return record.key === editingKey;
  };

  /**Funtion
   * name     :save
   * arguments:form,key
   * purpose  :Splice the old item,Update it with new item entered
   * return   :return false in case of any validation err
   */
  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.dataSource];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ dataSource: newData, editingKey: "" ,disableButton:false});
      } else {
        newData.push(row);
        this.setState({ dataSource: newData, editingKey: "",disableButton:false });
      }
    });
  }

  /**Funtion
   * name     :cancel
   * arguments:none
   * purpose  :Setting editingKey empty if user cancelled row editing
   * return   :return false in case of any validation err
   */

  cancel = () => {
    const { dataSource, count } = this.state;
    dataSource.map(item=>{
      if(item.name===""||item.email===""){
        this.setState({
          count:count-1,
          dataSource:dataSource.filter(item => item.key !== count-1),
          disableButton:false
        })
      }
    })
    this.setState({ editingKey: "" });
  };

  /**Rendering the Ui components */
  render() {
    const { dataSource, count,disableButton } = this.state;
    const components = {
      body: {
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "name" ? "text" : "email",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });
    return (
      <div style={Styles.container}>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Row type="flex">
          <Col>
            <Text style={{ fontWeight: "bold" }}>{dataSource.length} Users</Text>
          </Col>
          <Col />
          <Col />

          <Col offset={21}>
            <Button
              onClick={this.handleAdd}
              type="primary"
              style={!disableButton?Styles.button_add:null}
              disabled={disableButton}
            >
              Add User
            </Button>
          </Col>
        </Row>
        <Row>
          <EditableContext.Provider value={this.props.form}>
            <Table
              dataSource={dataSource}
              columns={columns}
              components={components}
            />
          </EditableContext.Provider>
        </Row>
      </div>
    );
  }
}
const EditableFormTable = Form.create()(App);

export default EditableFormTable;