import { Head } from "$fresh/runtime.ts";
import Top from "../components/Top.tsx";
import OrderForm from "../islands/OrderForm.tsx";

export default function Order() {
  return (
    <>
      <Head>
        <title>Nellai Cuisine - order</title>
      </Head>
      <body class="bg-[#2d2b2b]" style="background-image: url('/bg.png')">
        <Top />
        <div>
          <OrderForm />
        </div>
      </body>
    </>
  );
}
