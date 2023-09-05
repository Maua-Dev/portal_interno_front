import React from 'react'
import { Action } from '../../@clean/shared/domain/entities/action'
import { Card } from './little_components/Card'

interface NewHistoricCardProps {
  action: Action
}

export default function NewHistoricCard({ action }: NewHistoricCardProps) {
  return (
    <Card.Root size=''>
      <Card.Header columns="double">
        <div>
          <Card.Title textStyle="bold">{action.title}</Card.Title>
        </div>
      </Card.Header>
    </Card.Root>
  )
}
