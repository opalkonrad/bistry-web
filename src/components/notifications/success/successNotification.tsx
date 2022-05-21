import { SmileOutlined } from "@ant-design/icons"
import { notification } from "antd"
import "./successNotification.css"

const successNotification = (description: string) => {
  notification.open({
    message: "Success!",
    description: description,
    icon: <SmileOutlined className="smileFace" />
  })
}

export default successNotification
