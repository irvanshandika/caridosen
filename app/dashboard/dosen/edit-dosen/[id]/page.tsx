import { generateStaticParams as importedGenerateStaticParams } from "../generateStaticParams";
import EditDosen from "./main";
import Sidebar from "@components/Sidebar";
import { Metadata } from "next";

export async function generateStaticParams() {
  const params = await importedGenerateStaticParams();
  return params;
}

export const metadata: Metadata = {
  title: "Edit Dosen",
};

const EditPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Sidebar>
        <EditDosen id={params.id} />
      </Sidebar>
    </>
  );
};

export default EditPage;
