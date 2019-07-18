import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { initialState, deleteCitizen, selectCitizen, addCitizen } from '../../reducers/pageState'
import { push } from 'connected-react-router'


import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    root: {
        width: '100%',
        marginTop: '2rem',
        overflowX: 'auto',
    },
    table: {
        minWidth: '650px',
    },
    fab: {
        margin: '1rem',
    },
}

function createData(name, fLastName, mLastName, gender, Age, Birthday, State, City) {
    return { name, fLastName, mLastName, gender, Age, Birthday, State, City };
}

/*const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];*/

class SimpleTable extends Component {
    gotoCitizenPage = () => {
        this.props.push('/addCitizen')
    }
    tellMyAge = (timestamp) => {
        var birthday = new Date(timestamp)
        var now = new Date()
        const diffTime = Math.abs(now.getTime() - birthday.getTime())
        const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365))
        return diffYears
    }
    getMyBirthday = (timestamp) => {
        var birthday = new Date(timestamp)
        var month = birthday.getMonth() + 1
        var day = birthday.getDate()
        var year = birthday.getFullYear()
        return day + "/" + month + "/" + year
    }
    handleDeleteCitizen = (index) => {
        this.props.deleteCitizen(index)
    }
    handleEditCitizen = (index) => {
        this.props.selectCitizen(index)
        this.gotoCitizenPage()
    }
    render() {
        return (
            <Paper style={styles.root}>
                <Table style={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Apellido Paterno</TableCell>
                            <TableCell align="center">Apellido Materno</TableCell>
                            <TableCell align="center">Sexo</TableCell>
                            <TableCell align="center">Edad</TableCell>
                            <TableCell align="center">Cumpleaños</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center">Ciudad</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.citizens.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.fLastName}</TableCell>
                                <TableCell align="center">{row.mLastName}</TableCell>
                                <TableCell align="center">{row.gender}</TableCell>
                                <TableCell align="center">{this.tellMyAge(row.birthday)}</TableCell>
                                <TableCell align="center">{this.getMyBirthday(row.birthday)}</TableCell>
                                <TableCell align="center">{row.state}</TableCell>
                                <TableCell align="center">{row.city}</TableCell>
                                <TableCell align="center">
                                    <Fab color="secondary" aria-label="Edit" style={styles.fab} onClick={this.handleEditCitizen.bind(this, index)}>
                                        <EditIcon />
                                    </Fab>
                                    <Fab color="secondary" aria-label="Delete" style={styles.fab} onClick={this.handleDeleteCitizen.bind(this, index)}>
                                        <DeleteIcon />
                                    </Fab>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}
SimpleTable.propTypes = {
    citizens: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
    const p = state.get('pageState', initialState)
    return {
        citizens: p.citizens,
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            push,
            deleteCitizen,
            selectCitizen,
        },
        dispatch,
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SimpleTable)
