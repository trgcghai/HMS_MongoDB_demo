"use client"
import Header from "./components/Header";
import ListNavbar from "./components/ListNavbar";
import TablePatient from "./components/TablePatient";
import DialogPatient from "./components/DialogPatient";
import FormSearchPatient from "./components/FormSearchPatient";


export default function Home() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <FormSearchPatient></FormSearchPatient>
        <DialogPatient></DialogPatient>
      </div>
      <TablePatient />
    </>
  );
}
