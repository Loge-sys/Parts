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

const ListAccounts = (props) => {
  const [list, setList] = useState([]);
  const { push } = props.history;

  const getData = async () => {
    axios.get(`${BASE_URL}admin/users/list`).then((response) => {
      setList(response.data);
    });
  };
  useEffect(() => {
    loadToken();
    getData();
  }, []);

  async function sendToPostDelete(id) {
    axios.delete(
      `${BASE_URL}admin/users/delete/${id}`,
      {
        headers: {
          "X-CSRF-TOKEN": getToken(),
        },
      },
      {}
    );

    message.success("Usuário deletado com sucesso!");
    getData();
  }
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
              onClick={() => push("/")}
            >
              Voltar
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
          Contas
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
                <p>Email: {item.email}</p>
                <p>
                  Admin: <span>{item.admin == 1 ? "Sim" : "Não"}</span>
                </p>
                <Col
                  md={24}
                  style={{ justifyContent: "flex-end", display: "flex" }}
                >
                  <Button
                    disabled={item.id == userId() ? true : false}
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
    </Fragment>
  );
};
export default ListAccounts;
