import { BigInt } from "@graphprotocol/graph-ts"
import {
  Nsure,
  Transfer as TransferEvent,
  Approval as ApprovalEvent,
  DelegateChanged as DelegateChangedEvent,
  DelegateVotesChanged as DelegateVotesChangedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/Nsure/Nsure"
import { Transfer, Approval, OwnershipTransferred } from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = Approval.load(event.params.value.toHex())

  if (entity == null) {
    entity = new Approval(event.params.value.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value
  entity.save()
}

export function handleDelegateChanged(event: DelegateChanged): void {}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {}

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
  let entity = OwnershipTransferred.load(event.params.previousOwner.toHex())

  if (entity == null) {
    entity = new OwnershipTransferred(event.params.previousOwner.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = Transfer.load(event.params.value.toHex())

  if (entity == null) {
    entity = new Transfer(event.params.value.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.save()
}
