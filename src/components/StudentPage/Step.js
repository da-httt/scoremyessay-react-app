import React from 'react';
import {Steps, Radio, Select, Slider} from 'antd';
import { Form, FormGroup, Input, Label, Col, CustomInput, FormText, Button, Card, CardHeader, CardText, CardBody } from 'reactstrap';

const { Step } = Steps;

const steps = [
  {
    title: 'Nhập nội dung',
  },
  {
    title: 'Lựa chọn yêu cầu',
  },
];

const First = () => {
    return(
      <div className="container-fluid mt-2" style={{fontSize: "large"}}>
      <Form >
          <FormGroup row>
            <Label for="title" sm={2}>Đề bài</Label>
            <Col sm={10}>
            <Input type="textarea" name="title" id="title" placeholder="Nhập đề bài" required/>
            </Col>
          </FormGroup> 
          <FormGroup row>
            <Label for="image" sm={2}>Ảnh đính kèm</Label>
            <Col sm={10}>
            <CustomInput type="file" name="image" id="image" accept="image/*"/>
            </Col>
          </FormGroup>  
          <FormGroup row>
            <Label for="content" sm={2}>Nội dung</Label>
            <Col sm={10}>
            <Input type="textarea" name="content" id="content" placeholder="Nhập nội dung bài viết" rows="15"/>
            <FormText color="muted">
              Độ dài tối đa: 1000 chữ.
            </FormText>
            </Col>
          </FormGroup> 
      </Form>
      </div>
    );
}

const Second = () => {
  const [category, setCategory] = React.useState(false);
  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };

  function handleChange(value) {
  console.log(`selected ${value}`);
  }
  const options = [{ value: 'Chấm điểm' }, { value: 'Chấm điểm theo 4 tiêu chí' }, { value: 'Sửa lỗi bài' }, { value: 'Hướng dẫn viết bài' }];

  const marks = {
    12: '12 tiếng',
    24: '24 tiếng',
    48: '2 ngày',
    72: '3 ngày'
    };

  return(
      <div className="container-fluid mt-2" style={{fontSize: "large"}}>
        <div className="row ">
          <div className="col-8">
            <Form >
                <FormGroup row>
                  <Label for="category" sm={3} >Trình độ</Label>
                  <Col sm={9}>
                  <Radio.Group value={category} onChange={handleCategoryChange} >
                    <Radio.Button value={false} checked>Tiếng anh IELTS</Radio.Button>
                    <Radio.Button value={true}>Tiếng anh Cơ bản</Radio.Button>
                  </Radio.Group>
                  </Col>
                </FormGroup> 
                <FormGroup row>
                  <Label for="kindOfIelts" sm={3}>Thể loại bài viết</Label>
                  <Col sm={9}>
                  <Input type="select" name="kindOfIelts" id="kindOfIelts" disabled={category}>
                    <option>IELTS WRITING TASK 1</option>
                    <option>IIELS WRITING TASK 2</option>
                  </Input>
                  </Col>
                </FormGroup>  
                <FormGroup row >
                  <Label for="option" sm={3}>Lựa chọn sửa bài</Label>
                  <Col sm={9}>
                  <Select
                    id="option"
                    mode="multiple"
                    allowClear
                    style={{ width: '100%'}}
                    placeholder="Please select"
                    defaultValue={['Chấm điểm', 'Sửa lỗi bài']}
                    onChange={handleChange}
                    options={options}
                  >
                  </Select>
                  </Col>
                </FormGroup> 
                <FormGroup row style={{marginTop: '30px'}}>
                  <Label for="deadline" sm={3}>Lựa chọn thời gian chấm</Label>
                  <Col sm={9} >
                  <Slider marks={marks} step={null} defaultValue={33} className="mt-4" />
                  </Col>
                </FormGroup> 
            </Form>
          </div>
          <div className="col-4">
            <Card style={{ minHeight: '250px'}}>
            <CardHeader tag="h4" style={{ width: '100%'}}><i class="fa fa-cart-arrow-down fa-xl"/> Giỏ Hàng</CardHeader>
              <CardBody>
                <CardText>
                  Chấm điểm và sửa lỗi: 50,000 <br/>
                  IELTS WRITING TASK 2: 50,000 <br/>
                  <hr/>
                  <strong className="ml-auto">Tổng tiền: 100,000 VNĐ</strong>
                </CardText>
              </CardBody>
            </Card>
            
            <Button outline color="success" block className="mb-1 mt-1">Xác nhận thanh toán</Button>
          </div>
        </div>
      </div>
    
    );
}


const Stepp = () => {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="bg" style={{height: window.innerHeight + 'px'}} >
    <div className="row bg margin padding">
        <Steps current={current} style={{padding: "10px 160px 10px 160px", display: "inline-flex"}}>
            {steps.map(item => (
            <Step key={item.title} title={item.title} />
            ))}
        </Steps>
    </div>
    
    <div className="row bg-row padding margin ">
            {current < steps.length - 1 && (
              <div className="action ml-auto mt-2">
            <Button color="primary" style={{ margin: '0 8px '}}>
              Lưu bài viết
            </Button>
            <Button outline color="primary"  onClick={() => next()}>
              Tiếp tục
            </Button>
            </div>
            )}
            {current > 0 && (
              <div className="action mr-auto mt-2">
            <Button color="primary"  style={{ margin: '0 8px' }} onClick={() => prev()}>
              Quay lại
            </Button>
            </div>
            )}
    </div>
    <div className="row bg-row  padding ">
        {
        current === 0 && (
            <First/>
        )}
        {current === 1 && (
            <Second/>
        )}
        
    </div>
      
    </div>
  );
};

export default Stepp;