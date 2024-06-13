import { generateStaticParams as importedGenerateStaticParams } from "../generateStaticParams";
import EditDosen from "./main";
import Sidebar from "@components/Sidebar";

export async function generateStaticParams() {
  const params = await importedGenerateStaticParams();
  return params;
}

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
