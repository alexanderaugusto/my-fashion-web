import React from "react"
import {
  Modal,
  ModalHeader,
  ModalBody,
  CardTitle
} from "reactstrap"
import { OrderAdresses } from "../../pages/components"

import "./Modal.css"

export default function ModalAdresses({ modalOpen, toggleModal, selectedAddress }) {
  return (
    <div>
      <Modal className="card-plain" isOpen={modalOpen} toggle={() => toggleModal()} size="lg">
        <ModalHeader className="justify-content-center" toggle={() => toggleModal()}>
          <div className="header header-primary text-center">
            <CardTitle>Seus endereços</CardTitle>
          </div>
        </ModalHeader>
        <ModalBody>
          <OrderAdresses isModal selectedAddress={selectedAddress}
            changeSelectedAddress={(address) => toggleModal(address)} />
        </ModalBody>
      </Modal>
    </div>
  )
}