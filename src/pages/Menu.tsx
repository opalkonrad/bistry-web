import Layout, { Content } from "antd/lib/layout/layout"
import MenuItems from "../components/menuItem/menuItems"

export const Menu = () => {
  return (
    <>
      <Layout>
        <Content>
          <MenuItems />
        </Content>
      </Layout>
    </>
  )
}
