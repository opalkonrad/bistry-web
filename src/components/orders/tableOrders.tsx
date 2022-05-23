import { Button, Space, Table } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import environment from "../../environments/environment.json"
import useAxiosAuth from "../../hooks/useAxiosAuth"
import { AddMenuItemModal } from "../modals/addMenuItemModal"
import failNotification from "../notifications/fail/failNotification"
import successNotification from "../notifications/success/successNotification"
import {IMenuItem} from "../menuItem/menuItems";


export interface ITable {
    id: string,
    name: string,
    menuItems: Array<IMenuItem>
}


const TableOrders = () => {
    const axiosAuth = useAxiosAuth()
    const [tableOrders, setTableOrders] = useState<Array<ITable>>()

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category"
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price"
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        }
    ]

    const handleDelete = async (id: string) => {
        axiosAuth
            .delete(`Admin/DeleteTableOrder/${id}`)
            .then(() => {
                successNotification("The table order has been removed.")
            })
            .catch(() => {
                failNotification("The table order couldn't be removed.")
            })
    }

    const renderSingleTable = (table: ITable) => {
        return (
            <div style={{margin: 30}}>
                <h2>{table.name}</h2>
                <Table columns={columns} dataSource={table.menuItems}/>
                <Button type="primary"
                        danger ghost
                        onClick={() => handleDelete(table.id)}
                        style={{width: 200, justifyContent: 'center'}}
                >
                    Zresetuj stolik
                </Button>
            </div>
        )
    }


    useEffect(() => {
        downloadTableOrders()
    }, [environment.apiUri + "TableOrders"])

    //
    // const downloadTableOrders = async () => {
    //     axios.get<ITable[]>(environment.apiUri + "TableOrders")
    //         .then(res => {
    //             const data = res.data
    //                 .map((item: ITable) => ({ ...item, key: item.id }))
    //                 .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    //             setTableOrders(data)
    //         })
    //         .catch(() => {
    //             failNotification("Couldn't download the list of table orders.")
    //         })
    // }
    const downloadTableOrders = () => {
        setTableOrders(
            [
                {
                    "id": "1",
                    "name": "Stolik #1",
                    "menuItems": [
                        {
                            id: "1",
                            name: "Margherita",
                            category: "Pizza",
                            price: 27,
                            description: "good pizza"
                        },
                        {
                            id: "5",
                            name: "Pizza speciala",
                            category: "Pizza",
                            price: 37,
                            description: "good pizza"
                        },
                    ]
                },
                {
                    "id": "2",
                    "name": "Stolik #2",
                    "menuItems": [
                        {
                            id: "2",
                            name: "Hawajska",
                            category: "Pizza",
                            price: 227,
                            description: "good pizza"
                        }
                    ]
                },
                {
                    "id": "3",
                    "name": "Stolik #3",
                    "menuItems": [
                        {
                            id: "1",
                            name: "Prosciutto",
                            category: "Pizza",
                            price: 127,
                            description: "good pizza"
                        }
                    ]
                },

            ]
        )
    }

    return (
        <>
            {tableOrders?.map((t) => renderSingleTable(t))}
        </>
    )
}

export default TableOrders;
