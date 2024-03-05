import moment from 'moment/moment'
import React from 'react'

export default function FineTableRow(props) {
  return (
      <tr style={{ maxHeight: '3vh', verticalAlign: 'top' }}>
          <td className="text-center">{props.index+1}</td>
          <td className="text-center">{moment(props.date).format('DD-MM-YYYY')}</td>
          <td className="text-center">{props.book}</td>
          <td className="text-center">{(props.code).toLocaleString('en-US', { minimumIntegerDigits: 6, useGrouping: false })}</td>
          <td className="text-center">₹ {props.amount}</td>
          
      </tr>
  )
}
