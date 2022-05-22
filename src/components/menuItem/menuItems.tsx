import { Button, Space, Table } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import environment from "../../environments/environment.json"
import useAxiosAuth from "../../hooks/useAxiosAuth"
import { AddMenuItemModal } from "../modals/addMenuItemModal"
import failNotification from "../notifications/fail/failNotification"
import successNotification from "../notifications/success/successNotification"


export interface IMenuItem {
  id: string,
  name: string,
  category: string,
  price: number,
  description: string
}

interface IMenuItemWithKey extends IMenuItem {
  key: string // required for antd Table
}

const MenuItems = () => {
  const axiosAuth = useAxiosAuth()
  const [menuItems, setMenuItems] = useState<Array<IMenuItemWithKey>>()

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
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleDelete(record.id)} danger>
            Delete
          </Button>
        </Space>
      )
    }
  ]

  useEffect(() => {
    downloadMenuItems()
  }, [environment.apiUri + "MenuItems"])

  const downloadMenuItems = async () => {
    await axios.get<IMenuItem[]>(environment.apiUri + "MenuItems")
      .then(res => {
        const data = res.data
          .map((item: IMenuItem) => ({ ...item, key: item.id }))
          .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        setMenuItems(data)
      })
      .catch(() => {
        failNotification("Couldn't download the list of menu items.")
      })
  }

  const formDataCallback = async (formData: IMenuItem) => {
    await axiosAuth
      .post("Admin/AddMenuItem",
        JSON.stringify({
          "name": `${formData.name}`,
          "category": `${formData.category}`,
          "price": `${formData.price}`,
          "description": `${formData.description}`
        })
      )
      .then(() => {
        downloadMenuItems()
        successNotification("The item was added to the menu.")
      })
      .catch(() => {
        failNotification("Couldn't add the item to menu.")
      })
  }

  const handleDelete = async (id: string) => {
    await axiosAuth
      .delete(`Admin/DeleteMenuItem/${id}`)
      .then(() => {
        setMenuItems(menuItems?.filter((item: IMenuItemWithKey) => item.id !== id))
        successNotification("The item was deleted from the menu.")
      })
      .catch(() => {
        failNotification("The item wasn't deleted from the menu.")
      })
  }

  return (
    <>
      <AddMenuItemModal formDataCallback={formDataCallback} />
      <Table columns={columns} dataSource={menuItems} />
    </>
  )
}

export default MenuItems
