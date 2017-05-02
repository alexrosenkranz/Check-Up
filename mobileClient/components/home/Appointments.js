import React, {Component} from 'react'
import {View, StyleSheet, Navigator, Text, ListView} from 'react-native'
import {Constants} from 'expo';

import {
  Container,
  Title,
  Header,
  Content,
  Button,
  Form,
  Item,
  Input,
  Label,
  Body,
  Left,
  Right,
  Icon,
  Card, 
  CardItem, 
  H1
} from 'native-base'

export default class AppointmentsHome extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      appointments: ds.cloneWithRows([{
        doctorName: 'Dr. Bob Murphy',
        apptDate: 'Monday, April 2nd',
        apptTime: '3 p.m.',
        streetAddress: '416 Harnell Avenue',
        city: 'Oakhurst',
        state: 'NJ',
        zip: '07755',
        phone: '222-222-2223',
        email: 'info@info.com'
      }, {
        doctorName: 'Dr. Alex Rosenkranz',
        apptDate: 'Thursday, April 5th',
        apptTime: '11 a.m.',
        streetAddress: '31 Cindy Landy',
        city: 'Ocean',
        state: 'NJ',
        zip: '07712',
        phone: '222-222-2223',
        email: 'info@info.com'
      },
      ])
    }
  }
  

  render() {
    return (
      <Content style={{ padding: 10}}>
          <Text>Upcoming Appointments for {this.props.userInfo.first_name}</Text>
          <ListView
          dataSource={this.state.appointments}
          renderRow={(appt) => 
              <Card>
                <CardItem>
                    <Left>
                        <Body>
                            <Text style={{fontWeight: '700'}}>{appt.doctorName}</Text>
                            <Text note>{appt.apptDate} at {appt.apptTime}</Text>
                              <Button transparent>
                          <Icon active name="more" />
                          <Text>View Appointment Details</Text>
                      </Button>
                        </Body>
                    </Left>
                  </CardItem>
            </Card>   
        }/>
        </Content>
    )
  }

}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff'
  },
  appointments: {
    flex: 2,
    alignItem: 'flex-start'
  }
}

