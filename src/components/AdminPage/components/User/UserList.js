import { getBaseURL, getToken, getTokenType } from '../../../../Utils/Common';
import { Popconfirm, notification, Modal, Form, DatePicker, Radio, Input, Select, Avatar, Divider, Descriptions, PageHeader, Drawer, Space, Tag, Table, Layout, Menu, Breadcrumb, Button } from 'antd';
import { React, useEffect, useState } from 'react';
import User from "./User"
import "../../admin.css"

const api = getBaseURL();

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
export const UserList = (props) => {
  const [genders, setGenders] = useState([]);

  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(0)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [gender_filter, setGenderFilter] = useState(0)
  const [job_filer, setJobFilter] = useState(0)
  const [status_filter, setStatusFilter] = useState(0)
  const [base64Image, setBase64Image] = useState("");
  const [tempBase64Image, setTempBase64Image] = useState("");
  const rowSelection = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [visible, setVisible] = useState(false)
  const [modal, setModal] = useState(false)

  const [form] = Form.useForm();


  const showDrawer = () => {
    setVisible(true);
  };

  const showModal = () => {
    form.resetFields()
    
    setModal(true);
  };

  const onCloseModel = () => {
    setRefreshKey(oldKey => oldKey +1)

    setModal(false)
  }

  const onClose = () => {
    setRefreshKey(oldKey => oldKey +1)

    setVisible(false);
  };

  const handleOk = () => {
    setConfirmLoading(true)
    api.post('/signup', {
      "email": form.getFieldValue('email'),
      "password": form.getFieldValue('password'),
      "name": form.getFieldValue("full_name"),
      "address": form.getFieldValue("address"),
      "date_of_birth": form.getFieldValue("dateofbirth"),
      "gender_id": form.getFieldValue("gender"),
      "job_id": form.getFieldValue("job"),
      "phone_number": form.getFieldValue("phonenumber")
    }).then(response => {
      const user = response.data;
      api.put('/avatars/' + user.user_id, {
        "base64": tempBase64Image,
      },
        {
          headers: { 'Authorization': 'Bearer ' + getToken() },
        }).then(response => {
          setRefreshKey(oldKey => oldKey + 1)
          setModal(false);
          setConfirmLoading(false);
        }).catch((error) => {
          if (error.response) {
            notification['error']({
              message: 'Failed to create a new user',
              description:
              "" + JSON.stringify(error.response.data.detail),
            });
            setConfirmLoading(false);

          }
        })
    }).catch((error) => {
      if (error.response) {
        notification['error']({
          message: 'Failed to create a new user',
          description:
          "" + JSON.stringify(error.response.data.detail),
        });
        setConfirmLoading(false);

      }
    })

  };

  const handleCancel = () => {
    setRefreshKey(oldKey => oldKey +1)

    setModal(false)
  };
  const handleClose = () => {
    setModal(false)
    setRefreshKey(oldKey => oldKey +1)

    form.resetFields()
  };

  const cancel = (e) => {

  }
  const confirm = (e) => {

  }


  const columnUsers = [
    {
      title: 'USER ID',
      dataIndex: ['info', 'user_id'],
      key: ['info', 'user_id'],
      width: 'auto',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.info.user_id - b.info.user_id,
    },
    {
      title: 'Name',
      dataIndex: ['info', 'name'],
      key: ['info', 'name'],
      width: 'auto',
    },
    {
      title: 'Gender',
      dataIndex: ['info', 'gender_id'],
      key: ['info', 'gender_id'],
      width: 'auto',
      filters: gender_filter,
      render: gender_id => (
        <>
          { genders[0] && (<Tag>{(genders.filter(gender => gender.gender_id == gender_id)[0]).gender_name}</Tag>)}
        </>
      ),
      onFilter: (value, record) => record.info.gender_id === value,
    },
    {
      title: 'Job',
      dataIndex: ['info', 'job_id'],
      key: ['info', 'job_id'],
      width: 'auto',
      filters: job_filer,
      render: job_id => (
        <>
          { jobs[0] && (<Tag>{(jobs.filter(job => job.job_id == job_id)[0]).job_name}</Tag>)}
        </>
      ),
      onFilter: (value, record) => record.info.job_id === value,

    },
    {
      title: 'Role',
      dataIndex: ['role_id'],
      key: ['role_id'],
      width: 'auto',
      filters: [{
        text: "Admin",
        value: 0
      }, {
        text: "Student",
        value: 1
      }, {
        text: "Teacher",
        value: 2
      }],
      render: role_id =>
      (
        <>
          {role_id === 0 && (<Tag color="black">{"Admin"}</Tag>)}
          {role_id === 1 && (<Tag color="blue">{"Student"}</Tag>)}
          {role_id === 2 && (<Tag color="pink">{"Teacher"}</Tag>)}

        </>
      ),
      onFilter: (value, record) => record.role_id === value,

    },

    {
      title: 'Status',
      dataIndex: ['disabled'],
      key: ['disabled'],
      width: 'auto',
      filters: [{
        text: "Disabled",
        value: true
      }, {
        text: "Active",
        value: false
      }],
      render: statu =>
      (
        <>
          {statu === true && (<Tag color="red">{"DISABLED"}</Tag>)}
          {statu === false && (<Tag color="green">{"ACTIVE"}</Tag>)}

        </>
      ),
      onFilter: (value, record) => record.disabled === value,
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a href="#" onClick={() => {
            showDrawer()
            setUser(record.info.user_id)
          }}> View </a>
          <Popconfirm
            title="Are you sure to perform this task?"
            onConfirm={(e) => {
              api.delete("/users/" + record.info.user_id, {
                headers: { 'Authorization': 'Bearer ' + getToken() },
              }
              ).then(response => {
                api.get('/users', {
                  headers: { Authorization: getTokenType() + ' ' + getToken() }
                }).then(response => {
                  const users = response.data.data;
                  setUsers(users);
                })
              })
            }}
            onCancel={cancel}
            okText="Delete"
            cancelText="Cancel"
          >
            <a href="#"> {record.disabled ? "Restore" : "Delete"}</a>
          </Popconfirm>,
        </Space>
      ),
    }

  ];


  useEffect(() => {
    async function fetchData() {
      await api.get('/users', {
        headers: { Authorization: getTokenType() + ' ' + getToken() }
      }).then(response => {
        const users = response.data.data;
        setUsers(users);
      })

      await api.get('/genders', {
        headers: { Authorization: getTokenType() + ' ' + getToken() }
      }).then(response => {
        const genders = response.data.data;
        setGenders(genders);
        setGenderFilter(genders.map(gender => ({
          text: gender.gender_name,
          value: gender.gender_id
        })))
      })

      await api.get('/jobs', {
        headers: { Authorization: getTokenType() + ' ' + getToken() }
      }).then(response => {
        const jobs = response.data.data;
        setJobs(jobs);
        setJobFilter(jobs.map(job => ({
          text: job.job_name,
          value: job.job_id
        })))
      })
    }
    fetchData();

  }, [refreshKey]);

  const gendersList = genders.map((gender) => (
    <Radio value={gender.gender_id} key={gender.gender_id}>{gender.gender_name}</Radio>
  ));

  const jobsList = jobs.map((job) => (
    <Select.Option value={job.job_id} key={job.job_id}>{job.job_name}</Select.Option>
  ));


  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    const a = base64.split(",");
    setTempBase64Image(a[1])
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


  return (
    <>
      <div className="site-drawer-render-in-current-wrapper">

        <PageHeader
          ghost={false}
          title="Quản lý người dùng"
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Total User: ">{users.length}</Descriptions.Item>
          </Descriptions>
        </PageHeader>

        <Table style={{ width: 'auto' }}
          rowKey={users => users.user_id}
          columns={columnUsers}
          dataSource={users}
          pagination={{ pageSize: 5 }}
          footer={() =>
            <Button onClick={showModal}  >
              Create User
          </Button>}
          rowSelection={{ rowSelection }} />

        <Drawer
          width={800}
          title="User Information"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
          getContainer={false}
          style={{ position: 'absolute' }}
        >
          {user && (<User user_id={user} />)}
        </Drawer>

        <Modal
          visible={modal}
          title="Create New User"
          onOk={handleOk}
          onCancel={handleCancel}
          onClose={handleClose}
          maskClosable = {false}
          confirmLoading={confirmLoading}
        >
          <Form  {...layout} form={form} >
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="confirm"
              dependencies={['password']}
              label="Confirm Password" rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}>
              <Input.Password />
            </Form.Item>
            <Divider />

            <Form.Item name="full_name" label="Avatar" rules={[{ required: true }]}>
              <Avatar size={100} src={`data:image/jpeg;base64,${tempBase64Image}`} />
              <br />
              <br />
              <Input type="file" onChange={(e) => { uploadImage(e) }} />
            </Form.Item>
            <Form.Item name="full_name" label="Full Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phonenumber" label="Phone Number " rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
              <Radio.Group>
                {gendersList}
              </Radio.Group>
            </Form.Item>
            <Form.Item name="job" label="Job" rules={[{ required: true }]}>
              <Select>
                {jobsList}
              </Select>
            </Form.Item>
            <Form.Item name="dateofbirth" label="Date of Birth" rules={[{ required: true }]}>
              <Input type="date" />
            </Form.Item>

          </Form>
        </Modal>
      </div>
    </>

  )
}

export default UserList

