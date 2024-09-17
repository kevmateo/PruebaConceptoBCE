import { Form } from "react-bootstrap"
import Button from 'react-bootstrap/Button';

function ResultadoScann({ beneficiario, entidadFinanciera, numCuenta }) {
  return (
    <div className="flex flex-col p-3 items-cemter justify-center">
      <section className="flex flex-col items-center justify-center w-screen p-5">
        <span className="text-center my-1 font-bold text-xl">{beneficiario}</span>
        <span className="text-center my-1">{entidadFinanciera}</span>
        <span className="text-center my-1">Cuenta Nro. {numCuenta}</span>
        <Form.Control type="number" placeholder="$ 0.00" />
      </section>
      <section className="flex rounded-[10px] border-[#D9D9D9] p-3 items-center justify-center border mx-5 gap-5" >
        <div className="flex flex-col">
          <span>Desde</span>
          <span>KEVIN</span>
          <span>Nro. 123456789</span>
        </div>
        <span>$30.00</span>
      </section>
      <Button variant="primary" type="submit" className="mt-2 mx-5">Transferir</Button>
    </div>
  )
}

export default ResultadoScann;