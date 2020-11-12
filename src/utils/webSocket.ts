import { Message } from '../interfaces'

export const formatPacketMessage = ({ to, message }: { to: string; message: any }): Message => ({
  send_packet: { to, message: JSON.stringify(message) }
})

export const formatConnectMessage = (...channels: string[]): Message => ({
  connect_to: channels
})
