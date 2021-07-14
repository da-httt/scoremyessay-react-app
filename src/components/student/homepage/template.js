
export const columns = [{
    title: <div style={{ textAlign: "center", fontWeight: "500" }}>Sô bài đăng</div>,
    dataIndex: 'total_orders',
    render: total => (
        <p style={{ color: "#2596be", textAlign: "center", fontSize: "20px" }}>{total}</p>
    )
},
{
    title: <div style={{ textAlign: "center", fontWeight: "500" }}>Đã chấm</div>,
    dataIndex: 'total_done',
    render: score => (
        <p style={{ color: "#2596be", textAlign: "center", fontSize: "20px" }}>{score}</p>
    )
}]

export const columnsUser = [
    {
        title: 'Người dùng',
        dataIndex: 'user_name',
        width: 220,
        render: username => <div style={{ color: 'rgb(8, 120, 148)' }}>{username}</div>,
    },
    {
        title: 'Số bài',
        dataIndex: 'order_count',
        width: 90,

    },
];