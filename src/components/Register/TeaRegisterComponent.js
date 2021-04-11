import React from 'react';
import { Button, Form, Label, Input, FormGroup, CustomInput, FormText,  } from 'reactstrap';

const TeaRegister = (props) =>{
    return(
        <React.Fragment>
            <div class="container bg-signup">
            <Form>
                <div className="row align-items-center">
                    <h3 className="ml-auto mr-auto mt-3">Đăng ký trở thành giảng viên, chuyên gia</h3>
                </div>
                <div className="row " >
                    <div className="col-12 col-md-5 offset-md-1 ">
                        <FormGroup>
                            <Label for="fullname">Họ và tên *</Label>
                            <Input type="text" name="fullname" id="fullname" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Địa chỉ</Label>
                            <Input type="text" name="address" id="address" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Số điện thoại *</Label>
                            <Input type="tel" name="phone" id="phone" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="birthday">Ngày sinh *</Label>
                            <Input type="date" name="birthday" id="birthday" required/>
                        </FormGroup>
                    </div>  
                    <div className="col-12 col-md-5 ">
                        <FormGroup>
                            <Label for="email">Email *</Label>
                            <Input type="email" name="email" id="email" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="carrier">Nghề nghiệp hiện tại *</Label>
                            <Input type="select" name="carrier" id="carrier" required>
                            <option>Kỹ sư</option>
                            <option>Giáo viên</option>
                            <option>Hướng dẫn viên du lịch</option>
                            <option>Biên dịch viên</option>
                            <option>Doanh nhân</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="resume">CV/Resume *</Label>
                            <CustomInput type="file" name="resume" id="resume" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="certificate">Chứng chỉ bằng cấp *</Label>
                            <CustomInput type="file" name="resume" id="resume" required multiple/>
                            <FormText color="muted">
                                Hãy đính kèm các chứng chỉ của mình trong một lần chọn!
                            </FormText>
                        </FormGroup>
                        

                    </div>
                </div>
                <div className="row align-items-center">
                    <Button color="primary" type="submit" className="mr-auto ml-auto" >Đăng ký</Button>
                </div>
                
            </Form>
            </div>    
        </React.Fragment>
    );
}
export default TeaRegister;