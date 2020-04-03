import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const SimpleTable = ({data, grade}) => {
    if (data.length > 1) {
        try {
        return (
        <Table className="ui table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Arvosanan {grade} ovat käyneet myös</Table.HeaderCell>
            <Table.HeaderCell>Käyneet %</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
            <Table.Row>
            <Table.Cell>{data[grade].courses[0][0]}</Table.Cell>
            <Table.Cell>{data[grade].courses[0][2]}%</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>{data[grade].courses[1][0]}</Table.Cell>
            <Table.Cell>{data[grade].courses[1][2]}%</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>{data[grade].courses[2][0]}</Table.Cell>
            <Table.Cell>{data[grade].courses[2][2]}%</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>{data[grade].courses[3][0]}</Table.Cell>
            <Table.Cell>{data[grade].courses[3][2]}%</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>{data[grade].courses[4][0]}</Table.Cell>
            <Table.Cell>{data[grade].courses[4][2]}%</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>{data[grade].courses[5][0]}</Table.Cell>
            <Table.Cell>{data[grade].courses[5][2]}%</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>{data[grade].courses[6][0]}</Table.Cell>
            <Table.Cell>{data[grade].courses[6][2]}%</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>{data[grade].courses[7][0]}</Table.Cell>
            <Table.Cell>{data[grade].courses[7][2]}%</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>{data[grade].courses[8][0]}</Table.Cell>
            <Table.Cell>{data[grade].courses[8][2]}%</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>{data[grade].courses[9][0]}</Table.Cell>
            <Table.Cell>{data[grade].courses[9][2]}%</Table.Cell>
        </Table.Row>
        </Table.Body>
    </Table>
    )
    } catch {
        return null
    }
    } else return null
}


export default SimpleTable
