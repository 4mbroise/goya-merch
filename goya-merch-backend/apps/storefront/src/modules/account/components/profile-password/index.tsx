"use client"

import React from "react"
import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
// TODO: Re-add toast notifications when Toaster component is implemented

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfilePassword: React.FC<MyInformationProps> = ({ customer: _customer }) => {
  const clearState = () => {}

  return (
    <AccountInfo
      label="Password"
      currentInfo={
        <span>The password is not shown for security reasons</span>
      }
      isSuccess={false}
      isError={false}
      clearState={clearState}
      data-testid="account-password-editor"
    >
      <p className="text-ui-fg-subtle text-sm">
        Pour changer votre mot de passe, utilisez la fonctionnalité
        &apos;Mot de passe oublié&apos; sur la page de connexion.
      </p>
    </AccountInfo>
  )
}

export default ProfilePassword
