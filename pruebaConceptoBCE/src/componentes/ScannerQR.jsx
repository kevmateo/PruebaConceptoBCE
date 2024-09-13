import React, { Component } from 'react';
import QrScanner from 'react-qr-scanner';

class ScannerQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: 'No result',
      devices: [], // Para almacenar la lista de dispositivos
      rearCameraId: null, // Para almacenar el ID de la cámara trasera
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    this.getDevices();
  }

  // Método para obtener la lista de dispositivos de video
  async getDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      this.setState({ devices: videoDevices });

      // Encuentra el ID de la cámara trasera
      const rearCamera = videoDevices.find(device => device.label.toLowerCase().includes('back') || device.label.toLowerCase().includes('rear'));
      if (rearCamera) {
        this.setState({ rearCameraId: rearCamera.deviceId });
      }
    } catch (error) {
      console.error('Error al obtener dispositivos de video:', error);
    }
  }

  // Método para manejar el escaneo
  handleScan(data) {
    this.setState({
      result: data.text || 'No result',
    });
  }

  // Método para manejar errores
  handleError(err) {
    console.error(err);
  }

  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    };

    return (
      <div>
        <QrScanner
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          facingMode={this.state.rearCameraId ? undefined : 'environment'} // Usa 'environment' si no hay ID de cámara trasera
          chooseDeviceId={(videoDevices) => {
            return this.state.rearCameraId || (videoDevices.length > 0 ? videoDevices[0].deviceId : undefined);
          }}
        />
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default ScannerQR;
