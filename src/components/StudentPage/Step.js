import React, { useEffect, useState } from 'react';
import { Steps, Radio, Select } from 'antd';
import { Form, FormGroup, Input, Label, Col, CustomInput, FormText, Button, Card, CardHeader, CardBody, Alert } from 'reactstrap';
import { getBaseURL, getToken } from '../../Utils/Common';
import { withRouter } from 'react-router';

const { Step } = Steps;

const api = getBaseURL();

const steps = [
  {
    title: 'Nhập nội dung',
  },
  {
    title: 'Lựa chọn yêu cầu',
  },
];



const Stepp = (props) => {
  const {
    orderID
  } = props;
  let isUpdate = false;
  if (Number.isNaN(orderID)) {
    isUpdate = false;
  }
  else
    isUpdate = true;

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [colorAlert, setColorAlert] = useState("warning");
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
    async function fetchData() {
      if (isUpdate) {
        await api.get('/orders/' + orderID, {
          headers: { Authorization: 'Bearer ' + getToken() }
        }
        ).then(response => {
          const essay = response.data.essay;
          const optionsS = response.data.option_list;
          setOptionsTotal(optionsS);
          setOptionTime(optionsS[optionsS.length - 1]);
          optionsS.pop();
          setOptionScore(optionsS)
          setTitle(essay.title);
          setContent(essay.content);
          setType(essay.type_id);
          if (essay.type_id === 0) {
            setLevel(0);
          }
          else {
            setLevel(1);
          }

        }).catch((error) => {
          if (error.response) {
            setLoading(false);
            if (error.response.status === 401 || error.response.status === 400 || error.response.status === 403) {
              setShow(true);
              setColorAlert("danger");
              setError(error.response.data.detail);
            }
            else {
              setShow(true);
              setColorAlert("danger");
              setError("Something went wrong. Please try again later!");
            }

          }
        })
        api.get('/orders/image/' + orderID, {
          headers: { Authorization: 'Bearer ' + getToken() }
        }).then(response => {
          setBase64Image(response.data.image_base64);
        })

      };

      await api.get('/levels',).then(response => {
        setLevels(response.data.data);
      });
      await api.get('/options',).then(response => {
        setOptions(response.data.data);
      });
      await api.get('/types',).then(response => {
        setTypes(response.data.data);
      });


    }
    fetchData();

  }, [isUpdate, orderID]);

  const levelList = levels.map((level) => (
    <Radio.Button value={level.level_id} key={level.level_id} style={{ margin: '0px 8px' }}>{level.level_name}</Radio.Button>
  ));

  const typeList = types.map((type) => (
    type.type_id !== 0 && (
      <option value={type.type_id}>{type.type_name}</option>
    )
  ));

  const optionList = options.map((option) => (
    option.option_type === 0 && (
      <>
        {option.option_id === 0 &&
          <Select.Option value={option.option_id} key={option.option_id} label={option.option_name} disabled>
            {option.option_name}
          </Select.Option>
        }
        {option.option_id === 1 &&
          <Select.Option value={option.option_id} key={option.option_id} label={option.option_name} disabled>
            {option.option_name}
          </Select.Option>
        }
        {option.option_id !== 1 && option.option_id !== 0 &&
          <Select.Option value={option.option_id} key={option.option_id} label={option.option_name} >
            {option.option_name}
          </Select.Option>
        }
      </>

    )
  ));
  const optionTimeList = options.map((option) => (
    option.option_type === 1 && (
      <>
        <Radio style={{ padding: "5px" }} value={option.option_id} key={option.option_id}>{option.option_name} giờ</Radio>
      </>
    )
  ));

  function handleChangeOptionScore(value) {
    setOptionScore(value);
    setOptionsTotal(value);
  }

  function handleChangeLevel(e) {
    const level = e.target.value;
    setLevel(level);
    if (level === 0) {
      setType(0);
    }
    else {
      setType(1);
    }
  }

  function showType(id) {
    return types.map((type) => (
      type.type_id === id && (
        <div className="row" style={{ marginBottom: '20px' }}>
          <div className="col col-7">{type.type_name}:</div>
          <div className="col" style={{ textAlign: 'right' }}>{type.type_price} VNĐ</div>
        </div>
      )
    ))
  }

  const showOptionScore = optionScore.map((id) => {
    return options.map((option) => (
      option.option_id === id && (
        <div className="row" style={{ marginBottom: '20px' }}>
          <div className="col col-7">{option.option_name}:</div>
          <div className="col" style={{ textAlign: 'right' }}>{option.option_price} VNĐ</div>
        </div>
      )
    ))
  })


  function showTime(id) {
    return options.map((option) => (
      option.option_id === id && (
        <div className="row" style={{ marginBottom: '20px' }}>
          <div className="col col-7">{option.option_name}:</div>
          <div className="col" style={{ textAlign: 'right' }}>{option.option_price} VNĐ</div>
        </div>
      )))
  }

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    const a = base64.split(",");
    setBase64Image(a[1]);
  }
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error)
      };
    });
  };


  const handleSave = (e) => {
    if (!title) {
      setShow(true);
      setColorAlert("warning");
      setError("Bạn chưa nhập đề bài, vui lòng kiểm tra lại!");
    }
    else {
      if (!base64Image && !content) {
        setShow(true);
        setColorAlert("warning");
        setError("Bạn chưa nhập nội dung hoặc thêm hình ảnh, vui lòng kiểm tra lại!");
      }
      else {
        if (!optionScore) {
          setShow(true);
          setColorAlert("warning");
          setError("Bạn chưa chọn phương thức chấm điểm, vui lòng kiểm tra lại!");
        }
        else {
          setLoading(true);
          if (!isUpdate) {
            optionsTotal.push(optionTime);
            api.post('/orders?status_id=0', {
              "essay": {
                "title": title,
                "content": content,
                "type_id": type,
              },
              "option_list": optionsTotal
            },
              {
                headers: { 'Authorization': 'Bearer ' + getToken() },
              }).then(response => {
                api.put('orders/image/' + response.data.order_id, {
                  "base64": base64Image,
                },
                  {
                    headers: { 'Authorization': 'Bearer ' + getToken() },
                  }).then(response => {
                    setLoading(false);
                    setShow(true);
                    setColorAlert("success");
                    alert("Bài viết của bạn đã được lưu vào giỏ hàng!");
                    props.history.push("/HomeStudentPage/Cart");
                  }).catch((error) => {
                    if (error.response) {
                      setLoading(false);
                      if (error.response.status === 401 || error.response.status === 400) {
                        setShow(true);
                        setColorAlert("danger");
                        setError(error.response.data.detail);
                      }
                      else {
                        setShow(true);
                        setColorAlert("danger");
                        setError("Something went wrong. Please try again later!");
                      }

                    }
                  })

              }).catch((error) => {
                if (error.response) {
                  setLoading(false);
                  if (error.response.status === 401 || error.response.status === 400) {
                    setShow(true);
                    setColorAlert("danger");
                    setError(error.response.data.detail);
                  }
                  else {
                    setShow(true);
                    setColorAlert("danger");
                    setError("Something went wrong. Please try again later!");
                  }

                }
              })
          }
          else {
            optionsTotal.push(optionTime);
            api.put('/orders/saved/' + orderID, {
              "essay": {
                "title": title,
                "content": content,
                "type_id": type
              },
              "option_list": optionsTotal,
              "status_id": 0
            },
              {
                headers: { 'Authorization': 'Bearer ' + getToken() },
              }).then(response => {
                setLoading(false);
                setShow(true);
                setColorAlert("success");
                alert("Bài viết của bạn đã được cập nhật và lưu vào giỏ hàng!");
                props.history.push("/HomeStudentPage/Cart");
              }).catch((error) => {
                if (error.response) {
                  setLoading(false);
                  if (error.response.status === 401 || error.response.status === 400) {
                    setShow(true);
                    setColorAlert("danger");
                    setError(error.response.data.detail);
                  }
                  else {
                    setShow(true);
                    setColorAlert("danger");
                    setError("Something went wrong. Please try again later!");
                  }

                }
              })
          }


        }
      }
    }

  }


  const handlePayment = (e) => {
    if (!title) {
      setShow(true);
      setColorAlert("warning");
      setError("Bạn chưa nhập đề bài, vui lòng kiểm tra lại!");
    }
    else {
      if (!base64Image && !content) {
        setShow(true);
        setColorAlert("warning");
        setError("Bạn chưa nhập nội dung hoặc thêm hình ảnh, vui lòng kiểm tra lại!");
      }
      else {
        if (!optionScore) {
          setShow(true);
          setColorAlert("warning");
          setError("Bạn chưa chọn phương thức chấm điểm, vui lòng kiểm tra lại!");
        }
        else {
          setLoadPay(true);
          if (!isUpdate) {
            optionsTotal.push(optionTime);
            api.post('/orders?status_id=1', {
              "essay": {
                "title": title,
                "content": content,
                "type_id": type
              },
              "option_list": optionsTotal
            },
              {
                headers: { 'Authorization': 'Bearer ' + getToken() },
              }).then(response => {
                api.put('orders/image/' + response.data.order_id, {
                  "base64": base64Image,
                },
                  {
                    headers: { 'Authorization': 'Bearer ' + getToken() },
                  }).then(response => {
                    setLoadPay(false);
                    setShow(true);
                    setColorAlert("success");
                    alert("Bài viết của bạn đã được thanh toán và đang tìm giáo viên chấm!");
                    props.history.push("/HomeStudentPage");
                  }).catch((error) => {
                    if (error.response) {
                      setLoadPay(false);
                        setShow(true);
                        setColorAlert("danger");
                        setError(error.response.data.detail);
                    }
                  })

              }).catch((error) => {
                if (error.response) {
                  setLoadPay(false);
                    setShow(true);
                    setColorAlert("danger");
                    setError(error.response.data.detail);
                }
              })
          }
          else {
            optionsTotal.push(optionTime);
            api.put('/orders/saved/' + orderID, {
              "essay": {
                "title": title,
                "content": content,
                "type_id": type
              },
              "option_list": optionsTotal,
              "status_id": 1
            },
              {
                headers: { 'Authorization': 'Bearer ' + getToken() },
              }).then(response => {
                setLoadPay(false);
                setShow(true);
                setColorAlert("success");
                alert("Bài viết của bạn đã được thanh toán và đang tìm giáo viên chấm!");
                props.history.push("/HomeStudentPage");
              }).catch((error) => {
                if (error.response) {
                  setLoadPay(false);
                  
                    setShow(true);
                    setColorAlert("danger");
                    setError(error.response.data.detail);

              }
            })
          }


        }
      }
    }

  }

  const handleDelete = (e) => {
    setLoadDel(true);
    if (!isUpdate) {
      alert("Bài viết của bạn đã được hủy!");
      props.history.push("/HomeStudentPage/Cart");
    }
    else {
      api.delete("orders/saved/" + orderID, {
        headers: { Authorization: 'Bearer ' + getToken() }
      }).then(response => {
        setLoadDel(false);
        setShow(true);
        setColorAlert("success");
        alert("Bài viết của bạn đã được hủy!");
        props.history.push("/HomeStudentPage/Cart");
      }).catch((error) => {
        if (error.response) {
          setLoadDel(false);
          if (error.response.status === 401 || error.response.status === 400) {
            setShow(true);
            setColorAlert("danger");
            setError(error.response.data.detail);
          }
          else {
            setShow(true);
            setColorAlert("danger");
            setError("Something went wrong. Please try again later!");
          }

        }
      })
    }

  }

  return (
    <div style={{ marginBottom: "100px" }} className="shadow-background"  >
      <Steps current={current} style={{ backgroundColor: "rgb(243, 243, 243)", padding: "10px 160px 10px 160px", display: "inline-flex" }}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ backgroundColor: "white", padding: "10px" }}>
        <div className="row  padding" >
          {current < steps.length - 1 && (
            <div className="action mr-auto mt-2">
              <Button className="btn-homepage " color="primary" style={{ margin: '0 8px ' }} onClick={handleSave}>
                {loading ? 'Đang xử lý...' : 'Lưu bài viết'}
              </Button>
              <Button className="btn-homepage btn-primary btn-outline-primary" outline color="primary" onClick={() => next()}>
                Tiếp tục
            </Button>
            </div>
          )}
          {current > 0 && (
            <div className="action mr-auto mt-2">
              <Button className="btn-homepage " color="primary" style={{ margin: '0 8px ' }} onClick={handleSave}>
                {loading ? 'Đang xử lý...' : 'Lưu bài viết'}
              </Button>
              <Button className="btn-homepage btn-primary btn-outline-primary" outline color="primary" style={{ margin: '0 8px' }} onClick={() => prev()}>
                Quay lại
            </Button>
            </div>
          )}
        </div>
        <div className="row bg-row padding ">
          {error && <Alert color={colorAlert} isOpen={show} style={{ margin: 'auto' }}>{error}</Alert>}
          {
            current === 0 && (
              <div className="container-fluid mt-2">
                <Form >
                  <FormGroup row>
                    <Label for="title" sm={2}>Đề bài</Label>
                    <Col sm={10}>
                      <Input type="textarea" name="title" id="title" placeholder="Nhập đề bài" required onChange={e => setTitle(e.target.value)}
                        defaultValue={title} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="image" sm={2}>Ảnh đính kèm</Label>
                    <Col sm={10}>
                      <CustomInput type="file" name="image" id="image" accept="image/*" onChange={(e) => { uploadImage(e) }} />
                      {base64Image && <img src={`data:image/jpeg;base64,${base64Image}`} alt="Title or Content"></img>}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="content" sm={2}>Nội dung</Label>
                    <Col sm={10}>
                      <Input type="textarea" name="content" id="content" placeholder="Nhập nội dung bài viết" rows="15" onChange={e => setContent(e.target.value)}
                        defaultValue={content} />
                      <FormText color="muted">
                        Độ dài tối đa: 1000 chữ.
                </FormText>
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            )}
          {current === 1 && (
            <div className="container-fluid mt-2" >
              <div className="row ">
                <div className="col-7">
                  <Form >
                    <FormGroup row>
                      <Label for="level" sm={3} >Trình độ</Label>
                      <Col sm={9}>
                        <Radio.Group defaultValue={level} onChange={handleChangeLevel} >
                          {levelList}
                        </Radio.Group>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="type" sm={3}>Thể loại bài viết</Label>
                      <Col sm={9}>
                        <Input type="select" name="type" id="type" disabled={!level} value={type} onChange={e => setType(e.target.value)}>
                          {typeList}
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row >
                      <Label for="optionScore" sm={3}>Lựa chọn sửa bài</Label>
                      <Col sm={9}>
                        <Select
                          id="optionScore"
                          mode="multiple"
                          allowClear="false"
                          style={{ width: '100%' }}
                          placeholder="Please select at least one option"
                          value={optionScore}
                          onChange={handleChangeOptionScore}
                          optionLabelProp="label"
                        >
                          {optionList}
                        </Select>
                      </Col>
                    </FormGroup>
                    <FormGroup row style={{ marginTop: '30px' }}>
                      <Label for="optionTime" sm={3}>Lựa chọn thời gian chấm</Label>
                      <Col sm={9}  >
                        <Radio.Group defaultValue={optionTime} onChange={e => setOptionTime(e.target.value)}>
                          {optionTimeList}
                        </Radio.Group>
                      </Col>
                    </FormGroup>
                  </Form>
                </div>
                <div className="col-5">
                  <Card style={{ minHeight: '250px' }}>
                    <CardHeader style={{ fontSize: "large", color: "#2596be", fontWeight: "900" }}><i className="fa fa-cart-arrow-down fa-xl" />  Giỏ hàng</CardHeader>
                    <CardBody>

                      <div className="container-fluid">
                        {showType(type)}
                        {showOptionScore}
                        {showTime(optionTime)}
                      </div>

                      <hr />
                    </CardBody>
                  </Card>

                  <Button outline color="success" block className="mb-1 mt-1" onClick={handlePayment}>
                    {loadPay ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
                  </Button>
                  <Button outline color="danger" block className="mb-1 mt-1" onClick={handleDelete}>
                    {loadDel ? 'Đang xử lý...' : 'Hủy'}
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