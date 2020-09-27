const menuList = [
    {
        title:'首页',
        key:'/home',
        icon:'<PieChartOutlined/>'
    },
    {
        title:'文章',
        key:'sub1',
        icon:'MailOutlined',
        child:[
            {
                title:'文章管理',
                key:'/articel',
                icon:'PieChartOutlined',
            },
            {
                title:'文章管理',
                key:'/articel',
                icon:'PieChartOutlined',
            },
        ]
    }
]
export default  menuList