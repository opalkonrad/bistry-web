import { Layout } from "antd"
import TableOrders from "../components/orders/tableOrders";

export const Orders = () => {
  return (
    <>
      <Layout>
        <Layout>
          <TableOrders/>
        </Layout>
      </Layout>
    </>
  )
}