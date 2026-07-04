"use client"

import React from "react"

import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
// import { updateCustomer } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileEmail: React.FC<MyInformationProps> = ({ customer }) => {
  const clearState = () => {}

  return (
    <AccountInfo
      label="Email"
      currentInfo={`${customer.email}`}
      isSuccess={false}
      isError={false}
      clearState={clearState}
      data-testid="account-email-editor"
    >
      <p className="text-ui-fg-subtle text-sm">
        Votre adresse email ne peut pas être modifiée. Contactez-nous si vous
        avez besoin d&apos;aide.
      </p>
    </AccountInfo>
  )
}

export default ProfileEmail
