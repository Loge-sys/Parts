import {
  Row,
  Col,
  Divider,
  Form,
  Input,
  Button,
  message,
  Layout,
  Menu,
  Breadcrumb,
  Modal,
  InputNumber,
  Select,
  Card,
} from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { push } from "connected-react-router";
import React, { Fragment, useEffect, useState } from "react";
import {
  loadToken,
  getToken,
  checkLogin,
  userId,
  loginRemove,
} from "../config/base";
import Helmet from "react-helmet";
import WebParts from "~/images/webparts.png";
import { BASE_URL } from "../../components/config/base";
import NotFound from "../../images/notfound.png";
import "./styles.scss";

const ListProducts = (props) => {
  const [list, setList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    getFieldValue,
    getFieldDecorator,
    validateFields,
    resetFields,
  } = props.form;

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  async function sendToPost() {
    validateFields(async (errors, values) => {
      if (!errors) {
        var formData = new FormData();
        formData.append("name", getFieldValue("name"));
        formData.append("price", getFieldValue("price"));
        formData.append("brand", getFieldValue("brand"));

        axios.post(`${BASE_URL}admin/products/register/${userId()}`, formData, {
          headers: {
            "X-CSRF-TOKEN": getToken(),
          },
        });

        message.success("Produto criado com sucesso!");
        resetFields();
        handleCancel();
        getData();
      } else {
        message.warn("Existe algum campo inválido.");
      }
    });
  }
  async function sendToPostDelete(id) {
    axios.delete(`${BASE_URL}admin/products/delete/${id}`, {
      headers: {
        "X-CSRF-TOKEN": getToken(),
      },
    });

    message.success("Produto deletado com sucesso!");
    getData();
  }
  const getData = async () => {
    axios.get(`${BASE_URL}admin/products/list/${userId()}`).then((response) => {
      setList(response.data);
    });
  };
  useEffect(() => {
    loadToken();
    getData();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Página Inicial</title>
        <meta name="description" content="Index" />
      </Helmet>

      <Row style={{ height: "100vh" }}>
        <Row style={{ backgroundColor: "red" }}>
          <Col md={24}>
            <img src={WebParts}></img>
          </Col>

          <Col md={4}>
            <span
              className="outline"
              style={{
                fontSize: 20,
                paddingTop: 20,
                paddingRight: 5,
              }}
              onClick={() => (window.location.href = "/")}
            >
              Voltar
            </span>
          </Col>
          <Col md={4}>
            <span
              className="outline"
              style={{
                paddingTop: 15,
                fontSize: 20,
                paddingRight: 5,
              }}
              onClick={() => showModal()}
            >
              Criar Produto
            </span>
          </Col>
          <Col md={4}>
            <span
              className="outline"
              onClick={() => {
                loginRemove();
                window.location.href = "/users/login";
              }}
              style={{
                fontSize: 20,
                paddingTop: 15,
                paddingRight: 5,
              }}
            >
              Sair
            </span>
          </Col>
        </Row>
        <h2 style={{ textAlign: "center", fontSize: 36, paddingTop: 20 }}>
          Meus Produtos
        </h2>
        <Row>
          {list.map((item) => (
            <Col md={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img src={NotFound} />}
              >
                <h2 style={{ textAlign: "center" }}>{item.name}</h2>
                <p>Marca: {item.brand}</p>
                <p>
                  Preço: <span style={{ color: "green" }}>R${item.price}</span>
                </p>
                <Col
                  md={24}
                  style={{ justifyContent: "flex-end", display: "flex" }}
                >
                  <Button
                    shape="round"
                    onClick={() => {
                      sendToPostDelete(item.id);
                      getData();
                    }}
                  >
                    {<DeleteOutlined />}Deletar
                  </Button>
                </Col>
              </Card>
            </Col>
          ))}
        </Row>
      </Row>
      <Modal
        title={"Criar Produto"}
        visible={isModalVisible}
        key="delete"
        footer={[
          <div
            className={"dadButtons"}
            style={{
              paddingLeft: 8,
              paddingRight: 7,
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <Button key="back" onClick={handleCancel} className={"btnRadius"}>
              Cancelar
            </Button>
            <Button
              key="submit"
              type="primary"
              onClick={() => sendToPost()}
              className={"btnRadius"}
            >
              Enviar
            </Button>
          </div>,
        ]}
      >
        <Form>
          <Row gutter={{ md: 12 }}>
            <Col md={12}>
              <Form.Item label="Nome do Produto">
                {getFieldDecorator("name", {
                  rules: [{ required: true, message: "Insira o nome" }],
                })(
                  <Input
                    size="large"
                    allowClear
                    placeholder="Insira o nome do produto, EX: Roda Civic"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label="Preço">
                {getFieldDecorator("price", {
                  rules: [{ required: true, message: "Insira o preço" }],
                })(
                  <InputNumber
                    size="large"
                    style={{ width: "100%" }}
                    allowClear
                    placeholder="Insira o preço do produto, EX: 5000"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label="Marca do Produto">
                {getFieldDecorator("brand", {
                  rules: [{ required: true, message: "Insira a marca" }],
                })(
                  <Select placeholder="Insira a marca do produto">
                    <Select.Option key={"FIAT"} value={"FIAT"}>
                      FIAT
                    </Select.Option>
                    <Select.Option key={"BMW"} value={"BMW"}>
                      BMW
                    </Select.Option>
                    <Select.Option key={"Volvo"} value={"Volvo"}>
                      Volvo
                    </Select.Option>
                    <Select.Option key={"Volkswagen"} value={"Volkswagen"}>
                      Volkswagen
                    </Select.Option>
                    <Select.Option key={"Honda"} value={"Honda"}>
                      Honda
                    </Select.Option>
                    <Select.Option key={"Hyundai"} value={"Hyundai"}>
                      Hyundai
                    </Select.Option>
                    <Select.Option key={"Lifan"} value={"Lifan"}>
                      Lifan
                    </Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Fragment>
  );
};
const createForm = Form.create({
  name: "ListProducts",
})(ListProducts);
export default createForm;
