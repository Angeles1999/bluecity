import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { MyNavbar } from './my-navbar';
import { Footer } from './footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MyContainer } from './my-container';
import styled from 'styled-components';
import ParkingDataService from "../services/parking.service";

const MyMap = styled(Map)`
  &.leaflet-container {
    width: 100%;
    height: 100vh;
  }
`;

export class Mapping extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = {
      lat: 28.128081,
      lng: -15.4467406,
      zoom: 13,
    }
  }*/

  constructor(props) {
    super(props);
    this.findAllWithAFreeScooter = this.findAllWithAFreeScooter.bind(this);
    this.state = {
      parkings: []
    }
  }

  componentDidMount() {
    this.findAllWithAFreeScooter();
  }

  findAllWithAFreeScooter() {
    ParkingDataService.findAllWithAFreeScooter().then(res => {
      console.log(res);
      this.setState({
        parkings: res.data
      })
    })
  }

  render() {
    const position = [28.128081, -15.4467406]
    return (
      <>
        <MyNavbar history={this.props.history} />
        <MyContainer>
          <Row>
            <Col>
              <MyMap center={position} zoom={this.state.zoom}>
                <TileLayer
                  attribution=''
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.state.parkings.map(p => {
                  let pos = [28.128081, -15.4467406];
                  return <Marker position={pos}>
                            <Popup>
                              IES El Rincón<br />
                              Guanarteme Building<br />
                              My school.<br />
                              I miss it so much.
                            </Popup>
                          </Marker>;
                })}
              </MyMap>
            </Col>
          </Row>
        </MyContainer>
        <Footer />
      </>
    )
  }
}