import { Button, Form, Input, InputNumber, Modal } from "antd"
import "antd/dist/antd.css"
import { useState } from "react"
import { IMenuItem } from "../menuItem/menuItems"
import "./addMenuItemModal.css"

interface IFormData {
  formDataCallback: Function
}

export const AddMenuItemModal = ({ formDataCallback }: IFormData) => {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = (values: IMenuItem) => {
    const newMenuItem: IMenuItem = {
      id: "",
      name: values.name,
      category: values.category,
      price: values.price,
      description: values.description
    }
    formDataCallback(newMenuItem)
    cleanForm()
  }

  const handleCancel = () => {
    cleanForm()
  }

  const cleanForm = () => {
    form.resetFields()
    setIsModalVisible(false)
  }

  return (
    <>
      <Button type="primary" onClick={showModal} className="addBtn">
        Add menu item
      </Button>
      <Modal
        title="Add menu item:"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields()
              handleOk(values)
            })
            .catch(() => { })
        }}>
        <Form
          form={form}
          onFinish={handleOk}
          layout="vertical"
          initialValues={{ modifier: "public" }}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
