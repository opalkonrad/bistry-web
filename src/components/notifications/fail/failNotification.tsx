import { FrownOutlined } from "@ant-design/icons"
import { notification } from "antd"
import "./failNotification.css"

const failNotification = (description: string) => {
  notification.open({
    message: "Fail!",
    description: description,
    icon: <FrownOutlined className="sadFace" />
  })
}

export default failNotification
