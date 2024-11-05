"use client"
import TablePatient from "./components/TablePatient";
import DialogPatient from "./components/DialogPatient";
import FormSearchPatient from "./components/FormSearchPatient";

export default function Home() {
  return (
    <>
      <div className="text-lg text-blue-500 ml-[200px] mt-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <FormSearchPatient></FormSearchPatient>
          <DialogPatient></DialogPatient>
        </div>
        <TablePatient />
      </div>
    </>
  );
}
