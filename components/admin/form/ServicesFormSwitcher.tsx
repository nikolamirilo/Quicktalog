import { getUserData } from "@/actions/users";
import ServicesForm from "./components/ServicesForm";
import { ServicesFormData } from "@/types";

export default async function ServicesFormSwitcher({type, initialData}: { type: "create" | "edit", initialData?: ServicesFormData }) {
  const userData = await getUserData();
  if(type=="edit") {
  return <ServicesForm type={type} userData={userData}  />;
  }else{
    return <ServicesForm type={type} userData={userData} initialData={initialData} />;
  }
}
