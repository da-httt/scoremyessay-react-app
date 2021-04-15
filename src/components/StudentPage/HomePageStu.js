import './Student.css';
import { React, useState} from 'react';
import {  Button, ButtonDropdown, Table, DropdownItem, DropdownMenu, DropdownToggle, Navbar, NavbarBrand, InputGroup, Input, Pagination, PaginationItem, PaginationLink, Form, Label, FormGroup } from 'reactstrap';
import avt from "../../img/avt.png";
import { Breadcrumb } from 'antd';
const GlobalHeader= (props)=>{
    const {
        username
    }=props;

    return(
        <div>
            <div className="container">
            <Navbar light className="navBarDetail" fixed="top" style={{backgroundColor: 'white'}}>
                <NavbarBrand href="/Home">
                    <h4 className="ten-project"> ScoreMyEssay</h4>
                </NavbarBrand>
                
                <div className="ml-auto">
                <ButtonDrop />
                </div>
                <img src={avt} height="35px" className="ml-3" alt="Avatar"></img>
                <h5 className="username  ml-1 mr-2 mt-auto mb-auto">  {username}</h5>
                
            </Navbar>
            </div>  
        </div>
    );
}

const ButtonDrop = (props) => {
    const [dropdownOpen, setOpen] = useState(false);
  
    const toggle = () => setOpen(!dropdownOpen);
  
    return (
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret className="fa fa-bell-o "  color="info">
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Thông báo mới</DropdownItem>
          <DropdownItem>Thông báo 1</DropdownItem>
          <DropdownItem>Thông báo 2</DropdownItem>
          <DropdownItem divider />
          <DropdownItem header>Thông báo trước đây</DropdownItem>
          <DropdownItem>Thông báo 3</DropdownItem>
          <DropdownItem>Thông báo 4</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }

  const Phantrang = (props) => {
      const {
          size
      }=props;
    return (
      <Pagination size={size}>
        <PaginationItem >
          <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem >
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last href="#" />
        </PaginationItem>
      </Pagination>
    );
  }

const userList=[
    {
        id: 1,
        username: 'pmdung',
        numOfEssay: '13'
    },
    {
        id: 2,
        username: 'ntcanh',
        numOfEssay: '29'
    },
    {
        id: 3,
        username: 'tdnam',
        numOfEssay: '17'
    },
]
function UserTable(props){
    const row= props.userList.map((user) =>
        <tr key={user.id}> 
            <th scope="row">{user.id}</th>
            <td style={{color:'blue'}}>{user.username}</td>
            <td>{user.numOfEssay}</td>
        </tr>
    );
    return(
        <Table>
            <thead>
                <tr>
                <th>STT</th>
                <th>Người dùng</th>
                <th>Số bài <a className="fa fa-sort fa-custome "></a></th>
                </tr>
            </thead>
            <tbody >
                {row}
            </tbody>
        </Table>
    );
}

const essayList = [
    {
        id: 1,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        id: 2,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đã chấm',
        time: '29-1-2021 8:00:02',
        score: '8',
    },
    {
        id: 3,
        kind: 'Basic',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đã hủy',
        time: '29-3-2020 8:00:02',
        score: 'N/A',
    },
    {
        id: 4,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        id: 5,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đã chấm',
        time: '29-1-2021 8:00:02',
        score: '7,5',
    },
    {
        id: 6,
        kind: 'Basic',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đã hủy',
        time: '29-3-2020 8:00:02',
        score: 'N/A',
    },
    {
        id: 7,
        kind: 'Basic',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đã hủy',
        time: '29-3-2020 8:00:02',
        score: 'N/A',
    },
    {
        id: 8,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        id: 9,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đã chấm',
        time: '29-1-2021 8:00:02',
        score: '7,5',
    },
]

function EssayTable(props){
    const row= props.essayList.map((essay) =>
        <tr key={essay.id}> 
            <th ><input type="checkbox"/></th>
            <td style={{color:'blue'}}>{essay.kind}</td>
            <td>{essay.title}</td>
            <td>{essay.cost}</td>
            <td>{essay.status}</td>
            <td>{essay.time}</td>
            <td>{essay.score}</td>                       
        </tr>
    );
    return(
        <Table>
            <thead>
                <tr>
                <th><input type="checkbox"/></th>
                <th>Dạng bài</th>
                <th>Mô tả</th>
                <th>Mức giá <a className="fa fa-sort fa-custome "></a></th>
                <th>Status</th>
                <th>Ngày cập nhật <a className="fa fa-sort fa-custome "></a></th>
                <th>Điểm số <a className="fa fa-sort fa-custome "></a></th>
                </tr>
            </thead>
            <tbody>
                {row}
            </tbody>
        </Table>
    );
}


const HomeStudent = (props) =>{
    
    
    return (
        <div >        
            <GlobalHeader username="Canh Ngo"/>
            <div className="container-fluid detailPage">
                <div className="container-xxl">
                <div className="row">
                    <div className="col col-sm-9 " >
                        <div className="container-fluid">
                            <div className="row bg-row margin padding" >
                                
                                <Breadcrumb  className="mt-1" style={{fontSize: "large"}}>
                                    <Breadcrumb.Item>
                                    <a href="/Home">Trang chủ</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>Quản lý bài viết</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="row bg-row padding" >
                                <br/>
                                <h3>DANH SÁCH BÀI VIẾT</h3>
                            </div>
                            <div className="row bg-row margin padding ">
                            <div className="container-fluid">
                                <div className="row ">
                                    <div class="col col-3 mb-3 mt-3">
                                        <Input placeholder="Nhập tên bài viết cần tìm" />
                                    </div>
                                    <div className="col col-1 mb-auto mt-auto ml-4" ><Input type="radio" name="sort" checked/> Tất cả</div>
                                    <div className="col col-1 mb-auto mt-auto "><Input type="radio" name="sort" /> Đã chấm </div>
                                    <div className="col col-1 mb-auto mt-auto " style={{fontSize:'11px'}}><Input type="radio" name="sort"/>Đang chấm</div>
                                    <div className="col col-1 mb-auto mt-auto "><Input type="radio" name="sort"/> Bị hủy</div>
                                    <div className="col col-2 mb-auto mt-auto "><Button outline color="secondary" block>Đặt lại</Button></div>
                                    <div className="col col-2 mb-auto mt-auto "><Button color="primary" block>Tìm kiếm</Button></div>
                                </div>
                                <div className="row mt-4">
                                    <EssayTable essayList={essayList}/>
                                </div>
                                <div className="row ">
                                    <Phantrang/>
                                </div>
                            </div>
                                
                        </div>
                        </div>
                    </div>

                    <div className="col col-sm-3" >
                        <div className="container-fluid">
                            <div className="row  margin" >
                                <Button color="primary" href="" block large>Thêm bài viết mới</Button>
                            </div>
                            <div className="row bg-row margin padding" >
                                <h5 ><a class="fa fa-info-circle fa-lg">{' '}</a>  Số lượng bài viết đã đăng</h5>
                                <div className="mr-auto ml-auto">
                                <Table borderless className="text" style={{fontSize:'20px'}} >
                                <tr><td id="soluong">Số lượng</td><td id="dacham">Đã chấm</td></tr>
                                <tr>
                                    <td><label for="soluong">12</label></td>
                                    <td><label for="dacham">10</label></td>
                                </tr>
                                </Table> 
                                </div>                     
                            </div>
                            <div className="row bg-row margin padding" >
                                <div className="container-fluid">
                                <div className="row ">
                                    <div className="col contentPhu">Tổng chi tháng này</div>
                                    <div className=""><a className="fa fa-info-circle fa-lg fa-custome "></a></div>
                                    
                                </div>
                                <div className="row ">
                                    <div className="col" style={{fontSize: '30px', fontStyle:'revert'}}>{'$1,500,000'} </div>
                                </div>
                                <div className="row ">
                                    <div className="col" style={{fontSize: '18px'}}>
                                        So với tháng trước {'10% '} 
                                        <i className="fa fa-sort-up" style={{color:'forestgreen'}}></i>
                                        <i className="fa fa-sort-down" style={{color:'darkorange'}} ></i> 
                                    </div>
                                </div>
                                <hr/>
                                <div className="row ">
                                    <div className="col" style={{fontSize: '18px'}}>
                                        Mức chi trung bình theo bài {'$300'} 
                                    </div>
                                </div>
                                </div>               
                            </div>
                            <div className="row bg-row margin padding" >
                                <div className="container-fluid">
                                <div className="row ">
                                    <div className="col mb-2" style={{fontSize: '18px'}}> Xếp hạng</div>
                                    <div className=""><a className="fa fa fa-ellipsis-h fa-lg fa-custome "></a></div>
                                </div>
                                <div className="row ">
                                    <UserTable userList={userList}/>
                                    
                                </div>
                                <div className="row mt-2">
                                    
                                    <Phantrang size="sm"/>
                                </div>
                                </div>               
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                
            </div>
        </div>
        
    );
}

export default HomeStudent;


