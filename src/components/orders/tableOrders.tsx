import { Button, Table } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import environment from "../../environments/environment.json"
import useAxiosAuth from "../../hooks/useAxiosAuth"
import failNotification from "../notifications/fail/failNotification"
import successNotification from "../notifications/success/successNotification"


export interface ITable {
    id: string,
    tableId: string,
    menuItems: string
}

interface ICallWaiter {
  id: string,
  tableId: number
}


const TableOrders = () => {
    const axiosAuth = useAxiosAuth()
    const [tableOrders, setTableOrders] = useState<Array<ITable>>()

    const columns = [
        {
            title: "Nazwa",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status"
        }
    ]

    const handleDelete = async (id: string) => {
        axiosAuth
            .post(`Admin/IssueOrder`, {tableId: parseInt(id)})
            .then(() => {
                setTableOrders(tableOrders?.filter((item: ITable) => item.tableId !== id))
                successNotification("The table order has been removed.")
            })
            .catch(() => {
                failNotification("The table order couldn't be removed.")
            })
    }

    const toDataSource = (menuItem: string) => {
        let menuItems = menuItem.split(";")
        return menuItems.map(el => ({name: el, status: "In progress"}))
    }

    const renderSingleTable = (table: ITable) => {
        return (
            <div style={{margin: 30}}>
                <h2>{`Stolik #${table.tableId}`}</h2>
                <Table columns={columns} dataSource={toDataSource(table.menuItems)}/>
                <Button type="primary"
                        danger ghost
                        onClick={() => handleDelete(table.tableId)}
                        style={{width: 200, justifyContent: 'center'}}
                >
                    Zresetuj stolik
                </Button>
            </div>
        )
    }


    useEffect(() => {
      setInterval(() => downloadTableOrders(), 1000)
      setInterval(() => checkWaiterCall(), 1000)
    }, [environment.apiUri + "TableOrders"])


    const downloadTableOrders = async () => {
        axiosAuth.get<ITable[]>(environment.apiUri + `Admin/GetOrders`)
            .then(res => {
                const data = res.data
                    .map((item: ITable) => ({ ...item, key: item.id }))
                    .sort((a, b) => (a.tableId > b.tableId) ? 1 : ((b.tableId > a.tableId) ? -1 : 0))
                setTableOrders(data)
            })
            .catch(() => {
                failNotification("Couldn't download the list of table orders.")
            })
    }

    const checkWaiterCall = () => {
      axiosAuth
        .get<ICallWaiter[]>("Orders/IsWaiterCalled")
        .then(res => {
          res.data.forEach(element => {
            successNotification(`Client from the table ${element.tableId} is waiting for you.`)
          })
        })
    }
    // const downloadTableOrders = () => {
    //     setTableOrders(
    //         [
    //             {
    //                 "id": "1",
    //                 "name": "Stolik #1",
    //                 "menuItems": [
    //                     {
    //                         id: "1",
    //                         name: "Margherita",
    //                         category: "Pizza",
    //                         price: 27,
    //                         description: "Good pizza"
    //                     },
    //                     {
    //                         id: "5",
    //                         name: "Salame Picante",
    //                         category: "Pizza",
    //                         price: 37,
    //                         description: "Good pizza"
    //                     },
    //                 ]
    //             },
    //             {
    //                 "id": "2",
    //                 "name": "Stolik #2",
    //                 "menuItems": [
    //                     {
    //                         id: "2",
    //                         name: "Hawajska",
    //                         category: "Pizza",
    //                         price: 34,
    //                         description: "Good pizza"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "id": "3",
    //                 "name": "Stolik #3",
    //                 "menuItems": [
    //                     {
    //                         id: "1",
    //                         name: "Prosciutto",
    //                         category: "Pizza",
    //                         price: 28,
    //                         description: "good pizza"
    //                     }
    //                 ]
    //             },
    //
    //         ]
    //     )
    // }

    return (
        <>
            {tableOrders?.map((t) => renderSingleTable(t))}
        </>
    )
}

export default TableOrders;
