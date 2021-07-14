import { Radio, Select, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  CustomInput,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";
import { showMessage } from "../../messageComponent";
import { getTypes } from "../api";
import {
  deleteWriting,
  getImage,
  getInfoWriting,
  getLevels,
  getOptions,
  postWriting,
  postWritingWasSaved,
} from "./api";

const { Step } = Steps;

const steps = [
  {
    title: "Nhập nội dung",
  },
  {
    title: "Lựa chọn yêu cầu",
  },
];

const Stepp = (props) => {
  const { orderID } = props;
  let isUpdate = false;
  if (Number.isNaN(orderID)) {
    isUpdate = false;
  } else isUpdate = true;

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const [loading, setLoading] = useState(false);
  const [loadPay, setLoadPay] = useState(false);
  const [loadDel, setLoadDel] = useState(false);

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [level, setLevel] = useState(0);
  const [type, setType] = useState(0);
  const [optionScore, setOptionScore] = useState([0, 1]);
  const [optionTime, setOptionTime] = useState(4);
  const [optionsTotal, setOptionsTotal] = useState([0, 1]);

  const [options, setOptions] = useState([]);
  const [levels, setLevels] = useState([]);
  const [types, setTypes] = useState([]);

  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    if (isUpdate) {
      getInfoWriting(
        orderID,
        setOptionsTotal,
        setOptionTime,
        setOptionScore,
        setTitle,
        setContent,
        setType,
        setLevel,
        setLoading
      );
      getImage(orderID, setBase64Image);
    }

    getLevels(setLevels);
    getOptions(setOptions);
    getTypes(setTypes);
  }, [isUpdate, orderID]);

  const levelList = levels.map((level) => (
    <Radio.Button
      value={level.level_id}
      key={level.level_id}
      style={{ margin: "0px 8px" }}
    >
      {level.level_name}
    </Radio.Button>
  ));

  const typeList = types.map(
    (type) =>
      type.type_id !== 0 && (
        <option value={type.type_id}>{type.type_name}</option>
      )
  );

  const optionList = options.map(
    (option) =>
      option.option_type === 0 && (
        <>
          {(option.option_id === 0 || option.option_id === 1) && (
            <Select.Option
              value={option.option_id}
              key={option.option_id}
              label={option.option_name}
              disabled
            >
              {option.option_name}
            </Select.Option>
          )}
          {option.option_id !== 1 && option.option_id !== 0 && (
            <Select.Option
              value={option.option_id}
              key={option.option_id}
              label={option.option_name}
            >
              {option.option_name}
            </Select.Option>
          )}
        </>
      )
  );
  const optionTimeList = options.map(
    (option) =>
      option.option_type === 1 && (
        <>
          <Radio
            style={{ padding: "5px" }}
            value={option.option_id}
            key={option.option_id}
          >
            {option.option_name} giờ
          </Radio>
        </>
      )
  );

  function handleChangeOptionScore(value) {
    setOptionScore(value);
    setOptionsTotal(value);
  }

  function handleChangeLevel(e) {
    const level = e.target.value;
    setLevel(level);
    if (level === 0) {
      setType(0);
    } else {
      setType(1);
    }
  }
  function showElementInCart(name, price) {
    return (
      <div className="row" style={{ marginBottom: "20px" }}>
        <div className="col col-7">{name}:</div>
        <div className="col" style={{ textAlign: "right" }}>
          {price} VNĐ
        </div>
      </div>
    );
  }
  function showType(id) {
    return types.map(
      (type) =>
        type.type_id === id &&
        showElementInCart(type.type_name, type.type_price)
    );
  }

  const showOptionScore = optionScore.map((id) => {
    return options.map(
      (option) =>
        option.option_id === id &&
        showElementInCart(option.option_name, option.option_price)
    );
  });

  function showTime(id) {
    return options.map(
      (option) =>
        option.option_id === id &&
        showElementInCart(option.option_name, option.option_price)
    );
  }

  function checkNextButton() {
    if (!title) {
      showMessage("Bạn chưa nhập đề bài, vui lòng kiểm tra lại!", "warning");
    } else {
      if (!base64Image && !content) {
        showMessage(
          "Bạn chưa nhập nội dung hoặc thêm hình ảnh, vui lòng kiểm tra lại!",
          "warning"
        );
      } else {
        next();
      }
    }
  }

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    const a = base64.split(",");
    setBase64Image(a[1]);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSave = (e) => {
    if (!title) {
      showMessage("Bạn chưa nhập đề bài, vui lòng kiểm tra lại!", "warning");
    } else {
      if (!base64Image && !content) {
        showMessage(
          "Bạn chưa nhập nội dung hoặc thêm hình ảnh, vui lòng kiểm tra lại!",
          "warning"
        );
      } else {
        if (!optionScore) {
          showMessage(
            "Bạn chưa chọn phương thức chấm điểm, vui lòng kiểm tra lại!",
            "warning"
          );
        } else {
          setLoading(true);
          if (!isUpdate) {
            optionsTotal.push(optionTime);
            postWriting(
              props,
              0,
              title,
              content,
              type,
              optionsTotal,
              base64Image,
              setLoading,
              "Bài viết của bạn đã được lưu vào giỏ hàng!",
              "/HomeStudentPage/Cart"
            );
          } else {
            optionsTotal.push(optionTime);
            postWritingWasSaved(
              props,
              orderID,
              title,
              content,
              type,
              optionsTotal,
              0,
              setLoading,
              "Bài viết của bạn đã được cập nhật và lưu vào giỏ hàng!",
              "/HomeStudentPage/Cart"
            );
          }
        }
      }
    }
  };

  const handlePayment = (e) => {
    if (!title) {
      showMessage("Bạn chưa nhập đề bài, vui lòng kiểm tra lại!", "warning");
    } else {
      if (!base64Image && !content) {
        showMessage(
          "Bạn chưa nhập nội dung hoặc thêm hình ảnh, vui lòng kiểm tra lại!",
          "warning"
        );
      } else {
        if (!optionScore) {
          showMessage(
            "Bạn chưa chọn phương thức chấm điểm, vui lòng kiểm tra lại!",
            "warning"
          );
        } else {
          setLoadPay(true);
          if (!isUpdate) {
            optionsTotal.push(optionTime);
            postWriting(
              props,
              1,
              title,
              content,
              type,
              optionsTotal,
              base64Image,
              setLoadPay,
              "Bài viết của bạn đã được thanh toán và đang tìm giáo viên chấm!",
              "/HomeStudentPage"
            );
          } else {
            optionsTotal.push(optionTime);
            postWritingWasSaved(
              props,
              orderID,
              title,
              content,
              type,
              optionsTotal,
              1,
              setLoading,
              "Bài viết của bạn đã được thanh toán và đang tìm giáo viên chấm!",
              "/HomeStudentPage"
            );
          }
        }
      }
    }
  };

  const handleDelete = (e) => {
    setLoadDel(true);
    if (!isUpdate) {
      showMessage("Bài viết của bạn đã được hủy!", "success");
      props.history.push("/HomeStudentPage/Cart");
    } else {
      deleteWriting(props, orderID, setLoadDel);
    }
  };

  return (
    <div style={{ marginBottom: "100px" }} className="shadow-background">
      <Steps
        current={current}
        style={{
          backgroundColor: "rgb(243, 243, 243)",
          padding: "10px 160px 10px 160px",
          display: "inline-flex",
        }}
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ backgroundColor: "white", padding: "10px" }}>
        <div className="row  padding">
          {current < steps.length - 1 && (
            <div className="action mr-auto mt-2">
              <Button
                className="btn-homepage "
                color="primary"
                style={{ margin: "0 8px " }}
                onClick={handleSave}
              >
                {loading ? "Đang xử lý..." : "Lưu bài viết"}
              </Button>
              <Button
                className="btn-homepage btn-primary btn-outline-primary"
                outline
                color="primary"
                onClick={() => checkNextButton()}
              >
                Tiếp tục
              </Button>
            </div>
          )}
          {current > 0 && (
            <div className="action mr-auto mt-2">
              <Button
                className="btn-homepage "
                color="primary"
                style={{ margin: "0 8px " }}
                onClick={handleSave}
              >
                {loading ? "Đang xử lý..." : "Lưu bài viết"}
              </Button>
              <Button
                className="btn-homepage btn-primary btn-outline-primary"
                outline
                color="primary"
                style={{ margin: "0 8px" }}
                onClick={() => prev()}
              >
                Quay lại
              </Button>
            </div>
          )}
        </div>
        <div className="row bg-row padding ">
          {current === 0 && (
            <div className="container-fluid mt-2">
              <Form>
                <FormGroup row>
                  <Label for="title" sm={2}>
                    Đề bài
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="textarea"
                      name="title"
                      id="title"
                      placeholder="Nhập đề bài"
                      required
                      onChange={(e) => setTitle(e.target.value)}
                      defaultValue={title}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="image" sm={2}>
                    Ảnh đính kèm
                  </Label>
                  <Col sm={10}>
                    <CustomInput
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={(e) => {
                        uploadImage(e);
                      }}
                    />
                    {base64Image && (
                      <img
                        src={`data:image/jpeg;base64,${base64Image}`}
                        alt="Title or Content"
                      ></img>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="content" sm={2}>
                    Nội dung
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="textarea"
                      name="content"
                      id="content"
                      placeholder="Nhập nội dung bài viết"
                      rows="15"
                      onChange={(e) => setContent(e.target.value)}
                      defaultValue={content}
                      maxLength={1000}
                    />
                    <FormText color="muted">Độ dài tối đa: 1000 chữ.</FormText>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          )}
          {current === 1 && (
            <div className="container-fluid mt-2">
              <div className="row ">
                <div className="col-7">
                  <Form>
                    <FormGroup row>
                      <Label for="level" sm={3}>
                        Trình độ
                      </Label>
                      <Col sm={9}>
                        <Radio.Group
                          defaultValue={level}
                          onChange={handleChangeLevel}
                        >
                          {levelList}
                        </Radio.Group>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="type" sm={3}>
                        Thể loại bài viết
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="select"
                          name="type"
                          id="type"
                          disabled={!level}
                          value={type}
                          onChange={(e) => setType(Number(e.target.value))}
                        >
                          {typeList}
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="optionScore" sm={3}>
                        Lựa chọn sửa bài
                      </Label>
                      <Col sm={9}>
                        <Select
                          id="optionScore"
                          mode="multiple"
                          allowClear="false"
                          style={{ width: "100%" }}
                          placeholder="Please select at least one option"
                          value={optionScore}
                          onChange={handleChangeOptionScore}
                          optionLabelProp="label"
                        >
                          {optionList}
                        </Select>
                      </Col>
                    </FormGroup>
                    <FormGroup row style={{ marginTop: "30px" }}>
                      <Label for="optionTime" sm={3}>
                        Lựa chọn thời gian chấm
                      </Label>
                      <Col sm={9}>
                        <Radio.Group
                          defaultValue={optionTime}
                          onChange={(e) => setOptionTime(e.target.value)}
                        >
                          {optionTimeList}
                        </Radio.Group>
                      </Col>
                    </FormGroup>
                  </Form>
                </div>
                <div className="col-5">
                  <Card style={{ minHeight: "250px" }}>
                    <CardHeader
                      style={{
                        fontSize: "large",
                        color: "#2596be",
                        fontWeight: "900",
                      }}
                    >
                      <i className="fa fa-cart-arrow-down fa-xl" /> Giỏ hàng
                    </CardHeader>
                    <CardBody>
                      <div className="container-fluid">
                        {showType(type)}
                        {showOptionScore}
                        {showTime(optionTime)}
                      </div>

                      <hr />
                    </CardBody>
                  </Card>

                  <Button
                    outline
                    color="success"
                    block
                    className="mb-1 mt-1"
                    onClick={handlePayment}
                  >
                    {loadPay ? "Đang xử lý..." : "Xác nhận thanh toán"}
                  </Button>
                  <Button
                    outline
                    color="danger"
                    block
                    className="mb-1 mt-1"
                    onClick={handleDelete}
                  >
                    {loadDel ? "Đang xử lý..." : "Hủy"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Stepp);
