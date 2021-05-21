import { getBaseURL, getToken, getTokenType } from '../../../../Utils/Common';
import { Radio, Tabs, Input, Modal, Badge, Descriptions, Select, Space, Tag,Button, Avatar, Form } from 'antd';
import {  React, useEffect, useState } from 'react';

const { TabPane } = Tabs;
const api = getBaseURL();

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  
const User  = (props) => {

    const [user, setUser] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [genders, setGenders] = useState([]);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [base64Image, setBase64Image] = useState("");
    const [tempBase64Image, setTempBase64Image] = useState("");


    const showModal = () => {
        form.setFieldsValue({
            "full_name": user.info && user.info.name,
            "address": user.info && user.info.address,
            "phonenumber": user.info && user.info.phone_number,
            "gender": user.info && user.info.gender_id,
            "job": user.info && user.info.job_id,
            "dateofbirth": user.info && user.info.date_of_birth
        })
        setVisible(true);
    };

    const [form] = Form.useForm();

    const uploadImage = async (e) =>{
        const file=e.target.files[0];
        const base64 = await convertBase64(file);
        const a= base64.split(",");
        setTempBase64Image(a[1])
    }
    const convertBase64=(file)=>{
        return new Promise((resolve, reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload =() =>{
                resolve(fileReader.result);
            };

            fileReader.onerror=(error) =>{
                reject(error)
            };
        });
    };



    const handleOk = () => {
        setConfirmLoading(true);
        console.log(form.getFieldValue("full_name"))
        api.put('/users/'+ props.user_id, {
            "name": form.getFieldValue("full_name"),
            "address": form.getFieldValue("address"),
            "date_of_birth": form.getFieldValue("dateofbirth"),
            "gender_id": form.getFieldValue("gender"),
            "job_id": form.getFieldValue("job"),
            "phone_number": form.getFieldValue("phonenumber")
        }, 
          {
            headers: {'Authorization': 'Bearer ' + getToken()},
          }).then(response => {
            const user = response.data;
            setUser(user);
            api.put('/avatars/'+ props.user_id, {
                "base64": tempBase64Image,
            }, 
              {
                headers: {'Authorization': 'Bearer ' + getToken()},
              }).then(response => {
                setVisible(false);
                setConfirmLoading(false);
                setBase64Image(tempBase64Image)
              }).catch((error) => {
                
              })
            
          }).catch((error) => {

          })

      };
    
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
      };
    

    useEffect(() => {
        async function fetchData() {

            await api.get('/genders', {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
              }).then(response => {
                const genders = response.data.data;
                setGenders(genders);
              })
        
              await api.get('/jobs', {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
              }).then(response => {
                const jobs = response.data.data;
                setJobs(jobs);
              })


            await api.get('/users/' + props.user_id, {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                const user = response.data;
                setUser(user);
            }).catch(function (error) {
                // handle error
                console.log(error);
            })

            await api.get('/avatars/' + props.user_id, {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                const base64Image = response.data.image_base64;
                setBase64Image(base64Image);
                setTempBase64Image(base64Image)
            }).catch(function (error) {
                // handle error
                console.log(error);
            })
        }
        fetchData();

    }, [props.user_id]);


    const gendersList = genders.map((gender) => (
        <Radio value={gender.gender_id} key={gender.gender_id}>{gender.gender_name}</Radio>
    ));
    
    const jobsList = jobs.map((job) => (
        <Select.Option value={job.job_id} key={job.job_id}>{job.job_name}</Select.Option>
    ));

    return (
        <>
        <span style={{ marginBottom:"50px"}}>
            <Button style={{ marginBottom :"5px"}} onClick={showModal} > Edit User</Button>
            <Space />
            <Button style={{ marginLeft:"20px", marginBottom :"5px"}}> Remove User</Button>
            <Tabs defaultActiveKey="1" >               
                <TabPane tab="Thông tin User" key="1">
                    
                    <Descriptions title="User Information"bordered>
                    <Descriptions.Item span={3}> <Avatar size={200} src={`data:image/jpeg;base64,${base64Image}`}/></Descriptions.Item>
                       

                        <Descriptions.Item label="User Name" span={3}>{user.info && user.info.name}</Descriptions.Item>

                        <Descriptions.Item label="User Id">{user.info && user.info.user_id}</Descriptions.Item>

                        <Descriptions.Item label="Disabled" span={2}>
                            <>
                                {user.disabled === true && (<Tag color="red">{'TRUE'}</Tag>)}
                                {user.disabled === false && (<Tag color="gray">{'FALSE'}</Tag>)}
                            </>
                        </Descriptions.Item>

                        <Descriptions.Item label="Job" span={3}>
                            <>
                                {user.info && jobs[user.info.job_id] && (<Badge status="default" text={jobs[user.info.job_id].job_name} />)}
                            </>
                        </Descriptions.Item>
                        <Descriptions.Item label="Email" span={3}>{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Role" span={3}>
                            <>
                                {user.role_id === 1 && (<Tag color="blue">{'Student'}</Tag>)}
                                {user.role_id === 0 && (<Tag color="black">{'Admin'}</Tag>)}
                                {user.role_id === 2 && (<Tag color="pink">{'Teacher'}</Tag>)}
                            </>
                        </Descriptions.Item>
                        <Descriptions.Item label="Gender" span={3}>{user.info && genders[user.info.gender_id] && genders[user.info.gender_id].gender_name}</Descriptions.Item>
                        <Descriptions.Item label="Address" span={3}>{user.info && user.info.address}</Descriptions.Item>
                        <Descriptions.Item label="Date of Birth" span={3}>{user.info && user.info.date_of_birth}</Descriptions.Item>
                        <Descriptions.Item label="Phone number">{user.info && user.info.phone_number}</Descriptions.Item>
                    </Descriptions>           
                </TabPane>
                <TabPane tab="Lịch sử " key="2" >                
                </TabPane>
            </Tabs>


        </span>

         <Modal 
            title= {`UserID: ${user.info && user.info.user_id}`}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
       >
         <Form  {...layout}  form={form} >
            <Form.Item name="full_name" label="Avatar" rules={[{ required: true }]}> 
                <Avatar size={100} src={`data:image/jpeg;base64,${tempBase64Image}`}/>
                <br/>
                <br/>
                 <Input type="file" onChange={(e) => {uploadImage(e)}}/>
             </Form.Item>
             <Form.Item name="full_name" label="Full Name" rules={[{ required: true }]}>
                 <Input />
             </Form.Item>
             <Form.Item name="address" label="Address" rules={[{ required: false }]}>
                 <Input />
             </Form.Item>
             <Form.Item name="phonenumber" label="Phone Number " rules={[{ required: false }]}>
                 <Input />
             </Form.Item>
             <Form.Item name="gender" label="Gender">
                    <Radio.Group>
                                {gendersList}
                    </Radio.Group>
             </Form.Item>
             <Form.Item name="job" label="Job">
                 <Select> 
                     {jobsList}
                 </Select>
             </Form.Item>
            <Form.Item name="dateofbirth" label="Date of Birth">
                <Input type="date"/>
            </Form.Item>
         </Form>
       </Modal>
       </>

    )
}

export default User