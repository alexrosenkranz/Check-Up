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

export default class DashboardAppt extends Component {
  constructor(props) {
    super(props)
   
  }

  

  render() {
     if (this.state.isLoading) {
      return <View><Text>Loading...</Text></View>;
    }

    return (
      <Content style={{ padding: 10}}>
          <Text>Upcoming Appointments for {this.props.userInfo.first_name}</Text>
          <ListView
          dataSource={this.props.appointments}
          renderRow={(appt) => 
              <Card>
                <CardItem>
                    <Left>
                        <Body>
                            <Text style={{fontWeight: '700'}}>{appt.appTime}</Text>
                            <Text>{appt.name}</Text>
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

