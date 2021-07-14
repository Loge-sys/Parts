import { Row, Col, Divider, Form, Input, Button, message, Modal } from "antd";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-feather";
import Helmet from "react-helmet";
import { toast } from "react-toastify";
import WebParts from "~/images/webparts.png";
import {
  getToken,
  loadToken,
  loginAccount,
  loginRemove,
  userId,
} from "../config/base";
import { BASE_URL } from "../../components/config/base";

const UserLogin = (props) => {
  const { push } = props.history;
  const {
    getFieldDecorator,
    getFieldValue,
    resetFields,
    setFieldsValue,
    validateFields,
  } = props.form;

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    loadToken();
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  async function sendToPostCreate() {
    validateFields(async (errors, values) => {
      if (!errors) {
        var formData = new FormData();
        formData.append("email", getFieldValue("email"));
        formData.append("name", getFieldValue("name"));
        formData.append("password", getFieldValue("password"));

        axios.post(
          `${BASE_URL}admin/users/register`,
          formData,
          {
            headers: {
              "X-CSRF-TOKEN": getToken(),
            },
          },
          {}
        );

        message.success("Conta criada com sucesso, agora insira os dados!");
        resetFields();
        handleCancel();
      } else {
        message.warn("Existe algum campo inválido.");
      }
    });
  }
  async function sendToPost() {
    validateFields(async (errors, values) => {
      if (!errors.email && !errors.password) {
        var formData = new FormData();
        formData.append("email", getFieldValue("email"));
        formData.append("password", getFieldValue("password"));

        axios
          .post(
            `${BASE_URL}admin/users/login`,
            formData,
            {
              headers: {
                "X-CSRF-TOKEN": getToken(),
              },
            },
            {}
          )
          .then((response) => {
            if (response.data.error == false) {
              loginAccount(response.data.id);
              message.success("Correto, enviando você ao nosso sistema.");
              resetFields();

              push("/");
            } else {
              response.data.type == 1
                ? message.error("E-mail inexistente em nosso banco")
                : message.error("Senha incorreta, tente novamente.");
            }
          });
      } else {
        message.warning("Existem campos não preenchidos.");
      }
    });
  }
  return (
    <Fragment>
      <Helmet>
        <title>Entrar</title>
        <meta name="description" content="Login" />
      </Helmet>

      <Row style={{ height: "100vh" }}>
        <Row style={{ backgroundColor: "red" }}>
          <Col md={12}>
            <img src={WebParts}></img>
          </Col>
        </Row>
        <Col md={24} style={{ paddingTop: 150 }}></Col>
        <Col md={8}></Col>

        <Col md={8} style={{ backgroundColor: "white" }}>
          <div style={{ backgroundColor: "white" }}>
            <h2 style={{ textAlign: "center", color: "red" }}>Login</h2>
            <Divider />
            <Col md={24}>
              <Form.Item label="Email">
                {getFieldDecorator("email", {
                  rules: [{ required: true, message: "Insira seu email..." }],
                })(
                  <Input
                    size="large"
                    allowClear
                    placeholder="Insira seu email"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={24}>
              <Form.Item label="Senha">
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "Insira sua senha..." }],
                })(
                  <Input.Password
                    allowClear
                    size="large"
                    placeholder="Insira sua senha"
                  />
                )}
              </Form.Item>
            </Col>

            <Col
              md={12}
              style={{
                paddingTop: 15,
              }}
            >
              <Button
                shape="round"
                size="large"
                style={{ backgroundColor: "gray", color: "white" }}
                onClick={() => showModal()}
              >
                Cadastrar
              </Button>
            </Col>
            <Col
              md={12}
              style={{
                justifyContent: "flex-end",
                display: "flex",
                paddingTop: 15,
              }}
            >
              <Button
                shape="round"
                size="large"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => sendToPost()}
              >
                Entrar
              </Button>
            </Col>
            <Col md={24} style={{ paddingTop: 25 }}></Col>
          </div>
        </Col>
        <Col md={8}></Col>
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
              onClick={() => sendToPostCreate()}
              className={"btnRadius"}
            >
              Cadastrar
            </Button>
          </div>,
        ]}
      >
        <Form>
          <Row gutter={{ md: 12 }}>
            <Col md={12}>
              <Form.Item label="Nome">
                {getFieldDecorator("name", {
                  rules: [{ required: true, message: "Insira o nome" }],
                })(
                  <Input
                    size="large"
                    allowClear
                    placeholder="Insira o seu nome"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label="Email">
                {getFieldDecorator("email", {
                  rules: [{ required: true, message: "Insira o seu email" }],
                })(
                  <Input
                    size="large"
                    allowClear
                    placeholder="Insira o seu email"
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label="Senha">
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "Insira a sua senha" }],
                })(<Input size="large" placeholder="Insira sua senha" />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Fragment>
  );
};

const createForm = Form.create({
  name: "UserLogin",
})(UserLogin);
export default createForm;
