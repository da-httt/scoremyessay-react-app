import React from 'react';
import { Button, Form, Label, Input, FormGroup, } from 'reactstrap';
import Footer from '../HomePage/FooterComponent';
import Header from '../HomePage/HeaderComponent';

const StuRegister = (props) =>{
    return(
        <React.Fragment>
            <Header/>
            <div class="container bg-signup">
            <Form>
                <div className="row align-items-center">
                    <h3 className="ml-auto mr-auto mt-3">Đăng ký trở thành học viên</h3>
                </div>
                <div className="row " >
                    <div className="col-12 col-md-6 offset-md-3 ">
                        <FormGroup>
                            <Label for="fullname">Họ và tên *</Label>
                            <Input type="text" name="fullname" id="fullname" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="birthday">Ngày, tháng, năm sinh *</Label>
                            <Input type="date" name="birthday" id="birthday" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email *</Label>
                            <Input type="email" name="email" id="email" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="carrier">Nghề nghiệp hiện tại *</Label>
                            <Input type="select" name="carrier" id="carrier" required>
                            <option>Học sinh</option>
                            <option>Sinh viên</option>
                            <option>Người đi làm</option>
                            <option>Khác</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Địa chỉ</Label>
                            <Input type="text" name="address" id="address" />
                        </FormGroup>
                        
                        

                    </div>
                </div>
                <div className="row align-items-center">
                    <Label check className="mr-auto ml-auto"><Input type="checkbox" /> Chấp nhận mọi điều khoản và chính sách</Label>
                </div>
                <div className="row align-items-center mt-3">
                    <Button color="primary" type="submit" className="mr-auto ml-auto" >Đăng ký</Button>
                </div>
                
            </Form>
            </div>   
        <Footer/> 
        </React.Fragment>
    );
}
export default StuRegister;