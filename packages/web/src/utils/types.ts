import { RouteProps } from 'react-router-dom'

// torna propriedade 'component' de RouteProps obrigatória
export type RoutePropsWithComponent = Required<Pick<RouteProps, 'component'>> &
  Omit<RouteProps, 'component'>
