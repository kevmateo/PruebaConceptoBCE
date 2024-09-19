import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import GeneradorQr from './generardorQR';
import ScannerQR from './ScannerQR';
import LogoBCE from '../assets/img-bce-3.png';
import ResultadoScann from './resultadoScann';

function Transacciones() {

  const [recibirDinero, setRecibirDinero] = useState(false);
  const [opciones, setOpciones] = useState(true);
  const [transferirDinero, setTransferirDinero] = useState(false);
  const [beneficiario, setBeneficiario] = useState('');
  const [entidadFinanciera, setEntidadFinanciera] = useState('');
  const [numCuenta, setNumCuenta] = useState('');
  const [resultadoScanneado, setResultadoScanneado] = useState(false);

  const handleRecibirDinero = () => {
    setRecibirDinero(true);
    setOpciones(false);
  }

  const handleRegresar = () => {
    if (recibirDinero) {
      setRecibirDinero(false);
    } else {
      setTransferirDinero(false);
    }
    setOpciones(true);
  }

  const handleTransferirDinero = () => {
    setTransferirDinero(true);
    setOpciones(false);
  }

  const onNewScanResult = (decodedText, decodedResult) => {
    try{
      const data = JSON.parse(decodedText);
      setBeneficiario(data.beneficiario || '');
      setEntidadFinanciera(data.entidadFinanciera || '');
      setNumCuenta(data.numCuenta || '');
    } catch (error) {
      console.error('Error al leer el código QR', error);
    }
    setTransferirDinero(false);
  }

  const handleResultadoScan = () => {
    setResultadoScanneado(true);
    setOpciones(false);
    setRecibirDinero(false);
    setTransferirDinero(false);
  }

  return (
    <div className='flex flex-col gap-3 items-center'>
      {opciones &&
        <>
          <img src={LogoBCE} className='w-[300px]' />
          <Button variant="primary" onClick={handleTransferirDinero}>Transferir Dinero</Button>
          <Button variant="primary" onClick={handleRecibirDinero}>Recibir Dinero</Button>
        </>
      }
      {recibirDinero && (
        <>
          <h2>Recibir Dinero</h2>
          <p>Escanea el código QR para recibir dinero.</p>
          <GeneradorQr
            beneficiario='Juan Leonel Perez Perez'
            entidadFinanciera='Banco del Pichincha'
            numCuenta='1234567890'
            ciudadOrigen='Guayaquil'
          />
          <Button variant='secondary' onClick={handleRegresar}>Regresar</Button>
        </>
      )}
      {transferirDinero && (
        <>
          <h3>Ingresa la llave BCE</h3>
          <Form.Control type='text' placeholder='Llave BCE' />
          <Button variant='primary' onClick={handleResultadoScan}>Buscar usuario</Button>
          <span>-------------------o-------------------</span>
          <h3>Escanea el código QR</h3>
          <ScannerQR
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
          <Button variant='secondary' onClick={handleRegresar}>Regresar</Button>
        </>
      )}
      {beneficiario && entidadFinanciera && numCuenta && (
        <ResultadoScann
          beneficiario={beneficiario}
          entidadFinanciera={entidadFinanciera}
          numCuenta={numCuenta}
        />
      )}
      {resultadoScanneado && (
        <ResultadoScann 
          beneficiario="Kevin Mateo Cano"
          entidadFinanciera="Banco del Pichincha"
          numCuenta="0987654321"
          ciudadOrigen="Quito"
        />
      )}
    </div>
  )
}

export default Transacciones