import { Radio, Select, Spin, Steps } from "antd";
import React, { useCallback, useEffect, useState } from "react";
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
import { getTypes } from "../../api";
import { formatNumber, showMessage } from "../../commonFormat";
import {
  apiPostWriting,
  apiPostWritingWasSaved,
  deleteWriting,
  getImage,
  getInfoWriting,
  getLevels,
  getOptions,
  putInfoCreditCard,
} from "./api";
import { ContinuePayment, InputInfoCard, Invoice } from "./payment";

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
  const [spinning, setSpinning] = useState(false);
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
  const [totalPrice, setTotalPrice] = useState(0);

  const [modalInvoice, setModalInvoice] = useState(false);
  const [modalContinue, setModalContinue] = useState(false);
  const [modalInputCard, setModalInputCard] = useState(false);

  const [isHasCard, setIsHasCard] = useState(false);
  const [infoCard, setInfoCard] = useState();
  const [callApiPaymentMethod, setCallApiPaymentMethod] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await getTypes(setTypes);
      getLevels(setLevels);
      getOptions(setOptions);

      if (isUpdate) {
        setSpinning(true);
        getInfoWriting(
          orderID,
          setOptionsTotal,
          setOptionTime,
          setOptionScore,
          setTitle,
          setContent,
          setType,
          setLevel,
          setLoading,
          setSpinning
        );
        getImage(orderID, setBase64Image);
      }
    }
    fetchData();
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
        <option value={type.type_id} key={type.type_id}>
          {type.type_name}
        </option>
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

  const caculateSumaryPrice = useCallback(
    (e) => {
      let total = 0;
      const typeEl = types.find((typeEl) => typeEl.type_id === type);
      typeEl ? (total = total + typeEl.type_price) : (total += 0);

      for (let id = 0; id < optionScore.length; id++) {
        const optionEl = options.find((optionEl) => optionEl.option_id === id);
        optionEl ? (total = total + optionEl.option_price) : (total += 0);
      }

      const optionTimeEl = options.find(
        (optionEl) => optionEl.option_id === optionTime
      );
      optionTimeEl ? (total = total + optionTimeEl.option_price) : (total += 0);

      setTotalPrice(total);
    },
    [types, options, type, optionTime, optionScore]
  );

  useEffect(() => {
    caculateSumaryPrice();
  }, [types, options, type, optionTime, optionScore, caculateSumaryPrice]);

  function showElementInCart(name, price) {
    return (
      <div className="row" style={{ marginBottom: "20px" }} key={name}>
        <div className="col col-7">{name}:</div>
        <div className="col" style={{ textAlign: "right" }}>
          {formatNumber(price)} VNĐ
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

  const handleSave = () => {
    handlePostWriting(true);
  };

  const handlePayment = () => {
    handlePostWriting(false);
  };
  const handlePostWriting = (isSaved) => {
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
          optionsTotal.push(optionTime);
          setLoadPay(true);
          if (!isUpdate) {
            apiPostWriting(
              props,
              title,
              content,
              type,
              optionsTotal,
              base64Image,
              isSaved,
              setLoading
            );
          } else {
            apiPostWritingWasSaved(
              props,
              orderID,
              title,
              content,
              type,
              optionsTotal,
              isSaved,
              setLoading
            );
          }
        }
      }
    }
  };

  const handleDelete = () => {
    setLoadDel(true);
    if (!isUpdate) {
      showMessage("Bài viết của bạn đã được hủy!", "success");
      props.history.push("/HomeStudentPage/Cart");
    } else {
      deleteWriting(props, orderID, setLoadDel);
    }
  };

  const toggleInvoice = () => {
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
          setModalInvoice(!modalInvoice);
        }
      }
    }
  };
  function handleChangeInvoice(modal) {
    setModalInvoice(modal);
    setCallApiPaymentMethod(false);
  }

  function handleChangeInvoiceWithApi(modal, isHasCard, infoCard, isCallApi) {
    setModalInvoice(modal);
    setInfoCard(infoCard);
    setIsHasCard(isHasCard);
    setCallApiPaymentMethod(isCallApi);
    isHasCard === true ? setModalContinue(true) : setModalInputCard(true);
  }

  function handleChangeContinuePayment(modal) {
    setModalContinue(modal);
  }

  function handleChangeInputCard(modal) {
    setModalInputCard(modal);
  }

  const handleUpdateInfoCard = (provider, accountNo, expiryDate) => {
    putInfoCreditCard(
      provider,
      accountNo,
      expiryDate,
      setIsHasCard,
      setInfoCard,
      setCallApiPaymentMethod,
      totalPrice
    );
  };

  return (
    <Spin spinning={spinning}>
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
                        maxLength={2500}
                      />
                      <FormText color="muted">Độ dài tối đa: 2500.</FormText>
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
                          <hr />
                          <div
                            className="row"
                            style={{
                              marginBottom: "20px",
                              fontSize: "20px",
                              color: "green",
                            }}
                          >
                            <div className="col col-7">Tổng:</div>
                            <div className="col" style={{ textAlign: "right" }}>
                              {formatNumber(totalPrice)} VNĐ
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Button
                      outline
                      color="success"
                      block
                      className="mb-1 mt-1"
                      onClick={toggleInvoice}
                    >
                      {loadPay ? "Đang xử lý..." : "Xác nhận thanh toán"}
                      <Invoice
                        modal={modalInvoice}
                        type={showType(type)}
                        optionScore={showOptionScore}
                        time={showTime(optionTime)}
                        total={totalPrice}
                        onClick={handleChangeInvoice}
                        onCallApi={handleChangeInvoiceWithApi}
                      ></Invoice>
                      {callApiPaymentMethod === true && isHasCard === true && (
                        <ContinuePayment
                          modal={modalContinue}
                          onCancel={handleChangeContinuePayment}
                          infoCard={infoCard}
                          amount={totalPrice}
                          onOk={handlePayment}
                        ></ContinuePayment>
                      )}
                      {callApiPaymentMethod === true && isHasCard === false && (
                        <InputInfoCard
                          modal={modalInputCard}
                          onCancel={handleChangeInputCard}
                          onOk={handleUpdateInfoCard}
                        ></InputInfoCard>
                      )}
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
    </Spin>
  );
};

export default withRouter(Stepp);
