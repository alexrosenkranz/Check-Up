import React, {Component} from 'react'
import {View, StyleSheet, Navigator} from 'react-native'
import {
  Container,
  Content,
  Form,
  Item,
  List,
  ListItem,
  Input,
  Label,
  Button,
  Text,
  H1,
  H2,
  H3
} from 'native-base'
import {Constants} from 'expo';

export default class SideBar extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    shadowOffsetWidth: 1,
    shadowRadius: 4
  };
}

  render() {

    return (
      <Container style={styles.container}>
        <Content bounces={true}>
            <List>
                <ListItem >
                    <Button transparent onClick={this.props._dashLink}><Text>Home</Text></Button>
                </ListItem>
                <ListItem >
                    <Button transparent onClick={() => this.props.navigator.push({name: "SignUp"})}><Text>Nathaniel Clyne</Text></Button>
                </ListItem>
                <ListItem>
                    <Text>Dejan Lovren</Text>
                </ListItem>
            </List>
        </Content>
    </Container>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#f1f1f1'
  }
}

// function bindAction(dispatch) {
//   return {
//     navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
//     closeDrawer: () => dispatch(closeDrawer()),
//     changePlatform: () => dispatch(changePlatform()),
//     changeMaterial: () => dispatch(changeMaterial())
//   };
// }

// const mapStateToProps = state => ({navigation: state.cardNavigation, themeState: state.drawer.themeState});